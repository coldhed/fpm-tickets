import { Router } from 'express';
import { connectDB } from '../db.js';

const router = Router();

router.get("/", async (request, response) => {
    const db = await connectDB();
    let data = await db.collection("Usuarios").findOne();

    console.log(data);

    response.json(data);
})


export default router;