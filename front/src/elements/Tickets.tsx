import { useMediaQuery, Theme } from "@mui/material";
import { DateField, SelectInput, TextInput, ReferenceInput, List, SimpleList, SimpleForm, Datagrid, TextField, EmailField, ReferenceField, EditButton, Create } from "react-admin";

export const TicketList = () => (
    <List>
        <Datagrid>
            <TextField source="titulo" />
            <EditButton />
        </Datagrid>
    </List>
);

