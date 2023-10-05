import { Datagrid, List, ReferenceField, TextField, EmailField, usePermissions, useLogout, CreateButton, TopToolbar, ExportButton, DeleteButton, ShowButton } from 'react-admin';

const ListActions = () => (
    <TopToolbar>
        <CreateButton />
        <ExportButton />
    </TopToolbar>
);

export const UserList = () => {
    return (
        <List actions={<ListActions />}>
            <Datagrid rowClick="show">
                <TextField source="nombre_completo" label="Nombre Completo" />
                <EmailField source="correo" label="Correo" />
                <TextField source="rol" label="Rol" />
                <EmailField source="coor_nac" label="Coordinador Nacional" />
                <ShowButton label="Ver usuario" />
            </Datagrid>
        </List>
    );
};