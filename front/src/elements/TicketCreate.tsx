import {Toolbar, SaveButton, DateField, SelectInput, TextInput, SimpleForm,Create, required } from "react-admin";
import Grid from '@mui/material/Grid';
import '../CSS/TicketCreate.css';

const CustomSaveButton = () => (
    <SaveButton
        label="Enviar Ticket" 
    />
);

const CustomCreateToolbar = () => (
    <Toolbar>
        <CustomSaveButton />
    </Toolbar>
);



// export const TicketCreate = () => (
//     <Create>
//        <SimpleForm title= {"Crear Ticket"} toolbar={<CustomCreateToolbar/>} >
//             <DateField source="inicio" showTime />
//             <TextInput source="titulo" className="full-width-input" validate={[required('Campo Obligatorio')]}/>
//             <TextInput source="aula" className="full-width-input" validate={[required('Campo Obligatorio')]}/>
//             <TextInput source="categoria" validate={[required('Campo Obligatorio')]}/>
//             <SelectInput source="prioridad" choices={[
//                 { id: 'a', name: 'Alta' },
//                 { id: 'm', name: 'Media' },
//                 { id: 'b', name: 'Baja' },
//             ]} validate={[required('Campo Obligatorio')]} />
//             <SelectInput source="estatus" choices={[
//                 { id: 'ab', name: 'Abierto' },
//                 { id: 'ep', name: 'En proceso' },
//                 { id: 'fi', name: 'Finalizado' },
//             ]} validate={[required('Campo Obligatorio')]} />
//             <TextInput source="comentarios" validate={[required('Campo Obligatorio')]}/>
//         </SimpleForm>
//     </Create>
// );

export const TicketCreate = () => (
    <Create>
      <SimpleForm title="Crear Ticket" toolbar={<CustomCreateToolbar />}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextInput source="titulo" className="full-width-input" validate={[required('Campo Obligatorio')]} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextInput source="aula" className="full-width-input" validate={[required('Campo Obligatorio')]} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput source="categoria" validate={[required('Campo Obligatorio')]} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectInput
              source="prioridad"
              choices={[
                { id: 'a', name: 'Alta' },
                { id: 'm', name: 'Media' },
                { id: 'b', name: 'Baja' },
              ]}
              validate={[required('Campo Obligatorio')]}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectInput
              source="estatus"
              choices={[
                { id: 'ab', name: 'Abierto' },
                { id: 'ep', name: 'En proceso' },
                { id: 'fi', name: 'Finalizado' },
              ]}
              validate={[required('Campo Obligatorio')]}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput source="comentarios" validate={[required('Campo Obligatorio')]} />
          </Grid>
        </Grid>
      </SimpleForm>
    </Create>
  );