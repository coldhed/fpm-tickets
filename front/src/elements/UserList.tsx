import { Datagrid, List, ReferenceField, TextField, EmailField, usePermissions, useLogout, CreateButton, TopToolbar, ExportButton } from 'react-admin';

const ListActions = () => (
    <TopToolbar>
        <CreateButton />
        <ExportButton />
    </TopToolbar>
);

export const UserList = () => {
    return (
        <List actions={<ListActions />}>
            <Datagrid rowClick="edit">
                <TextField source="nombre_completo" label="Nombre Completo" />
                <EmailField source="correo" label="Correo" />
                <TextField source="rol" label="Rol" />
                <EmailField source="coor_nac" label="Coordinador Nacional" />
            </Datagrid>
        </List>
    );
};