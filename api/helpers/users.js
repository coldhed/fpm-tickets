import { connectDB, logDB } from "../util.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { json } from "express";

async function createNewUser(req, res) {
    let db = await connectDB();
    let userRequesting = req.userRequesting;

    let newUser = req.body;
    newUser["last_login"] = Date();

    if (newUser.rol == "ca") {
        let coor_nac = req.body.coor_nac;

        if (coor_nac) {
            let cn_data = await db.collection("Usuarios").findOne({ "_id": new ObjectId(coor_nac) });

            if (cn_data && cn_data.rol == "cn") {
                newUser["coor_nac"] = coor_nac;
            } else {
                logDB("create new user failed", userRequesting);
                return res.sendStatus(400);
            }
        } else {
            // if you are creating a coor_aula you need to specity their coor_nac
            logDB("create new user failed", userRequesting);
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
            logDB(`create new user ${newUser.correo} successful`, userRequesting);
            return res.json(data);
        } catch {
            console.log("Problem hashing the password");

            logDB("create new user failed", userRequesting);
            return res.sendStatus(500);
        }
    } else { // repeated user
        logDB("create new user failed", userRequesting);
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
        await logDB("login failed", email);
        return res.sendStatus(401);
    }

    // compare pass to the stored hash
    bcrypt.compare(password, user.contrasena, async (error, result) => {
        if (error) {
            console.log(error);
            await logDB("login failed", email);
            return res.sendStatus(500);
        }

        // passwords match
        if (result) {
            // update last login date
            db.collection("Usuarios").updateOne({ "correo": email }, { $set: { "last_login": Date() } });

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
            await logDB("login successful", email);
        } else {
            // wrong password
            await logDB("login failed", email);
            return res.sendStatus(401);
        }
    });
}

// endpoint to get all users
async function getMany(req, res) {
    const { _sort, _order, _start, _end, id } = req.query;

    let db = await connectDB();

    let userRequesting = req.userRequesting;

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


            users[i]["coor_nac"] = (coordinador != null) ? coordinador["correo"] : "Coordinador Nacional no encontrado";
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
    logDB("get all users", userRequesting)
    res.json(users);
}

async function getOne(req, res) {
    let db = await connectDB();

    let userRequesting = req.userRequesting;

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

    logDB(`get one user: ${user.correo}`, userRequesting);
    res.json(user);
}

async function getCNs(req, res) {
    let db = await connectDB();
    let userRequesting = req.userRequesting;

    let users = await db.collection("Usuarios").find({ "rol": "cn" }).project({ _id: 1, correo: 1 }).toArray();

    users.map((user) => {
        user["id"] = user["_id"];
        delete user["_id"];

        user["name"] = user["correo"];
        delete user["correo"];
    })

    logDB("get all CNs", userRequesting);
    res.json(users);
}

async function deleteUser(req, res) {
    let db = await connectDB();
    let userRequesting = req.userRequesting;

    let user = await db.collection("Usuarios").findOne({ "_id": new ObjectId(req.params.id) });

    if (user == null) {
        logDB("delete user failed: user not found", userRequesting);
        return res.sendStatus(404);
    }

    let data = await db.collection("Usuarios").deleteOne({ "_id": new ObjectId(req.params.id) });

    logDB(`delete user: ${user.correo}`, userRequesting)
    return res.json(data);
}

export { createNewUser, doLogin, getMany, getCNs, deleteUser, getOne };