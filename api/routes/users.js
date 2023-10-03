import { Router } from 'express';
import { connectDB } from '../db.js';
import { createNewUser, doLogin, getMany } from '../helpers/users.js';
import jwt from 'jsonwebtoken';

const router = Router();

// router.get("/", async (request, response) => {
//     const db = await connectDB();
//     let data = await db.collection("Usuarios").findOne();

//     console.log(data);

//     response.json(data);
// })

router.get("/", async (req, res) => {

    try {
        let token = req.get("Authentication");
        let verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (verifiedToken.rol != "ce") {
            return res.sendStatus(401);
        }

        await getMany(req, res);
    } catch {
        // auth failed
        res.sendStatus(401);
    }
});

// create a user
router.post("/", async (req, res) => {

    await createNewUser(req, res);
})

router.post("/login", async (req, res) => {
    await doLogin(req, res);
})


export default router;