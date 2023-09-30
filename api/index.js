import express from "express"
import cors from "cors"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();

import { ENV, PORT } from "./const.js"
import { connectDB } from './db.js';
import { usersRouter } from "./routes/routes.js"


const app = express();

app.use(express.json());
app.use(cors());


//Ruta por defualt
app.get("/", async (req, res) => {
    res.send("Server running");

});

// ROUTES
app.use("/Usuarios", usersRouter)


app.listen(PORT, () => {
    console.log("Server started");
    connectDB()
    console.log("DB connected");
});