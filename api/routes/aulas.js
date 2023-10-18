import { Router } from 'express';
import { connectDB, authenticate, logDB } from '../util.js';
import { ObjectId } from 'mongodb';
import { check, param, validationResult } from "express-validator";
import { createNewAula } from '../helpers/aulas.js';
import jwt from 'jsonwebtoken';

const router = Router();

router.get("/", authenticate(new Set(["ce", "cn"])), async (req, res) => {
    let db = await connectDB();
    let data = [];

    if ("_sort" in req.query) {
        let sortBy = req.query._sort;
        let sortOrder = req.query._order == "ASC" ? 1 : -1; //ASCENDENTE O DESCENDENTE

        let start = Number(req.query._start)
        let end = Number(req.query._end)

        let sorter = {}
        sorter[sortBy] = sortOrder

        data = await db.collection("Aula").find({}).sort(sorter).project({}).toArray();

        res.set("Access-Control-Expose-Headers", "X-Total-Count");
        res.set("X-Total-Count", data.length);

        data = data.slice(start, end);

    } else if ("id" in req.query) {

        for (let index = 0; index < req.query.id.length; index++) { //recorremos el array de ids
            let dataObtain = await db.collection('Aula').find({ id: Number(req.query.id[index]) }).project({}).toArray(); // sacamos el valor del index y luego la proyección
            data = await data.concat(dataObtain)
        }

    } else { //Reference -> datos que me pide el query 

        data = await db.collection('Aula').find(req.query).project({}).toArray();
        res.set('Access-Control-Expose-Headers', 'X-Total-Count')
        res.set('X-Total-Count', data.length)
    }
    for (let i = 0; i < data.length; i++) {
        data[i]["id"] = data[i]["_id"];
    }

    logDB("get all aulas", req.userRequesting);

    res.json(data);
})

router.get("/nombre", authenticate(), async (req, res) => {
    let db = await connectDB();
    let users = await db.collection("Aula").find({}).project({ _id: 1, nombre: 1 }).toArray();

    users.map((user) => {
        user["id"] = user["_id"];
        delete user["_id"];

        user["name"] = user["nombre"];
        delete user["nombre"];
    })

    logDB("get all aula nombres", req.userRequesting);

    res.json(users);
})

router.get("/ciudad", authenticate(), async (req, res) => {
    try {
        let db = await connectDB();
        let users = await db.collection("Aula").find({}).project({ _id: 1, ciudad: 1 }).toArray();

        users = users.map((user) => {
            user["id"] = user["_id"];
            delete user["_id"];
            return user;
        });

        logDB("get all aula ciudades", req.userRequesting);

        res.json(users);
    } catch (error) {
        console.error("Error retrieving data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


//getOne
let getOneCheck = [param("id").exists().isMongoId().trim().escape()];
router.get("/:id", getOneCheck, authenticate(new Set(["ce", "cn"])), async (req, res) => {
    const result = validationResult(req);

    if (result.errors.length > 0) {
        res.status(400)
        return res.send({ errors: result.array() });
    }

    let db = await connectDB();

    console.log(req.params.id)

    let data = await db.collection('Aula').findOne({ "_id": new ObjectId(req.params.id) });

    console.log(data)

    data["id"] = data["_id"];
    delete data["_id"];

    logDB(`get one aula: ${req.params.id}`, req.userRequesting);

    res.json(data);
})

//AulaCreate
let createCheck = [
    check("nombre").isString().notEmpty().trim().escape(),
    check("coor_aula").isMongoId().trim().escape(),
    check("ciudad").isString().trim().escape(),
    check("estado").isString().trim().escape(),
    check("CP").isString().trim().escape(),
    check("calle").isString().trim().escape(),
];
router.post("/", createCheck, authenticate(new Set(["ce", "cn"])), async (req, res) => {
    // console.log(req.body)
    const result = validationResult(req);

    if (result.errors.length > 0) {
        res.status(400)
        return res.send({ errors: result.array() });
    }

    let db = await connectDB();
    let addValue = req.body
    let data = await db.collection('Aula').insertOne(addValue);

    logDB(`create aula: ${data.insertedID}`, req.userRequesting);

    res.json(data);
})

// delete
let deleteCheck = [param("id").exists().isMongoId().trim().escape()];
router.delete("/:id", deleteCheck, authenticate(new Set(["ce", "cn"])), async (req, res) => {
    const result = validationResult(req);

    if (result.errors.length > 0) {
        res.status(400)
        return res.send({ errors: result.array() });
    }

    let db = await connectDB();

    let data = await db.collection('Aula').deleteOne({ "_id": new ObjectId(req.params.id) });
    data["id"] = data["_id"];
    delete data["_id"];

    logDB(`delete aula: ${data.id}`, req.userRequesting);

    res.json(data);
})

export default router;
