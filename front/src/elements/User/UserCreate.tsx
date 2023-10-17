import { useEffect, useState } from "react";
import { Create, CreateButton, FormDataConsumer, SaveButton, SelectInput, SimpleForm, TextInput, Toolbar, required } from "react-admin";
import Grid from '@mui/material/Grid';

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
        <Create {...props}>
            <div className="relative flex flex-col items-center rounded-[20px] w-[1200px] max-w-[95%] mx-auto bg-neutral-200 bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
                
                <SimpleForm toolbar={<CreateToolbar />}>
                    <Grid container spacing={2}>
                    <div className="full-width-input flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <TextInput source="nombre_completo" className="full-width-input" validate={[required('Campo Obligatorio')]} />
                    </div>
                    <div className="full-width-input flex flex-col items-start justify-center rounded-2xl  bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                    </div>

                    <div className="grid grid-cols-5 gap-0 px-2 w-full">

                    </div>

                    <div className="full-width-input flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <TextInput source="correo" className="full-width-input" validate={[required('Campo Obligatorio')]} />
                    </div>
                    <div className="full-width-input flex flex-col items-start justify-center rounded-2xl  bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                    </div>

                    <div className="full-width-input flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <TextInput source="contrasena" label="Contraseña" className="full-width-input" validate={[required('Campo Obligatorio')]} />
                    </div>
                    <div className="full-width-input flex flex-col items-start justify-center rounded-2xl  bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                    </div>

                    <div className="full-width-input flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <SelectInput source="rol" label="Rol" defaultValue="ca" className="full-width-input" validate={required()} choices={[
                            { id: 'ca', name: 'Coordinador de Aula' },
                            { id: 'cn', name: 'Coordinador Nacional' },
                            { id: 'ce', name: 'Coordinador Ejecutivo' },
                        ]} />
                    </div>
                    <div className="full-width-input flex flex-col items-start justify-center rounded-2xl  bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                    </div>

                    <FormDataConsumer>
                        {({ formData, ...rest }) => formData.rol === 'ca' && (

                            <div className="full-width-input flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <SelectInput
                                    source="coor_nac"
                                    label="Coordinador Nacional"
                                    className="full-width-input"
                                    choices={formData.rol === 'ca' ? coor_nac : []}
                                    validate={[required('Campo Obligatorio')]}
                                    {...rest}
                                />
                            </div>


                        )}
                    </FormDataConsumer>
                    
                    </Grid>
                </SimpleForm>
            </div>

        </Create >
    );
}