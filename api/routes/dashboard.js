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

// tercera grafica
// Numero de incidentes en proceso, abiertos y cerrados en la semana. 

// router.get("/tickets-status-in-week", async (req, res) => {
//     try {
//         const db = await connectDB();
        
//         // Obtener la fecha de inicio de la semana actual
//         const today = new Date();
//         const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());

//         // Consulta para contar los tickets en cada estado dentro de la semana actual
//         const ticketStatusInWeek = await db.collection('Tickets').aggregate([
//             {
//                 $match: {
//                     estatus: {
//                         $in: ["Abierto", "En proceso", "Cerrado"]
//                     },
//                     cierre: {
//                         $gte: startOfWeek
//                     }
//                 }
//             },
//             {
//                 $group: {
//                     _id: "$estatus",
//                     count: { $sum: 1 }
//                 }
//             }
//         ]).toArray();

//         // Organizar los datos en dos arrays: uno para los estados y otro para la cantidad de tickets en cada estado
//         const statuses = [];
//         const ticketCounts = [];
        
//         ticketStatusInWeek.forEach((entry) => {
//             const status = entry._id;
//             const ticketCount = entry.count;

//             // Agregar el estado y el recuento a los arrays respectivos
//             statuses.push(status);
//             ticketCounts.push(ticketCount);
//         });

//         res.json({ statuses, ticketCounts });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Error al obtener datos de tickets por estado en la semana." });
//     }
// });


// 4 just closed
// router.get("/closed-tickets", async (req, res) => {
//     try {
//         const db = await connectDB();

//         // Consulta para contar los tickets en estado "Cerrado"
//         const closedTickets = await db.collection('Tickets').aggregate([
//             {
//                 $match: {
//                     estatus: "Cerrado"
//                 }
//             },
//             {
//                 $group: {
//                     _id: null,
//                     count: { $sum: 1 }
//                 }
//             }
//         ]).toArray();

//         // Extraer el recuento de tickets en estado "Cerrado"
//         let closedTicketCount = 0;
//         if (closedTickets.length > 0) {
//             closedTicketCount = closedTickets[0].count;
//         }

//         res.json({ estatus: "Cerrado", ticketCount: closedTicketCount });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Error al obtener datos de tickets en estado 'Cerrado'." });
//     }
// });

// 4 three status

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




export default router;