import express  from "express"
import cors from "cors"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();
import {ENV, PORT} from "./const.js"
//import { connectDB } from './db.js';
import {usersRouter} from "./routes/routes.js"



const express = require("express") //NUEVO
const MongoCLiente=require("mongodb").MongoClient; // NUEVO
const cors=require("cors") //NUEVO
const bodyParser=require("body-parser") //NUEVO


let db;//NUEVO
const app = express();
app.use(cors()); //NUEVO
app.use(bodyParser.json()); //NUEVO

async function connectDB(){ //NUEVO
    let client=new MongoClient(ENV.MONGO_URI);//Aqui no estpy segura si es ENV.host o ENV.MONGO_URI
    await client.connect();
    db=client.db();
    console.log("DB connected");
}

//getList, getMany, getManyReference
app.get("/ticket", async (req, res) => {
    if ("_sort" in req.query){ //List -> Datos ordenadoa
        let sortBy=req.query._sort;
        let sortOrder=req.query._order=="ASC"?1:-1; //ASCENDENTE O DESCENDENTE
        let start=Number(req.query._start)
        let end=Number(req.query._end)
        let sorter={} // no puedo aladir un avariable como nombre salvo así
        sorter[sortBy]=sortOrder
        let data = await db.colection("Tickets").find({}).sort(sorter).project({_id:0}).toArray();
        res.set("Access-Control-Expose-Headers", "X-Total-Count"); //los headers de la respuesta
        res.set("X-Total-Count", data.length);
        data=data.slice(start,end); //para partirla
        res.json(data);
    }else if ("id" in req.query){ //Many -> Datos con ciertos id
        let data=[] //leemos toda la info
        for (let index=0; index<request.query.id.length; index++){ //recorremos el array de ids
            let dataObtain=await db.collection('Tickets').find({id: Number(request.query.id[index])}).project({_id:0}).toArray(); // sacamos el valor del index y luego la proyección
            data=await data.concat(dataObtain)
        }
        response.json(data);
    } else{ //Reference -> datos que me pide el query 
        let data=[]
        data=await db.collection('tickets').find(request.query).project({_id:0}).toArray();
        response.set('Access-Control-Expose-Headers', 'X-Total-Count')
        response.set('X-Total-Count', data.length)
        response.json(data)
    }
})

//getOne
app.get("/tickets/:id", async (request, response)=>{
    let data=await db.collection('Tickets').find({"id": Number(request.params.id)}).project({_id:0}).toArray();
    response.json(data[0]);
})



//create
app.post("/tickets", async (request, response)=>{
    let addValue=request.body
    let data=await db.collection('Tickets').find({}).toArray();
    let id=data.length+1;
    addValue["id"]=id;
    data=await db.collection('Tickets').insertOne(addValue);
    response.json(data);
}) 

//update
app.put("/tickets/:id", async (request, response)=>{
    let addValue=request.body
    addValue["id"]=Number(request.params.id);
    let data=await db.collection("Tickets").updateOne({"id": addValue["id"]}, {"$set": addValue});
    data=await db.collection('Tickets').find({"id": Number(request.params.id)}).project({_id:0, id:1, nombre:1, materia:1}).toArray();
    response.json(data[0]);
})    

//delete
app.delete("/tickets/:id", async (request, response)=>{
    let data=await db.collection('Tickets').deleteOne({"id": Number(request.params.id)});
    response.json(data);
})

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
app.use("/users", usersRouter)