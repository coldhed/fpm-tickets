import { Router } from 'express';
import { authenticate } from '../util.js';
import { createNewUser, doLogin, getMany, getCNs, deleteUser, getOne } from '../helpers/users.js';
import jwt from 'jsonwebtoken';

const router = Router();


// get coor_nac
router.get("/cn", authenticate(new Set(["ce"])), async (req, res) => {
    await getCNs(req, res);
})

router.get("/correo", async (req, res) => {
    let db = await connectDB();
    let users = await db.collection("Usuarios").find({}).project({_id: 1, correo: 1}).toArray();
    
    users.map((user) => {
        user["id"] = user["_id"];
        delete user["_id"];
        
        user["name"] = user["correo"];
        delete user["correo"];

    })
    res.json(users);
})

// get many
router.get("/", authenticate(new Set(["ce"])), async (req, res) => {
    await getMany(req, res);
});

// get one
router.get("/:id", authenticate(new Set(["ce"])), async (req, res) => {
    await getOne(req, res);
});

// create a user
router.post("/", authenticate(new Set(["ce"])), async (req, res) => {
    await createNewUser(req, res);
})

// delete a user
router.delete("/:id", authenticate(new Set(["ce"])), async (req, res) => {
    await deleteUser(req, res);
})

// login
router.post("/login", async (req, res) => {
    await doLogin(req, res);
})

export default router;