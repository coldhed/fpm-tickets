import { useEffect, useState } from "react";
import { Create, CreateButton, FormDataConsumer, SaveButton, SelectInput, SimpleForm, TextInput, Toolbar, required } from "react-admin";

const CreateToolbar = (props: any) => (
    <Toolbar {...props}>
        <SaveButton label="Crear Usuario" />
    </Toolbar>
)

export const UserCreate = (props: any) => {
    const headerStyle = "text-xl font-bold  pt-1 text-[#c22032]"
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
        <Create {...props} className="mt-4 mr-[8rem] ml-12">
            <SimpleForm toolbar={<CreateToolbar />}>
                <div className="px-8 py-4 grid grid-cols-2 gap-y-7 gap-x-14 ">
                    <div>
                        <p className={headerStyle}>Nombre Completo</p>
                        <TextInput source="nombre_completo" label="" />
                    </div>

                    <div>
                        <p className={headerStyle}>Correo</p>
                        <TextInput source="correo" label="" />
                    </div>

                    <div>
                        <p className={headerStyle}>Contraseña</p>
                        <TextInput source="contrasena" label="" />
                    </div>

                    <div>
                        <p className={headerStyle}>Rol</p>
                        <SelectInput source="rol" label="" defaultValue="ca" validate={required()} choices={[
                            { id: 'ca', name: 'Coordinador de Aula' },
                            { id: 'cn', name: 'Coordinador Nacional' },
                            { id: 'ce', name: 'Coordinador Ejecutivo' },
                        ]} />
                    </div>

                    <div>
                        <p className={headerStyle}>Coordinador Nacional</p>
                        <FormDataConsumer>
                            {({ formData, ...rest }) => {
                                return (
                                    <SelectInput
                                        source="coor_nac"
                                        label=""
                                        disabled={formData.rol !== 'ca'}
                                        isLoading={isLoading}
                                        choices={formData.rol === 'ca' ? coor_nac : []}
                                    />
                                );
                            }}
                        </FormDataConsumer>
                    </div>
                </div>
            </SimpleForm>
        </Create >
    );
}