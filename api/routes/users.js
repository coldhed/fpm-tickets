import { Router } from 'express';
import { connectDB } from '../db.js';
import { createNewUser, doLogin } from '../helpers/users.js';


const router = Router();

router.get("/", async (request, response) => {
    const db = await connectDB();
    let data = await db.collection("Usuarios").findOne();

    console.log(data);

    response.json(data);
})

router.post("/newUser", async (req, res) => {
    let email = req.body.correo;
    let fullName = req.body.nombre_completo;
    let password = req.body.contrasena;
    let rol = req.body.rol;

    const status = await createNewUser(email, fullName, password, rol);

    res.sendStatus(status);
})

router.post("/login", async (req, res) => {
    await doLogin(req, res);
})


export default router;