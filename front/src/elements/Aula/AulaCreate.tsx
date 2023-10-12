import { useEffect, useState } from "react";
import { Create, CreateButton, FormDataConsumer, SaveButton, SelectInput, SimpleForm, TextInput, Toolbar, required } from "react-admin";


const CreateToolbar = (props: any) => (
    <Toolbar {...props}>
        <SaveButton label="Crear Aula" />
    </Toolbar>
)

export const AulaCreate = (props: any) => {
    const [coor_nac, setCoor_nac] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchCoor_nac() {
        const request = new Request("https://127.0.0.1:4000/Usuarios/cn", {
            method: "GET",
            headers: new Headers({ Authentication: localStorage.getItem("auth") as string }),
        });

        try {
            let response = await fetch(request);

            let data = await response.json();

            setCoor_nac(data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (isLoading) {
            fetchCoor_nac();
        }
    }, [isLoading])

    return (
        <Create {...props}>
            <SimpleForm toolbar={<CreateToolbar />}>
                <TextInput source="nombre" label="Nombre" />
                <TextInput source="coor_aula" label="Coordinador" />
                <TextInput source="ciudad" label="Ciudad" />
                <TextInput source="esatdo" label="Estado" />
                <TextInput source="CP" label="Codigo Postal" />
                <TextInput source="calle" label="Calle" />
                
            </SimpleForm>
        </Create>
    );
}

// "_id": "6528672852adaf594cea4f33",
//     "nombre": "Aula 1 - Colegio Occidente",
//     "coor_aula": "651221e905e2d70aed0d4f95",
//     "ciudad": "Ciudad Obregón",
//     "esatdo": "Sonora",
//     "CP": "189",
//     "calle": "Calle 300",
//     "id": "6528672852adaf594cea4f33"