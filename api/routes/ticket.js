import { Router } from 'express';
import { connectDB } from '../db.js';
import { ObjectId } from 'mongodb';


const router = Router();

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

        let filter = {};

        if (req.query.titulo) {
            filter.titulo = req.query.titulo;
        }

        if (req.query.prioridad) {
            filter.prioridad = req.query.prioridad;
        }

        if (req.query.estatus) {
            filter.estatus = req.query.estatus;
        }

        data = await db.collection("Tickets").find(filter).sort(sorter).project({ }).toArray();

        res.set("Access-Control-Expose-Headers", "X-Total-Count"); //los headers de la respuesta
        res.set("X-Total-Count", data.length);

        data = data.slice(start, end); //para partirla

    } else if ("id" in req.query) { //Many -> Datos con ciertos id


        for (let index = 0; index < request.query.id.length; index++) { //recorremos el array de ids
            let dataObtain = await db.collection('Tickets').find({ _id: new ObjectId(request.query.id[index]) }).project({ }).toArray(); // sacamos el valor del index y luego la proyección
            data = await data.concat(dataObtain)
        }
        
    } else { 
        

        // data = await db.collection('Tickets').find(filter).project({ }).toArray();
        // res.set('Access-Control-Expose-Headers', 'X-Total-Count');
        // res.set('X-Total-Count', data.length);

        data = await db.collection('Tickets').find(request.query).project({ }).toArray();
        res.set('Access-Control-Expose-Headers', 'X-Total-Count')
        res.set('X-Total-Count', data.length)
    }

    for (let i = 0; i < data.length; i++) {
        data[i]["id"] = data[i]["_id"];
    }

    // for (let i = 0; i < data.length; i++) {
    //     data[i]["id"] = data[i]["_id"];
    // }


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

    //console.log(addValue) 

    addValue["_id"] = new ObjectId(request.params.id);
    delete addValue["id"];
    addValue.comentarios[addValue.comentarios.length - 1]["fecha"] = Date();
    addValue["u_mod"] = Date();

    if (addValue.hasOwnProperty("resolucion")) {
        addValue["estatus"] = "Cerrado";
        addValue["fin"] = Date();
    }

    let data = await db.collection("Tickets").updateOne({ "_id": addValue["_id"] }, { "$set": addValue });

    data = await db.collection('Tickets').findOne({ "_id": new ObjectId(request.params.id) });
    data["id"] = data["_id"];
    delete data["_id"];

    res.json(data);
})


//delete
router.delete("/:id", async (req, res) => {
    let db = await connectDB();

    let data = await db.collection('Tickets').deleteOne({ "_id": new ObjectId(req.params.id) });
    data["id"] = data["_id"];
    delete data["_id"];

    res.json(data);
})






export default router;