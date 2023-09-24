import express  from "express"
import cors from "cors"
import { MongoClient } from 'mongodb'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import {ENV, PORT} from "./const.js"

const URI = "mongodb+srv://ChiefSupreme:6eDN5HrTXGbOmuXt@fpm-db.uda1w7k.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";

let db;
const app = express();

app.use(express.json());
app.use(cors());

async function connectDB(){
    let client=new MongoClient(URI)
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