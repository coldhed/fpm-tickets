import { Datagrid, List, ReferenceField, TextField, EmailField, usePermissions, useLogout } from 'react-admin';

export const UserList = () => {
    const { permissions } = usePermissions();


    return (
        <List>
            {/* {permissions === "admin" ? */}
            <Datagrid rowClick="edit">
                <TextField source="nombre_completo" label="Nombre Completo" />
                <EmailField source="correo" label="Correo" />
                <TextField source="rol" label="Rol" />
                <EmailField source="coor_nac" label="Coordinador Nacional" />
            </Datagrid>
            {/* : null} */}
        </List>
    );
};