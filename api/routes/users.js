import { Router } from 'express';
import { connectDB } from '../db.js';
import { createNewUser } from '../helpers/users.js';

const router = Router();

router.get("/", async (request, response) => {
    const db = await connectDB();
    let data = await db.collection("Usuarios").findOne();

    console.log(data);

    response.json(data);
})

router.post("/newUser", async(req, res) => {
    let email = req.body.correo;
    let username = req.body.nombre_de_usuario;
    let fullName = req.body.nombre_completo;
    let password = req.body.contrasena;
    let rol = req.body.rol;

    let status = await createNewUser(email, username, fullName, password, rol);
    console.log(`status: ${status}`);
    res.sendStatus(status);
})


export default router;