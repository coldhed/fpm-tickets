import {ArrayField, List, Create, SimpleForm, Toolbar, SelectInput, SaveButton, Edit, TextField, TabbedForm, FormTab, required, TextInput, DateField } from 'react-admin';
import {useRecordContext} from "react-admin";
import {useOnSuccess,} from '../hooks/costumhandlers';
import "../CSS/TicketUpdate.css";

const TicketTitle = () => {
    const record = useRecordContext();
    return <span>{record ? `"${record.titulo}"` : ''}</span>;
};
const InicioTextComponent = () => (
    <div className="customTextComp">
      <p>Inicio: </p>
    </div>
);
const TituloTextComponent = () => (
    <div className="customTextComp">
      <p>Título: </p>
    </div>
);
const AulaTextComponent = () => (
    <div className="customTextComp">
      <p>Aula: </p>
    </div>
);
const CategoriaTextComponent = () => (
    <div className="customTextComp">
      <p>Categoría: </p>
    </div>
);
const PrioridadTextComponent = () => (
    <div className="customTextComp">
      <p>Prioridad: </p>
    </div>
);
const EstatusTextComponent = () => (
    <div className="customTextComp">
      <p> Estatus: </p>
    </div>
);
const EstatusCambioTextComponent = () => (
    <div className="customTextComp">
      <p> Cambiar Estatus: </p>
    </div>
);

const CostumCreateComment = () => (
    <Create>
        <SimpleForm>
            <ArrayField source="comentarios">
                <TextField source="comentarios" />
            </ArrayField>
        </SimpleForm>
    </Create>
);




export const TicketEdit = () => {

    return (
        <Edit title={<TicketTitle/>} >
           <TabbedForm >
            <FormTab label = "Ticket">
                <InicioTextComponent />
                <DateField label="Inicio" source="inicio" showTime />
                < TituloTextComponent />
                <TextField label="Título" source="titulo" />
                < AulaTextComponent />
                <TextField label="Aula" source="aula" />
                < CategoriaTextComponent />
                <TextField label="Categoría" source="categoria" />
                < PrioridadTextComponent />
                <TextField label="Prioridad" source="prioridad" />
                < EstatusTextComponent />
                <TextField label="Estatus actual" source="estatus" />
                <EstatusCambioTextComponent />
                <SelectInput label="Estatus" source="estatus"  choices={[
                    { id: 'Abierto', name: 'Abierto' },
                    { id: 'En proceso', name: 'En proceso' },
                    { id: 'Cerrado', name: 'Cerrado' },
                ]} />
            </FormTab>

            <FormTab label="Comentarios">
                <List resource=''>
                    <TextField source="comentarios" />
                </List>
                <TextInput source="comentarios" />
                <CostumCreateComment/>
            </FormTab>
            

            <FormTab label="Finalizar ticket">
                <TextField source="resolucion" />
                <TextInput source="resolucion" />
            </FormTab>
       </TabbedForm>
      </Edit>
    );
};