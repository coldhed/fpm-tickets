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
        const request = new Request("http://127.0.0.1:4000/Usuarios/cn", {
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


    //         "nombre": nombre,
    //         "coor_aula": coor_aula,
    //         "direccion": direccion,
    //         "ciudad": ciudad,
    //         "esatdo": estado,
    //         "CP": codigo_postal,
    //         "calle": calle,

    return (
        <Create {...props}>
            <SimpleForm toolbar={<CreateToolbar />}>
                <TextInput source="nombre" label="Nombre" />
                <TextInput source="coor_aula" label="Coordinador de Aula" />
                {/* Fetch coor_aula */}
                {/* <FormDataConsumer>
                    {({ formData, ...rest }) => {
                        return (
                            <SelectInput
                                source="coor_aula"
                                label="Coordinador Nacional"
                                disabled={formData.rol !== 'ca'}
                                isLoading={isLoading}
                                choices={formData.rol === 'ca' ? coor_nac : []}
                            />
                        );
                    }}
                </FormDataConsumer> */}
                <TextInput source="direccion" label="Direccion" />
                <TextInput source="ciudad" label="Ciudad" />
                <TextInput source="esatdo" label="Estado" />
                <TextInput source="codigo_postal" label="Codigo Postal" />
                <TextInput source="calle" label="Calle" />
                
            </SimpleForm>
        </Create>
    );
}