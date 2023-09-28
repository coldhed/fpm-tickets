import { connectDB } from "../db.js";
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
                "fullname": user.nombre_completo
            });
        } else {
            // wrong password
            return res.sendStatus(401);
        }
    });
}
export { createNewUser, doLogin };