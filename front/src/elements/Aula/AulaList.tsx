import { Datagrid, List, ReferenceField, TextField, EmailField, usePermissions, useLogout, CreateButton, TopToolbar, ExportButton, DeleteButton, ShowButton } from 'react-admin';

const ListActions = () => (
    <TopToolbar>
        <CreateButton />
        <ExportButton />
    </TopToolbar>
);

// "nombre": nombre,
//             "coor_aula": coor_aula,
//             "direccion": direccion,
//             "ciudad": ciudad,
//             "esatdo": estado,
//             "CP": codigo_postal,
//             "calle": calle,

export const AulaList = () => {
    return (
        <List actions={<ListActions />}>
            <Datagrid rowClick="show">
                <TextField source="nombre" label="Nombre" />
                <TextField source="ciudad" label="Ciudad" />
                {/* <TextField source="coor_aula" label="Coordinador" />
                <TextField source="direccion" label="Direccion" />
                <TextField source="ciudad" label="Ciudad" />
                <TextField source="esatdo" label="Estado" />
                <TextField source="CP" label="Codigo Postal" />
                <TextField source="calle" label="Calle" />
                <ShowButton label="Ver Aula" /> */}
            </Datagrid>
        </List>
    );
};