import { Router } from 'express';


import { connectDB } from '../util.js';

const router = Router();

// primera grafica
// Cual categoria es la más usada, cual es la categoría en la que mas tickets son abiertos
router.get("/category-usage", async (req, res) => {
    try {
        const db = await connectDB();
        // Hello

        // Agregar lógica para consultar la base de datos y obtener el recuento de uso de categorías
        const categoryUsage = await db.collection('Tickets').aggregate([
            {
                $group: {
                    _id: "$categoria",
                    count: { $sum: 1 }
                }
            }
        ]).toArray();

        // Organizar los datos en dos arrays: uno para el tipo de categoría y otro para la cantidad de uso
        const categoryTypes = [];
        const usageCounts = [];
        
        categoryUsage.forEach((entry) => {
            // Suponemos que la categoría está almacenada como un ObjectId en la base de datos.
            // Debes convertirlo a una cadena si es necesario.
            const categoryId = entry._id.toString();
            const categoryCount = entry.count;

            // Agregar el tipo de categoría y el recuento a los arrays respectivos
            categoryTypes.push(categoryId);
            usageCounts.push(categoryCount);
        });
        // regresar los datos en formato JSON
        res.json({ categoryTypes, usageCounts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener datos de categorías y su uso." });
    }
});


// segunda grafica
// Cuantos tickets hay por aula para saber cual aula es la que tiene más tickets
router.get("/tickets-per-aula", async (req, res) => {
    try {
        const db = await connectDB();

        // Agregar lógica para consultar la base de datos y obtener el recuento de tickets por aula
        const ticketsPerAula = await db.collection('Tickets').aggregate([
            {
                $group: {
                    _id: "$aula",
                    count: { $sum: 1 }
                }
            }
        ]).toArray();

        // Organizar los datos en dos arrays: uno para las aulas y otro para la cantidad de tickets
        const aulaNames = [];
        const ticketCounts = [];
        
        ticketsPerAula.forEach((entry) => {
            // Suponemos que el aula está almacenada como un ObjectId en la base de datos.
            // Debes convertirlo a una cadena si es necesario.
            const aulaId = entry._id.toString();
            const ticketCount = entry.count;

            // Agregar el nombre del aula y el recuento a los arrays respectivos
            aulaNames.push(aulaId);
            ticketCounts.push(ticketCount);
        });

        res.json({ aulaNames, ticketCounts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener datos de tickets por aula." });
    }
});

// 3 three status
// Cuantos tickets hay por estatus para saber cual estatus es el que tiene más tickets

router.get("/tickets-by-status", async (req, res) => {
    try {
        const db = await connectDB();

        // Consulta para contar los tickets en cada uno de los tres estados
        const ticketStatus = await db.collection('Tickets').aggregate([
            {
                $match: {
                    estatus: { $in: ["Abierto", "En proceso", "Cerrado"] }
                }
            },
            {
                $group: {
                    _id: "$estatus",
                    count: { $sum: 1 }
                }
            }
        ]).toArray();

        // Organizar los datos en dos arrays: uno para los estados y otro para la cantidad de tickets en cada estado
        const statuses = [];
        const ticketCounts = [];

        ticketStatus.forEach((entry) => {
            const status = entry._id;
            const ticketCount = entry.count;

            // Agregar el estado y el recuento a los arrays respectivos
            statuses.push(status);
            ticketCounts.push(ticketCount);
        });

        res.json({ statuses, ticketCounts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener datos de tickets por estado." });
    }
});



// 4
// promedio en el que un ticket pasa de abierto a cerrado
router.get("/tiempo-promedio-cierre", async (req, res) => {
    try {
        const db = await connectDB();

        // Consulta para obtener los tickets en estado "Cerrado"
        const ticketsCerrados = await db.collection('Tickets').find({estatus: "Cerrado"}).toArray();

        let totalTiempo = 0;

        for (const ticket of ticketsCerrados) {
            const inicio = new Date(ticket.inicio);
            const fin = new Date(ticket.fin);
            totalTiempo += (fin - inicio);
        }

        const tiempoPromedio = totalTiempo / ticketsCerrados.length;
        
        const tiempoFinal = Math.floor(tiempoPromedio / 1000 / 60 / 60); // a horas


        res.json({ tiempoFinal });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al calcular el tiempo promedio de cierre de tickets." });
    }
});


export default router;