import express  from "express"
import cors from "cors"
import { MongoClient } from 'mongodb'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();

import {ENV, PORT} from "./const.js"

let db;
const app = express();

app.use(express.json());
app.use(cors());

async function connectDB(){
    let client=new MongoClient(process.env.MONGODB_URI)
    await client.connect();
    db=client.db();
    console.log("conectado a la base de datos")
}

//Ruta por defualt
app.get("/", async (req, res) => {
    res.send("Servidor trabajando en el puerto");

});

app.listen(PORT, () => {
    console.log("Servidor iniciado");
    connectDB()
    console.log("DB connected")
});