import express from "express"
import cors from "cors"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();

import { ENV, PORT } from "./const.js"
import { connectDB } from './db.js';
import { usersRouter } from "./routes/routes.js"

const express = require("express") //NUEVO
const MongoCLiente = require("mongodb").MongoClient; // NUEVO
const cors = require("cors") //NUEVO
const bodyParser = require("body-parser") //NUEVO

let db;//NUEVO
const app = express();
app.use(cors()); //NUEVO
app.use(bodyParser.json()); //NUEVO

async function connectDB() { //NUEVO
    let client = new MongoClient(ENV.MONGO_URI);//Aqui no estpy segura si es ENV.host o ENV.MONGO_URI
    await client.connect();
    db = client.db();
    console.log("DB connected");
}

app.listen(PORT, () => {
    console.log("Server started");
    connectDB()
    console.log("DB connected");
});

// app.use(express.json());
// app.use(cors());


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
