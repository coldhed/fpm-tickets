import { Router } from 'express';
import { connectDB } from '../db.js';
import { createNewTicket } from '../helpers/ticket.js';


const router = Router();

/*
router.post("ruta", async (request, response) => {
    
})
*/

//getList, getMany, getManyReference
router.get("/ticket", async (req, res) => {
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
router.get("/tickets/:id", async (request, response)=>{
    let data=await db.collection('Tickets').find({"id": Number(request.params.id)}).project({_id:0}).toArray();
    response.json(data[0]);
})



//create
router.post("/tickets", async (request, response)=>{
    let addValue=request.body
    let data=await db.collection('Tickets').find({}).toArray();
    let id=data.length+1;
    addValue["id"]=id;
    data=await db.collection('Tickets').insertOne(addValue);
    response.json(data);
}) 

//update
router.put("/tickets/:id", async (request, response)=>{
    let addValue=request.body
    addValue["id"]=Number(request.params.id);
    let data=await db.collection("Tickets").updateOne({"id": addValue["id"]}, {"$set": addValue});
    data=await db.collection('Tickets').find({"id": Number(request.params.id)}).project({_id:0, id:1, nombre:1, materia:1}).toArray();
    response.json(data[0]);
})    

//delete
router.delete("/tickets/:id", async (request, response)=>{
    let data=await db.collection('Tickets').deleteOne({"id": Number(request.params.id)});
    response.json(data);
})

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