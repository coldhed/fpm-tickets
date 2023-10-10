import { connectDB } from "../db.js";

async function createNewTicket(titulo, categoria, aula, prioridad, resolucion, estatus) {

    let db = await connectDB();

    try {

        let newTicket = {
            "inicio:": Date(),
            "titulo": titulo,
            "categoria": categoria,
            "aula": nombre,
            "prioridad": prioridad,
            "resolucion": resolucion,
            "estatus": estatus,
            "u_mod": Date(),
            //"cierre": Date(),
        };
        await db.collection("Usuarios").insertOne(newTicket);
        return 201;
    } catch {
        return 500;
    }

}



export { createNewTicket };
