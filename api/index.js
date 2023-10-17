import express from "express"
import cors from "cors"
import dotenv from 'dotenv';
dotenv.config();

import { ENV, PORT } from "./const.js"
import { connectDB } from './util.js';
import { usersRouter, ticketRouter, aulasRouter } from "./routes/routes.js"

// const bodyParser = require("body-parser") //NUEVO

const app = express();
app.use(express.json());
app.use(cors());
// app.use(bodyParser.json()); //NUEVO


// default route
app.get("/", async (req, res) => {
    res.send("Server running");
});

// ROUTES
app.use("/Usuarios", usersRouter)
app.use("/Tickets", ticketRouter)
app.use("/Aula", aulasRouter)

app.listen(PORT, () => {
    console.log("Server started");
    connectDB()
    console.log("DB connected");
});
