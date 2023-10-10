import {CreateButton, Toolbar, SaveButton, DateField, SelectInput, TextInput, SimpleForm, Create, required, FormDataConsumer } from "react-admin";
import { useEffect, useState } from "react";

import Grid from '@mui/material/Grid';
import '../CSS/TicketCreate.css';

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
    const request = new Request("http://127.0.0.1:4000/Aula/nombre", {
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
    catch(error){
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
    <SimpleForm title="Crear Ticket" toolbar={<CreateToolbar />}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <TextInput source="titulo" className="full-width-input" validate={[required('Campo Obligatorio')]} />
        </Grid>
        <Grid item xs={12} sm={2}>
          <FormDataConsumer className="full-width-input">
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
        </Grid>
        <Grid item xs={12} sm={2}>
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
        </Grid>

        <FormDataConsumer>
          {({ formData, ...rest }) => formData.categoria === 'Servicios' && (
            <Grid item xs={12} sm={2}>
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
            </Grid>
          )}  
        </FormDataConsumer>
        <FormDataConsumer>
          {({ formData, ...rest }) => formData.categoria === 'Digital' && (
            <Grid item xs={12} sm={2}>
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
            </Grid>
          )}  
        </FormDataConsumer>
        <FormDataConsumer>
          {({ formData, ...rest }) => formData.categoria === 'Infraestructura' && (
            <Grid item xs={12} sm={2}>
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
            </Grid>
          )}  
        </FormDataConsumer>
        <FormDataConsumer>
          {({ formData, ...rest }) => formData.categoria === 'Recursos Humanos' && (
            <Grid item xs={12} sm={2}>
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
            </Grid>
          )}  
        </FormDataConsumer>
        <FormDataConsumer>
          {({ formData, ...rest }) => formData.categoria === 'Beneficiarios' && (
            <Grid item xs={12} sm={2}>
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
            </Grid>
          )}  
        </FormDataConsumer>
        <FormDataConsumer>
          {({ formData, ...rest }) => formData.categoria === 'Mobiliario' && (
            <Grid item xs={12} sm={2}>
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
            </Grid>
          )}  
        </FormDataConsumer>
        <FormDataConsumer>
          {({ formData, ...rest }) => formData.categoria === 'Seguridad' && (
            <Grid item xs={12} sm={2}>
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
            </Grid>
          )}  
        </FormDataConsumer>
        <FormDataConsumer>
          {({ formData, ...rest }) => formData.categoria === 'Materiales' && (
            <Grid item xs={12} sm={2}>
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
            </Grid>
          )}  
        </FormDataConsumer>
        <FormDataConsumer>
          {({ formData, ...rest }) => formData.categoria === 'Fenómenos meteorológicos' && (
            <Grid item xs={12} sm={2}>
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
            </Grid>
          )}  
        </FormDataConsumer>

        <Grid item xs={12} sm={3}>
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
        </Grid>
        <Grid item xs={12} sm={3}>
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
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextInput source="comentarios" className="full-width-input" multiline rows={5} validate={[required('Campo Obligatorio')]} />
        </Grid>
      </Grid>
    </SimpleForm>
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