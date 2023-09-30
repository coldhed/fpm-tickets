import { useMediaQuery, Theme } from "@mui/material";
import { List, SimpleList, Datagrid, TextField, EmailField, ReferenceField } from "react-admin";

export const TicketList = () => (
    <List>
        <Datagrid>
            <ReferenceField source="id" reference="id" />
            <TextField source="id" disabled />
            <TextField source="title" />
        </Datagrid>
    </List>
);
