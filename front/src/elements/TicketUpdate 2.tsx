import {SimpleForm, Toolbar, SelectInput, SaveButton, Edit, TextField, TabbedForm, FormTab, required, TextInput, DateField } from 'react-admin';
import {useRecordContext} from "react-admin";
import {useOnSuccess,} from '../hooks/costumhandlers';

const TicketTitle = () => {
    const record = useRecordContext();
    return <span>{record ? `"${record.titulo}"` : ''}</span>;
};


export const TicketEdit = () => {
    const onSuccess = useOnSuccess(`Cambios guardados`, '/tickets');

    return (
        <Edit title={<TicketTitle/>} mutationOptions={{onSuccess}}>
           <TabbedForm>
            <FormTab label = "Ticket">
                <TextField source="inicio" showTime />
                <TextField source="titulo" label="Título"/>
                <TextField source="aula" label="Aula"/>
                <TextField source="categoria" label="Categoría"/>
                <TextField source="prioridad" label="Prioridad"/>
                <TextField source="comentarios" label="Comentarios:"/>
                <SelectInput source="estatus" choices={[
                    { id: 'ab', name: 'Abierto' },
                    { id: 'ep', name: 'En proceso' },
                    { id: 'fi', name: 'Finalizado' },
                ]} validate={[required('Campo Obligatorio')]} />
            </FormTab>
            <FormTab label="Añadir comentario">
                <TextInput source="comentarios" validate={[required('Campo Obligatorio')]} />
            </FormTab>
            <FormTab label="Finalizar ticket">
                <TextInput source="resolucion" validate={[required('Campo Obligatorio')]} />
            </FormTab>
       </TabbedForm>
      </Edit>
    );
};