import express from "express";
import cors from "cors";

import {ENV, PORT} from "./const.js";


const app = express();

app.use(express.json());
app.use(cors());

//Ruta por defualt
app.get("/", (req, res) => {
    res.send(`Servidor trabajando en el puerto ${PORT}`);
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});