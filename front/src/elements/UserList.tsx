import { Datagrid, List, ReferenceField, TextField, EmailField } from 'react-admin';

export const UserList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="nombre_completo" label="Nombre Completo" />
            <EmailField source="correo" label="Correo" />
            <TextField source="rol" label="Rol" />
            <EmailField source="coor_nac" label="Coordinador Nacional" />
        </Datagrid>
    </List>
);