import { ReferenceArrayField, Datagrid, List, ReferenceField, EmailField, usePermissions, useLogout, CreateButton, ExportButton, ShowButton, ArrayField, CardContentInner, SimpleForm, DeleteButton, DeleteWithConfirmButton, ListButton, Show, SimpleShowLayout, TextField, TopToolbar, useRecordContext, TabbedForm } from 'react-admin';
import {ArrayInputProps, SimpleFormIterator, ArrayInput, Create, Toolbar, SelectInput, SaveButton, Edit, FormTab, required, TextInput, DateField } from 'react-admin';
import { Stack } from '@mui/material';
import ArrowBack from "@mui/icons-material/ArrowBack";

// const AulaTitle = () => {
//     const record = useRecordContext();
//     return <span>{record ? `${record.titulo}` : ''} </span>
// }

export const AulaEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <TextField label="Nombre" source="nombre" /> 
                <TextField label="Coordinador" source="coor_aula" /> 
                <TextField label="Ciudad" source="ciudad" />
                <TextField label="Estado" source="esatdo" />
                <TextField label="Codigo Postal" source="CP" />
                <TextField label="Calle" source="calle" />
                <TextField label="ID" source="_id" />
                {/* <div>
                <TextField label="Nombre" source="nombre" /> 
                </div> */}
            </SimpleForm>
        </Edit>
    );
};

// "_id": "6528672852adaf594cea4f33",
//     "nombre": "Aula 1 - Colegio Occidente",
//     "coor_aula": "651221e905e2d70aed0d4f95",
//     "ciudad": "Ciudad Obregón",
//     "esatdo": "Sonora",
//     "CP": "189",
//     "calle": "Calle 300",
//     "id": "6528672852adaf594cea4f33"