import { ReferenceArrayField, Datagrid, List, ReferenceField, EmailField, usePermissions, useLogout, CreateButton, ExportButton, ShowButton, ArrayField, CardContentInner, SimpleForm, DeleteButton, DeleteWithConfirmButton, ListButton, Show, SimpleShowLayout, TextField, TopToolbar, useRecordContext, TabbedForm } from 'react-admin';
import { ArrayInputProps, SimpleFormIterator, ArrayInput, Create, Toolbar, SelectInput, SaveButton, Edit, FormTab, required, TextInput, DateField } from 'react-admin';
import { Stack } from '@mui/material';
import ArrowBack from "@mui/icons-material/ArrowBack";

// const AulaTitle = () => {
//     const record = useRecordContext();
//     return <span>{record ? `${record.titulo}` : ''} </span>
// }
const NombreTextComponent = () => (
    <div className="customTextComp">
      <p>Nombre: </p>
    </div>
);

const CoordinadorTextComponent = () => (
    <div className="customTextComp">
      <p>Coordinador: </p>
    </div>
);

const CiudadTextComponent = () => (
    <div className="customTextComp">
      <p>Ciudad: </p>
    </div>
);

const EstadoTextComponent = () => (
    <div className="customTextComp">
      <p>Estado: </p>
    </div>
);

const CPTextComponent = () => (
    <div className="customTextComp">
      <p>Codigo Postal: </p>
    </div>
);

const CalleTextComponent = () => (
    <div className="customTextComp">
      <p>Calle: </p>
    </div>
);

export const AulaEdit = () => {
    return (
      <Edit>
        <div className="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-neutral-200 bg-clip-border shadow-3xl shadow-2xl">
          <NombreTextComponent />
          <TextField label="Nombre" source="nombre" />
          <CoordinadorTextComponent />
          <TextField label="Coordinador" source="coor_aula" />
          <CiudadTextComponent />
          <TextField label="Ciudad" source="ciudad" />
          <EstadoTextComponent />
          <TextField label="Estado" source="estado" />
          <CPTextComponent />
          <TextField label="Codigo Postal" source="CP" />
          <CalleTextComponent />
          <TextField label="Calle" source="calle" />
        </div>
      </Edit>
    );
  };
