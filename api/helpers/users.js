import { connectDB } from "../db.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

async function createNewUser(email, username, fullName, password, rol) {
    // check if a user with that username already exists
    let db = await connectDB();

    let oldUser = await db.collection("Usuarios").findOne({ "nombre_de_usuario": username });

    if (oldUser === null) {

        // hash the password
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            let newUser = {
                "correo": email,
                "nombre_de_usuario": username,
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
    let username = req.body.username;
    let password = req.body.password;

    // check req body is not empty
    if (!username || !password) {
        return res.status(400).json({ error: "Username or password empty." });
    }

    const db = await connectDB();

    let user = await db.collection("Usuarios").findOne({ "nombre_de_usuario": username });
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
                user: username,
                rol: user.rol,
            },
                process.env.JWT_SECRET,
                { expiresIn: 600 }
            );

            res.json({
                "token": token,
                "id": username,
                "fullname": user.nombre_completo
            });
        } else {
            // wrong password
            return res.sendStatus(401);
        }
    });
}
export { createNewUser, doLogin };