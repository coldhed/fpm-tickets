import { CreateButton, Toolbar, SaveButton, DateField, SelectInput, TextInput, SimpleForm, Create, required, FormDataConsumer } from "react-admin";
import { useEffect, useState } from "react";
import { useMediaQuery, Theme } from "@mui/material";
import { SearchInput, List, Datagrid, TextField, EditButton } from "react-admin";
import LibaryBooks from "@mui/icons-material/LibraryBooks";
import { Chip } from '@mui/material'
import Visibility from "@mui/icons-material/Visibility";

import { SavedQueriesList, FilterLiveSearch, FilterList, FilterListItem } from 'react-admin';
import { Card, CardContent } from '@mui/material';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';

import Grid from '@mui/material/Grid';
import '../../CSS/TicketCreate.css';

// New

const CreateToolbar = (props: any) => (
    <Toolbar {...props}>
        <SaveButton label="Enviar Ticket" />
    </Toolbar>
)

export const TicketCreate = (props: any) => {
    const [nomAula, setNom_aula] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchNomAula() {
        const request = new Request("https://127.0.0.1:4000/Aula/nombre", {
            method: "GET",
            headers: new Headers({ Authentication: localStorage.getItem("auth") as string }),
        });

        try {
            let response = await fetch(request);
            console.log(await response.json)
            let data = await response.json();

            setNom_aula(data);
            setIsLoading(false);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (isLoading) {
            fetchNomAula();
        }
    }, [isLoading])

    return (
        <Create {...props}>
            <div className="relative flex flex-col items-center rounded-[20px] w-[1200px] max-w-[95%] mx-auto bg-neutral-200 bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
                <SimpleForm title="Crear Ticket" toolbar={<CreateToolbar />}>
                    <Grid container spacing={2}>
                        <div className="full-width-input flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                            <TextInput source="titulo" className="full-width-input" validate={[required('Campo Obligatorio')]} />
                        </div>

                        <div className="full-width-input flex flex-col items-start justify-center rounded-2xl  bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        </div>

                        <div className="grid grid-cols-5 gap-0 px-2 w-full">

                            <div className="w-full flex flex-col items-start justify-center bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">

                                <FormDataConsumer>
                                    {({ formData, ...rest }) => {
                                        return (
                                            <SelectInput
                                                source="aula"
                                                label="Aula"
                                                isLoading={isLoading}
                                                choices={nomAula}
                                                validate={[required('Campo Obligatorio')]}
                                            />
                                        );
                                    }}

                                </FormDataConsumer>
                            </div>
                            <div className="w-full flex flex-col items-start justify-center bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <SelectInput
                                    source="categoria"
                                    label="Clasificación"
                                    className="full-width-input"
                                    choices={[
                                        { id: 'Servicios', name: 'Servicios' },
                                        { id: 'Digital', name: 'Digital' },
                                        { id: 'Infraestructura', name: 'Infraestructura' },
                                        { id: 'Recursos Humanos', name: 'Recursos Humanos' },
                                        { id: 'Beneficiarios', name: 'Beneficiarios' },
                                        { id: 'Mobiliario', name: 'Mobiliario' },
                                        { id: 'Seguridad', name: 'Seguridad' },
                                        { id: 'Materiales', name: 'Materiales' },
                                        { id: 'Fenómenos meteorológicos', name: 'Fenómenos meteorológicos' },
                                    ]}
                                    validate={[required('Campo Obligatorio')]}
                                />
                            </div>
                            <div className="w-full flex flex-col items-start justify-center bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <FormDataConsumer>
                                    {({ formData, ...rest }) => formData.categoria === 'Servicios' && (

                                        <SelectInput
                                            source="subcategoria"
                                            label="Tipo de Incidencia"
                                            className="full-width-input"
                                            choices={[
                                                { id: 'Agua', name: 'Agua' },
                                                { id: 'Luz', name: 'Luz' },
                                                { id: 'Teléfono', name: 'Teléfono' },
                                                { id: 'Basura', name: 'Basura' },
                                                { id: 'Limpieza del Aula', name: 'Limpieza del Aula' },
                                            ]}
                                            validate={[required('Campo Obligatorio')]}
                                            {...rest}
                                        />

                                    )}
                                </FormDataConsumer>
                                <FormDataConsumer>
                                    {({ formData, ...rest }) => formData.categoria === 'Digital' && (

                                        <SelectInput
                                            source="subcategoria"
                                            label="Tipo de Incidencia"
                                            className="full-width-input"
                                            choices={[
                                                { id: 'Internet, Servicios y Equipo', name: 'Internet, Servicios y Equipo' },
                                                { id: 'Software', name: 'Software' },
                                                { id: 'Hardware', name: 'Teléfono' },
                                                { id: 'Cámaras de seguridad', name: 'Cámaras de seguridad' },
                                                { id: 'Soporte técnico presencial y remoto', name: 'Soporte técnico presencial y remoto' },
                                            ]}
                                            validate={[required('Campo Obligatorio')]}
                                            {...rest}
                                        />

                                    )}
                                </FormDataConsumer>
                                <FormDataConsumer>
                                    {({ formData, ...rest }) => formData.categoria === 'Infraestructura' && (

                                        <SelectInput
                                            source="subcategoria"
                                            label="Tipo de Incidencia"
                                            className="full-width-input"
                                            choices={[
                                                { id: 'Techo', name: 'Techo' },
                                                { id: 'Ventanas', name: 'Ventanas' },
                                                { id: 'Puertas', name: 'Puertas' },
                                                { id: 'Aulas en general', name: 'Aulas en general' },
                                            ]}
                                            validate={[required('Campo Obligatorio')]}
                                            {...rest}
                                        />

                                    )}
                                </FormDataConsumer>
                                <FormDataConsumer>
                                    {({ formData, ...rest }) => formData.categoria === 'Recursos Humanos' && (

                                        <SelectInput
                                            source="subcategoria"
                                            label="Tipo de Incidencia"
                                            className="full-width-input"
                                            choices={[
                                                { id: 'Permisos', name: 'Permisos' },
                                                { id: 'Asistencias', name: 'Asistencias' },
                                                { id: 'Salud', name: 'Salud' },
                                                { id: 'Trámites', name: 'Trámites' },
                                                { id: 'Honorarios', name: 'Honorarios' },
                                            ]}
                                            validate={[required('Campo Obligatorio')]}
                                            {...rest}
                                        />

                                    )}
                                </FormDataConsumer>
                                <FormDataConsumer>
                                    {({ formData, ...rest }) => formData.categoria === 'Beneficiarios' && (

                                        <SelectInput
                                            source="subcategoria"
                                            label="Tipo de Incidencia"
                                            className="full-width-input"
                                            choices={[
                                                { id: 'Asistencias', name: 'Asistencias' },
                                                { id: 'Documentación', name: 'Documentación' },
                                                { id: 'Apoyo Académico', name: 'Apoyo Académico' },
                                                { id: 'Salud', name: 'Salud' },
                                                { id: 'Seguridad, bulling', name: 'Seguridad, bulling' },
                                            ]}
                                            validate={[required('Campo Obligatorio')]}
                                            {...rest}
                                        />

                                    )}
                                </FormDataConsumer>
                                <FormDataConsumer>
                                    {({ formData, ...rest }) => formData.categoria === 'Mobiliario' && (

                                        <SelectInput
                                            source="subcategoria"
                                            label="Tipo de Incidencia"
                                            className="full-width-input"
                                            choices={[
                                                { id: 'Sillas, butacas', name: 'Sillas, butacas' },
                                                { id: 'Escritorio', name: 'Escritorio' },
                                                { id: 'Pizarrones', name: 'Pizarrones' },
                                                { id: 'Cafetería', name: 'Cafetería' },
                                                { id: 'Estantes, archiveros', name: 'Estantes, archiveros' },
                                            ]}
                                            validate={[required('Campo Obligatorio')]}
                                            {...rest}
                                        />

                                    )}
                                </FormDataConsumer>
                                <FormDataConsumer>
                                    {({ formData, ...rest }) => formData.categoria === 'Seguridad' && (

                                        <SelectInput
                                            source="subcategoria"
                                            label="Tipo de Incidencia"
                                            className="full-width-input"
                                            choices={[
                                                { id: 'Delincuencia', name: 'Delincuencia' },
                                                { id: 'Robos', name: 'Robos' },
                                                { id: 'Bandalismo', name: 'Bandalismo' },
                                                { id: 'Imagen Institucional', name: 'Imagen Institucional' },
                                            ]}
                                            validate={[required('Campo Obligatorio')]}
                                            {...rest}
                                        />

                                    )}
                                </FormDataConsumer>
                                <FormDataConsumer>
                                    {({ formData, ...rest }) => formData.categoria === 'Materiales' && (

                                        <SelectInput
                                            source="subcategoria"
                                            label="Tipo de Incidencia"
                                            className="full-width-input"
                                            choices={[
                                                { id: 'Educativos', name: 'Educativos' },
                                                { id: 'Papelería', name: 'Papelería' },
                                                { id: 'Limpieza', name: 'Limpieza' },
                                            ]}
                                            validate={[required('Campo Obligatorio')]}
                                            {...rest}
                                        />

                                    )}
                                </FormDataConsumer>
                                <FormDataConsumer>
                                    {({ formData, ...rest }) => formData.categoria === 'Fenómenos meteorológicos' && (

                                        <SelectInput
                                            source="subcategoria"
                                            label="Tipo de Incidencia"
                                            className="full-width-input"
                                            choices={[
                                                { id: 'Inundaciones', name: 'Inundaciones' },
                                                { id: 'Incendios', name: 'Incendios' },
                                                { id: 'Sismos', name: 'Sismos' },
                                            ]}
                                            validate={[required('Campo Obligatorio')]}
                                            {...rest}
                                        />

                                    )}
                                </FormDataConsumer>
                            </div>
                            <div className="flex flex-col items-start  justify-center  bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <SelectInput
                                    source="prioridad"
                                    className="full-width-input"
                                    choices={[
                                        { id: 'Alta', name: 'Alta' },
                                        { id: 'Media', name: 'Media' },
                                        { id: 'Baja', name: 'Baja' },
                                    ]}
                                    validate={[required('Campo Obligatorio')]}
                                />
                            </div>
                            <div className="flex flex-col items-start justify-center  bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <SelectInput
                                    source="estatus"
                                    className="full-width-input"
                                    choices={[
                                        { id: 'Abierto', name: 'Abierto' },
                                        { id: 'En proceso', name: 'En proceso' },
                                        { id: 'Finalizado', name: 'Finalizado' },
                                    ]}
                                    validate={[required('Campo Obligatorio')]}
                                />
                            </div>

                        </div>

                        <div className="full-width-input flex flex-col items-start justify-center rounded-2xl  bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        </div>

                        <div className="full-width-input flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                            <TextInput source="comentarios" className="full-width-input" multiline rows={5} validate={[required('Campo Obligatorio')]} />
                        </div>
                    </Grid>
                </SimpleForm>
            </div>

        </Create>
    );
}


// Mariel's:
// const CustomSaveButton = () => (
//     <SaveButton
//         label="Enviar Ticket" 
//     />
// );

// const CustomCreateToolbar = (props: any) => (
//     <Toolbar {...props}>
//         <CustomSaveButton />
//     </Toolbar>
// );

// export const TicketCreate = (props: any) => (
//   <Create>
//     <SimpleForm title="Crear Ticket" toolbar={<CreateToolbar />}>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={12}>
//           <TextInput source="titulo" className="full-width-input" validate={[required('Campo Obligatorio')]} />
//         </Grid>
//         <Grid item xs={12} sm={2}>
//           <TextInput source="aula" className="full-width-input" validate={[required('Campo Obligatorio')]} />
//         </Grid>
//         <Grid item xs={12} sm={2}>
//         <SelectInput
//             source="categoria"
//             label="Clasificación"
//             className="full-width-input"
//             choices={[
//               { id: 'Servicios', name: 'Servicios' },
//               { id: 'Digital', name: 'Digital' },
//               { id: 'Infraestructura', name: 'Infraestructura' },
//               { id: 'Recursos Humanos', name: 'Recursos Humanos' },
//               { id: 'Beneficiarios', name: 'Beneficiarios' },
//               { id: 'Mobiliario', name: 'Mobiliario' },
//               { id: 'Seguridad', name: 'Seguridad' },
//               { id: 'Materiales', name: 'Materiales' },
//               { id: 'Fenómenos meteorológicos', name: 'Fenómenos meteorológicos' },
//             ]}
//             validate={[required('Campo Obligatorio')]}
//         />
//         </Grid>

//         <FormDataConsumer>
//           {({ formData, ...rest }) => formData.categoria === 'Servicios' && (
//             <Grid item xs={12} sm={2}>
//               <SelectInput
//                 source="subcategoria"
//                 label="Tipo de Incidencia"
//                 className="full-width-input"
//                 choices={[
//                   { id: 'Agua', name: 'Agua' },
//                   { id: 'Luz', name: 'Luz' },
//                   { id: 'Teléfono', name: 'Teléfono' },
//                   { id: 'Basura', name: 'Basura' },
//                   { id: 'Limpieza del Aula', name: 'Limpieza del Aula' },
//                 ]}
//                 validate={[required('Campo Obligatorio')]}
//                 {...rest}
//               />
//             </Grid>
//           )}  
//         </FormDataConsumer>
//         <FormDataConsumer>
//           {({ formData, ...rest }) => formData.categoria === 'Digital' && (
//             <Grid item xs={12} sm={2}>
//               <SelectInput
//                 source="subcategoria"
//                 label="Tipo de Incidencia"
//                 className="full-width-input"
//                 choices={[
//                   { id: 'Internet, Servicios y Equipo', name: 'Internet, Servicios y Equipo' },
//                   { id: 'Software', name: 'Software' },
//                   { id: 'Hardware', name: 'Teléfono' },
//                   { id: 'Cámaras de seguridad', name: 'Cámaras de seguridad' },
//                   { id: 'Soporte técnico presencial y remoto', name: 'Soporte técnico presencial y remoto' },
//                 ]}
//                 validate={[required('Campo Obligatorio')]}
//                 {...rest}
//               />
//             </Grid>
//           )}  
//         </FormDataConsumer>
//         <FormDataConsumer>
//           {({ formData, ...rest }) => formData.categoria === 'Infraestructura' && (
//             <Grid item xs={12} sm={2}>
//               <SelectInput
//                 source="subcategoria"
//                 label="Tipo de Incidencia"
//                 className="full-width-input"
//                 choices={[
//                   { id: 'Techo', name: 'Techo' },
//                   { id: 'Ventanas', name: 'Ventanas' },
//                   { id: 'Puertas', name: 'Puertas' },
//                   { id: 'Aulas en general', name: 'Aulas en general' },
//                 ]}
//                 validate={[required('Campo Obligatorio')]}
//                 {...rest}
//               />
//             </Grid>
//           )}  
//         </FormDataConsumer>
//         <FormDataConsumer>
//           {({ formData, ...rest }) => formData.categoria === 'Recursos Humanos' && (
//             <Grid item xs={12} sm={2}>
//               <SelectInput
//                 source="subcategoria"
//                 label="Tipo de Incidencia"
//                 className="full-width-input"
//                 choices={[
//                   { id: 'Permisos', name: 'Permisos' },
//                   { id: 'Asistencias', name: 'Asistencias' },
//                   { id: 'Salud', name: 'Salud' },
//                   { id: 'Trámites', name: 'Trámites' },
//                   { id: 'Honorarios', name: 'Honorarios' },
//                 ]}
//                 validate={[required('Campo Obligatorio')]}
//                 {...rest}
//               />
//             </Grid>
//           )}  
//         </FormDataConsumer>
//         <FormDataConsumer>
//           {({ formData, ...rest }) => formData.categoria === 'Beneficiarios' && (
//             <Grid item xs={12} sm={2}>
//               <SelectInput
//                 source="subcategoria"
//                 label="Tipo de Incidencia"
//                 className="full-width-input"
//                 choices={[
//                   { id: 'Asistencias', name: 'Asistencias' },
//                   { id: 'Documentación', name: 'Documentación' },
//                   { id: 'Apoyo Académico', name: 'Apoyo Académico' },
//                   { id: 'Salud', name: 'Salud' },
//                   { id: 'Seguridad, bulling', name: 'Seguridad, bulling' },
//                 ]}
//                 validate={[required('Campo Obligatorio')]}
//                 {...rest}
//               />
//             </Grid>
//           )}  
//         </FormDataConsumer>
//         <FormDataConsumer>
//           {({ formData, ...rest }) => formData.categoria === 'Mobiliario' && (
//             <Grid item xs={12} sm={2}>
//               <SelectInput
//                 source="subcategoria"
//                 label="Tipo de Incidencia"
//                 className="full-width-input"
//                 choices={[
//                   { id: 'Sillas, butacas', name: 'Sillas, butacas' },
//                   { id: 'Escritorio', name: 'Escritorio' },
//                   { id: 'Pizarrones', name: 'Pizarrones' },
//                   { id: 'Cafetería', name: 'Cafetería' },
//                   { id: 'Estantes, archiveros', name: 'Estantes, archiveros' },
//                 ]}
//                 validate={[required('Campo Obligatorio')]}
//                 {...rest}
//               />
//             </Grid>
//           )}  
//         </FormDataConsumer>
//         <FormDataConsumer>
//           {({ formData, ...rest }) => formData.categoria === 'Seguridad' && (
//             <Grid item xs={12} sm={2}>
//               <SelectInput
//                 source="subcategoria"
//                 label="Tipo de Incidencia"
//                 className="full-width-input"
//                 choices={[
//                   { id: 'Delincuencia', name: 'Delincuencia' },
//                   { id: 'Robos', name: 'Robos' },
//                   { id: 'Bandalismo', name: 'Bandalismo' },
//                   { id: 'Imagen Institucional', name: 'Imagen Institucional' },
//                 ]}
//                 validate={[required('Campo Obligatorio')]}
//                 {...rest}
//               />
//             </Grid>
//           )}  
//         </FormDataConsumer>
//         <FormDataConsumer>
//           {({ formData, ...rest }) => formData.categoria === 'Materiales' && (
//             <Grid item xs={12} sm={2}>
//               <SelectInput
//                 source="subcategoria"
//                 label="Tipo de Incidencia"
//                 className="full-width-input"
//                 choices={[
//                   { id: 'Educativos', name: 'Educativos' },
//                   { id: 'Papelería', name: 'Papelería' },
//                   { id: 'Limpieza', name: 'Limpieza' },
//                 ]}
//                 validate={[required('Campo Obligatorio')]}
//                 {...rest}
//               />
//             </Grid>
//           )}  
//         </FormDataConsumer>
//         <FormDataConsumer>
//           {({ formData, ...rest }) => formData.categoria === 'Fenómenos meteorológicos' && (
//             <Grid item xs={12} sm={2}>
//               <SelectInput
//                 source="subcategoria"
//                 label="Tipo de Incidencia"
//                 className="full-width-input"
//                 choices={[
//                   { id: 'Inundaciones', name: 'Inundaciones' },
//                   { id: 'Incendios', name: 'Incendios' },
//                   { id: 'Sismos', name: 'Sismos' },
//                 ]}
//                 validate={[required('Campo Obligatorio')]}
//                 {...rest}
//               />
//             </Grid>
//           )}  
//         </FormDataConsumer>

//         <Grid item xs={12} sm={3}>
//           <SelectInput
//             source="prioridad"
//             className="full-width-input"
//             choices={[
//               { id: 'Alta', name: 'Alta' },
//               { id: 'Media', name: 'Media' },
//               { id: 'Baja', name: 'Baja' },
//             ]}
//             validate={[required('Campo Obligatorio')]}
//           />
//         </Grid>
//         <Grid item xs={12} sm={3}>
//           <SelectInput
//             source="estatus"
//             className="full-width-input"
//             choices={[
//               { id: 'Abierto', name: 'Abierto' },
//               { id: 'En proceso', name: 'En proceso' },
//               { id: 'Finalizado', name: 'Finalizado' },
//             ]}
//             validate={[required('Campo Obligatorio')]}
//           />
//         </Grid>
//         <Grid item xs={12} sm={12}>
//           <TextInput source="comentarios" className="full-width-input" multiline rows={5} validate={[required('Campo Obligatorio')]} />
//         </Grid>
//       </Grid>
//     </SimpleForm>
//   </Create>
// );