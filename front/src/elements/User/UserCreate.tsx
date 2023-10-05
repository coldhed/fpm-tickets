import { useEffect, useState } from "react";
import { Create, CreateButton, FormDataConsumer, SaveButton, SelectInput, SimpleForm, TextInput, Toolbar, required } from "react-admin";

const CreateToolbar = (props: any) => (
    <Toolbar {...props}>
        <SaveButton label="Crear Usuario" />
    </Toolbar>
)

export const UserCreate = (props: any) => {
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

    return (
        <Create {...props}>
            <SimpleForm toolbar={<CreateToolbar />}>
                <TextInput source="nombre_completo" label="Nombre Completo" />
                <TextInput source="correo" label="Correo" />
                <TextInput source="contrasena" label="Contraseña" />
                <SelectInput source="rol" label="Rol" defaultValue="ca" validate={required()} choices={[
                    { id: 'ca', name: 'Coordinador de Aula' },
                    { id: 'cn', name: 'Coordinador Nacional' },
                    { id: 'ce', name: 'Coordinador Ejecutivo' },
                ]} />
                <FormDataConsumer>
                    {({ formData, ...rest }) => {
                        return (
                            <SelectInput
                                source="coor_nac"
                                label="Coordinador Nacional"
                                disabled={formData.rol !== 'ca'}
                                isLoading={isLoading}
                                choices={formData.rol === 'ca' ? coor_nac : []}
                            />
                        );
                    }}
                </FormDataConsumer>
            </SimpleForm>
        </Create>
    );
}