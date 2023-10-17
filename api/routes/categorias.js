import { Router } from 'express';
import { connectDB } from '../util.js';


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

        data = await db.collection("Categorias").find({}).sort(sorter).project({}).toArray();

        res.set("Access-Control-Expose-Headers", "X-Total-Count"); //los headers de la respuesta
        res.set("X-Total-Count", data.length);

        data = data.slice(start, end); //para partirla

    } else if ("id" in req.query) { //Many -> Datos con ciertos id


        for (let index = 0; index < request.query.id.length; index++) { //recorremos el array de ids
            let dataObtain = await db.collection('Categorias').find({ id: Number(request.query.id[index]) }).project({}).toArray(); // sacamos el valor del index y luego la proyección
            data = await data.concat(dataObtain)
        }

    } else { //Reference -> datos que me pide el query 

        data = await db.collection('Categorias').find(request.query).project({}).toArray();
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

    let data = await db.collection('Categorias').find({ "id": Number(request.params.id) }).project({ _id: 0 }).toArray();
    res.json(data[0]);
})

export default router;