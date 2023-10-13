import { Router } from 'express';
import { connectDB } from '../db.js';


const router = Router();

// primera grafica
// Cual categoria es la más usada
router.get("/category-usage", async (req, res) => {
    try {
        const db = await connectDB();

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

        res.json({ categoryTypes, usageCounts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener datos de categorías y su uso." });
    }
});


// segunda grafica
// Cuantos tickets hay por aula

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


export default router;