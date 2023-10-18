import { Router } from 'express';
import { authenticate, logDB } from '../util.js';
import { createNewUser, doLogin, getMany, getCNs, deleteUser, getOne } from '../helpers/users.js';
import { check, param } from "express-validator";

const router = Router();

// get coor_nac
router.get("/cn", authenticate(new Set(["ce"])), async (req, res) => {
    await getCNs(req, res);
})

// get all emails
router.get("/correo", authenticate(new Set(["ce"])), async (req, res) => {
    let db = await connectDB();
    let users = await db.collection("Usuarios").find({}).project({ _id: 1, correo: 1 }).toArray();

    users.map((user) => {
        user["id"] = user["_id"];
        delete user["_id"];

        user["name"] = user["correo"];
        delete user["correo"];

    })

    logDB("get all emails", req.userRequesting);
    res.json(users);
})

// get many
router.get("/", authenticate(new Set(["ce"])), async (req, res) => {
    await getMany(req, res);
});

// get one
let getByIdCheck = [param("id").exists().isMongoId().trim().escape()]
router.get("/:id", getByIdCheck, authenticate(new Set(["ce"])), async (req, res) => {
    await getOne(req, res);
});

// create a user
let createCheck = [
    check("rol").isLength(2).exists().isString().trim().escape(),
    check("nombre_completo").isString().trim().escape(),
    check("correo").isEmail().normalizeEmail().trim().escape(),
    check("contrasena").isString().trim().escape(),
    check("coor_nac").isMongoId().trim().escape(),
];
router.post("/", createCheck, authenticate(new Set(["ce"])), async (req, res) => {
    await createNewUser(req, res);
})

// delete a user
let deleteCheck = [param("id").exists().isMongoId().trim().escape()]
router.delete("/:id", deleteCheck, authenticate(new Set(["ce"])), async (req, res) => {
    await deleteUser(req, res);
})

// login
let loginCheck = [
    check("correo").isEmail().normalizeEmail().trim().escape(),
    check("contrasena").isString().trim().escape(),
];
router.post("/login", loginCheck, async (req, res) => {
    await doLogin(req, res);
})

export default router;