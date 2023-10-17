import express from "express"
import cors from "cors"
import dotenv from 'dotenv';
import mongoSanitize from 'express-mongo-sanitize';

import https from "https";
import fs from "fs";

dotenv.config();

import { ENV, PORT } from "./const.js"
import { connectDB } from './util.js';
import { usersRouter, ticketRouter, aulasRouter } from "./routes/routes.js"


const app = express();
app.use(express.json());
app.use(cors());

// avoid nosql injection by replacing mongo prohibited chars with _
app.use(
    mongoSanitize({
        replaceWith: '_',
        onSanitize: ({ req, key }) => {
            console.warn(`This request[${key}] is sanitized`, req);
        },
    }),
);



// default route
app.get("/", async (req, res) => {
    res.send("Server running");
});

// ROUTES
app.use("/Usuarios", usersRouter)
app.use("/Tickets", ticketRouter)
app.use("/Aula", aulasRouter)

// app.listen(PORT, () => {
//     console.log("Server started");
//     connectDB()
//     console.log("DB connected");
// });

https.createServer({ cert: fs.readFileSync("backend.cer"), key: fs.readFileSync("backend.key") }, app).listen(4000, () => {
    connectDB();
    // console.log("Servidor escuchando en puerto 1337")
    console.log("Server started");
    console.log("DB connected");
});