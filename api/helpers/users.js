import { connectDB } from "../db.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { json } from "express";

async function createNewUser(req, res) {
    let db = await connectDB();

    let newUser = req.body;
    newUser["last_login"] = Date();

    if (newUser.rol == "ca") {
        let coor_nac = req.body.coor_nac;

        if (coor_nac) {
            let cn_data = await db.collection("Usuarios").findOne({ "_id": new ObjectId(coor_nac) });

            if (cn_data && cn_data.rol == "cn") {
                newUser["coor_nac"] = coor_nac;
            } else {
                return res.sendStatus(400);
            }
        } else {
            // if you are creating a coor_aula you need to specity their coor_nac
            return res.sendStatus(400);
        }
    }


    // check if a user with that email already exists
    let oldUser = await db.collection("Usuarios").findOne({ "correo": newUser.email });

    if (oldUser === null) {

        // hash the password
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(newUser.contrasena, salt);

            newUser["contrasena"] = hash;

            let data = await db.collection("Usuarios").insertOne(newUser);
            return res.json(data);
        } catch {
            console.log("Problem hashing the password");
            return res.sendStatus(500);
        }
    } else { // repeated user
        return res.sendStatus(409);
    }
}

async function doLogin(req, res) {
    let email = req.body.correo;
    let password = req.body.contrasena;

    // check req body is not empty
    if (!email || !password) {
        return res.status(400).json({ error: "Username or password empty." });
    }

    const db = await connectDB();

    let user = await db.collection("Usuarios").findOne({ "correo": email });
    if (user == null) { // user not found
        return res.sendStatus(401);
    }

    // compare pass to the stored hash
    bcrypt.compare(password, user.contrasena, (error, result) => {
        if (error) {
            console.log(error);
            return res.sendStatus(500);
        }

        // passwords match
        if (result) {
            let token = jwt.sign({
                user: email,
                rol: user.rol,
            },
                process.env.JWT_SECRET,
                { expiresIn: 600 }
            );

            res.json({
                "token": token,
                "id": email,
                "fullName": user.nombre_completo,
                "rol": user.rol,
            });
        } else {
            // wrong password
            return res.sendStatus(401);
        }
    });
}

// endpoint to get all users
async function getMany(req, res) {
    const { _sort, _order, _start, _end, id } = req.query;

    let db = await connectDB();

    let users = [];

    if (id) {
        for (let i = 0; i < id.length; i++) {
            let user = await db.collection("Usuarios").findOne({ "_id": new ObjectId(id[i]) }, { projection: { contrasena: 0 } });
            if (user) users.push(user);
        }
    } else {
        let sorter = {};

        if (_sort && _order) {
            sorter[_sort] = _order;
        }

        users = await db.collection("Usuarios").find({}).sort(sorter).project({ contrasena: 0 }).toArray();

        // set headers needed for amount of data -> react-admin needs this
        res.set('Access-Control-Expose-Headers', 'X-Total-Count')
        res.set('X-Total-Count', users.length)

        // slice if applicable
        if (_start && _end) {
            users = users.slice(_start, _end);
        }
    }


    // parse data
    for (let i = 0; i < users.length; i++) {
        // RA asks for an id field
        users[i]["id"] = users[i]["_id"];
        delete users[i]["_id"];

        // if the user is a coordinador de aula, get their coordinators mail
        if (users[i]["rol"] == "ca" && users[i]["coor_nac"] != null) {
            let coordinador = await db.collection("Usuarios").findOne({ "_id": new ObjectId(users[i]["coor_nac"]) }, { projection: { "correo": 1, "_id": 0 } });

            if (coordinador != null) users[i]["coor_nac"] = coordinador["correo"];
        }


        // Change the role to a more readable format
        let role = users[i]["rol"];
        switch (role) {
            case "ce":
                users[i]["rol"] = "Coordinador Ejecutivo";
                break;

            case "cn":
                users[i]["rol"] = "Coordinador Nacional";
                break;

            case "ca":
                users[i]["rol"] = "Coordinador de Aula";
                break;
        }

    }

    res.json(users);
}

async function getOne(req, res) {
    let db = await connectDB();

    let user = await db.collection("Usuarios").findOne({ "_id": new ObjectId(req.params.id) }, { projection: { contrasena: 0 } });

    if (user == null) res.sendStatus(404);

    user["id"] = user["_id"];
    delete user["_id"];

    switch (user.rol) {
        case "ce":
            user["rol"] = "Coordinador Ejecutivo";
            break;

        case "cn":
            user["rol"] = "Coordinador Nacional";
            break;

        case "ca":
            user["rol"] = "Coordinador de Aula";
            break;
    }

    res.json(user);
}

async function getCNs(req, res) {
    let db = await connectDB();

    let users = await db.collection("Usuarios").find({ "rol": "cn" }).project({ _id: 1, correo: 1 }).toArray();

    users.map((user) => {
        user["id"] = user["_id"];
        delete user["_id"];

        user["name"] = user["correo"];
        delete user["correo"];
    })

    res.json(users);
}

async function deleteUser(req, res) {
    let db = await connectDB();

    let user = await db.collection("Usuarios").findOne({ "_id": new ObjectId(req.params.id) });

    if (user == null) {
        return res.sendStatus(404);
    }

    let data = await db.collection("Usuarios").deleteOne({ "_id": new ObjectId(req.params.id) });

    return res.json(data);
}

export { createNewUser, doLogin, getMany, getCNs, deleteUser, getOne };