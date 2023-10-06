import { Router } from 'express';
import { connectDB } from '../db.js';
import { createNewTicket } from '../helpers/ticket.js';
import { ObjectId } from 'mongodb';


const router = Router();

/*
router.post("ruta", async (request, response) => {
    
})
*/

//getList, getMany, getManyReference
router.get("/", async (req, res) => {
    let db = await connectDB();
    let data = [];

    if ("_sort" in req.query) { //List -> Datos ordenadoa
        let sortBy = req.query._sort;
        let sortOrder = req.query._order == "ASC" ? 1 : -1; //ASCENDENTE O DESCENDENTE

        let start = Number(req.query._start)
        let end = Number(req.query._end)

        let sorter = {} // no puedo aladir un avariable como nombre salvo así
        sorter[sortBy] = sortOrder

        data = await db.collection("Tickets").find({}).sort(sorter).project({ }).toArray();

        res.set("Access-Control-Expose-Headers", "X-Total-Count"); //los headers de la respuesta
        res.set("X-Total-Count", data.length);

        data = data.slice(start, end); //para partirla

    } else if ("id" in req.query) { //Many -> Datos con ciertos id


        for (let index = 0; index < request.query.id.length; index++) { //recorremos el array de ids
            let dataObtain = await db.collection('Tickets').find({ _id: new ObjectId(request.query.id[index]) }).project({ }).toArray(); // sacamos el valor del index y luego la proyección
            data = await data.concat(dataObtain)
        }
        
    } else { //Reference -> datos que me pide el query 
        
        data = await db.collection('tickets').find(request.query).project({ }).toArray();
        res.set('Access-Control-Expose-Headers', 'X-Total-Count')
        res.set('X-Total-Count', data.length)
    }
    for (let i = 0; i < data.length; i++) {
        data[i]["id"] = data[i]["_id"];
    }


    res.json(data);
})

//getOne
router.get("/:id", async (request, res) => {
    let db = await connectDB();

    let data = await db.collection('Tickets').findOne({ "_id": new ObjectId(request.params.id) });
    data["id"] = data["_id"];
    delete data["_id"];

    res.json(data);
})



//create
router.post("/", async (request, res) => {
    // console.log(request.body)

    let db = await connectDB();
    let addValue = request.body
    let comentarios = addValue["comentarios"];
    addValue["comentarios"] = [{ "comentarios": comentarios, "fecha": Date() }];
    addValue["inicio"] = Date();
    // let data = await db.collection('Tickets').find({}).toArray();
    // let id = data.length + 1;
    // addValue["id"] = id;
   let data = await db.collection('Tickets').insertOne(addValue);
    res.json(data);
})

//update
router.put("/:id", async (request, res) => {
    let db = await connectDB();

    let addValue = request.body;
    console.log(addValue) //fdalñsjfñal

    addValue["_id"] = new ObjectId(request.params.id);
    delete addValue["id"];

    let data = await db.collection("Tickets").updateOne({ "_id": addValue["_id"] }, { "$set": addValue });

    data = await db.collection('Tickets').findOne({ "_id": new ObjectId(request.params.id) });
    data["id"] = data["_id"];
    delete data["_id"];

    res.json(data);
})

//update
// router.put("/:id", async (request, response) => {
//     let db = await connectDB();

//     let addValue = request.body
//     addValue["id"] = Number(request.params.id);
//     let data = await db.collection("Tickets").updateOne({ "id": addValue["id"] }, { "$set": addValue });
//     data = await db.collection('Tickets').find({ "id": Number(request.params.id) }).project({ }).toArray();

//     for (let i = 0; i < data.length; i++) {
//         data[i]["id"] = data[i]["_id"];
//     }

//     res.json(data);
// })

//delete
router.delete("/:id", async (request, response) => {
    let db = await connectDB();

    let data = await db.collection('Tickets').deleteOne({ "id": Number(request.params.id) });
    response.json(data);
})




export default router;