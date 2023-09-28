import { connectDB } from "../db.js";
import bcrypt from "bcrypt";

async function createNewUser(email, username, fullName, password, rol)
{
    // check if a user with that username already exists
    let db = await connectDB();

    let oldUser = await db.collection("Usuarios").findOne({"nombre_de_usuario": username});

    if (oldUser === null) {

        // hash the password
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            let newUser = {
                "correo": email,
                "nombre_de_usuario": username,
                "nombre_completo": fullName,
                "contraseña": hash,
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

export { createNewUser };