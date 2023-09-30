import { Router } from 'express';
import { connectDB } from '../db.js';
import { createNewTicket } from '../helpers/ticket.js';


const router = Router();

/*
router.post("ruta", async (request, response) => {
    
})
*/

router.post("/newTicket", async (req, res) => {
    let email = req.body.correo;
    let username = req.body.nombre_de_usuario;
    let fullName = req.body.nombre_completo;
    let password = req.body.contrasena;
    let rol = req.body.rol;

    const status = await createNewTicket(titulo, categoria, aula, prioridad, resolucion, estatus);

    res.sendStatus(status);
})

router.post("/login", async (req, res) => {
    await doLogin(req, res);
})


export default router;