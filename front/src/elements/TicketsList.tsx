import { useMediaQuery, Theme } from "@mui/material";
import {Toolbar, List, Datagrid, TextField,EditButton, DateField } from "react-admin";
import LibaryBooks from "@mui/icons-material/LibraryBooks";
import Visibility from "@mui/icons-material/Visibility";

const CustomEditButton = () => (
    <EditButton
        label="Visualizar Ticket" 
        icon={<Visibility />}
    />
);

const CustomListToolbar = () => (
    <Toolbar>
        <CustomEditButton />
    </Toolbar>
);

export const TicketList = () => (
    <List>
        <Datagrid >
            <TextField source="titulo" label="Título"/>
            <TextField source="prioridad" label="Prioridad"/>
            <TextField source="estatus" label="Estatus"/>
            <DateField source="inicio" label="Fecha de creación"/>
            <CustomEditButton />
        </Datagrid>
    </List>
);

