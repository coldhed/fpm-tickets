import { connectDB } from "../db.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

async function createNewUser(email, fullName, password, rol) {
    // check if a user with that email already exists
    let db = await connectDB();

    let oldUser = await db.collection("Usuarios").findOne({ "correo": email });

    if (oldUser === null) {

        // hash the password
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            let newUser = {
                "correo": email,
                "nombre_completo": fullName,
                "contrasena": hash,
                "last_login": Date(),
                "rol": rol,
            };
            await db.collection("Usuarios").insertOne(newUser);
            return 201;
        } catch {
            console.log("Problem hashing the password");
            return 500;
        }
    } else { // repeated user
        return 409;
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
            let user = await db.collection("Usuarios").findOne({ "correo": id[i] }, { projection: { contrasena: 0, id: 0 } });
            if (user) users.push(user);
        }
    } else {
        let sorter = {};

        if (_sort && _order) {
            sorter[_sort] = _order;
        }

        users = await db.collection("Usuarios").find({}).sort(sorter).project({ contrasena: 0, _id: 0 }).toArray();

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
        users[i]["id"] = users[i]["correo"];

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
};

export { createNewUser, doLogin, getMany };