import { Router } from 'express';
import { connectDB } from '../db.js';
import { createNewUser, doLogin, getMany, getCNs, deleteUser, getOne } from '../helpers/users.js';
import jwt from 'jsonwebtoken';

const router = Router();

// router.get("/", async (request, response) => {
//     const db = await connectDB();
//     let data = await db.collection("Usuarios").findOne();

//     console.log(data);

//     response.json(data);
// })

// get many
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

// get one
router.get("/:id", async (req, res) => {
    try {
        let token = req.get("Authentication");
        let verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (verifiedToken.rol != "ce") {
            return res.sendStatus(401);
        }

        await getOne(req, res);
    } catch {
        // auth failed
        res.sendStatus(401);
    }
});

// create a user
router.post("/", async (req, res) => {
    try {
        let token = req.get("Authentication");
        let verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (verifiedToken.rol != "ce") {
            return res.sendStatus(401);
        }

        await createNewUser(req, res);
    } catch {
        // auth failed
        res.sendStatus(401);
    }
})

// delete a user
router.delete("/:id", async (req, res) => {
    try {
        let token = req.get("Authentication");
        let verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (verifiedToken.rol != "ce") {
            return res.sendStatus(401);
        }

        await deleteUser(req, res);
    } catch {
        // auth failed
        res.sendStatus(401);
    }
})

// login
router.post("/login", async (req, res) => {
    await doLogin(req, res);
})

// get coor_nac
router.get("/cn", async (req, res) => {
    try {
        let token = req.get("Authentication");
        let verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (verifiedToken.rol != "ce") {
            return res.sendStatus(401);
        }

        await getCNs(req, res);
    } catch {
        // auth failed
        res.sendStatus(401);
    }
})


export default router;