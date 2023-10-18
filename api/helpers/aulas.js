import { connectDB } from "../util.js";

async function createNewAula(nombre, coor_aula, direccion, ciudad, estado, codigo_postal, calle) {

    let db = await connectDB();

    try {

        let newAula = {
            "_id": id,
            "nombre": nombre,
            "coor_aula": coor_aula,
            "direccion": direccion,
            "ciudad": ciudad,
            "esatdo": estado,
            "CP": codigo_postal,
            "calle": calle,
        };
        await db.collection("Aula").insertOne(newAula);
        return 201;
    } catch {
        return 500;
    }

}

export { createNewAula };