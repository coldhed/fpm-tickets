import {CreateButton, Toolbar, SaveButton, DateField, SelectInput, TextInput, SimpleForm, Create, required, FormDataConsumer } from "react-admin";
import { useEffect, useState } from "react";

const CreateToolbar = (props: any) => (
    <Toolbar {...props}>
        <SaveButton label="Crear Aula" />
    </Toolbar>
)

export const AulaCreate = (props: any) => {
    const [nomCoor, setCoor] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchnomCoor() {
        const request = new Request("https://127.0.0.1:4000/Usuarios/correo", {
            method: "GET",
            headers: new Headers({ Authentication: localStorage.getItem("auth") as string}),
        });

        try {
            let response = await fetch(request);
            console.log(await response.json)
            let data = await response.json();
      
            setCoor(data);
            setIsLoading(false);
          }
          catch(error){
            console.log(error);
          }
    }

    useEffect(() => {
        if (isLoading) {
          fetchnomCoor();
        }
      }, [isLoading])

    return (
        
        <Create {...props}>
            <SimpleForm title="Crear Aula" toolbar={<CreateToolbar />}>
                <TextInput source="nombre" label="Nombre Aula" validate={[required('Campo Obligatorio')]}/>
                <FormDataConsumer>
                    {({ formData, ...rest }) => {
                        return (
                            <SelectInput
                                source="Usuarios"
                                label="Coordinador"
                                isLoading={isLoading}
                                choices={nomCoor}
                                validate={[required('Campo Obligatorio')]}
                            />
                        ); 
                    }}
                </FormDataConsumer>
                <TextInput source="ciudad" label="Ciudad" validate={[required('Campo Obligatorio')]} />
                <TextInput source="esatdo" label="Estado" validate={[required('Campo Obligatorio')]}/>
                <TextInput source="CP" label="Codigo Postal" validate={[required('Campo Obligatorio')]}/>
                <TextInput source="calle" label="Calle" validate={[required('Campo Obligatorio')]}/>
                
            </SimpleForm>
        </Create>
    );
}

// "_id": "6528672852adaf594cea4f33",
//     "nombre": "Aula 1 - Colegio Occidente",
//     "coor_aula": "mariel@fpm.mx",
//     "ciudad": "Ciudad Obregón",
//     "esatdo": "Sonora",
//     "CP": "189",
//     "calle": "Calle 300",
//     "id": "6528672852adaf594cea4f33"