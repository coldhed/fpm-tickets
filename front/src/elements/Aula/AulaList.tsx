import { ReferenceArrayField, Show, Datagrid, List, ReferenceField, TextField, EmailField, usePermissions, useLogout, CreateButton, TopToolbar, ExportButton, DeleteButton, ShowButton, ArrayField, SimpleForm, CardContentInner, SimpleShowLayout } from 'react-admin';

const ListActions = () => (
    <TopToolbar>
        <CreateButton />
        <ExportButton />
    </TopToolbar>
);

export const AulaList = () => {
    return (
        <List actions={<ListActions />}>
            <Datagrid rowClick="show">
                <TextField source="nombre" label="Nombre" />
                <TextField source="ciudad" label="Ciudad" />
                <TextField source="esatdo" label="Estado" />
                {/* <TextField source="CP" label="Codigo Postal" /> */}
                <ShowButton label="Visualizar Aula" />
            </Datagrid>
        </List>
    );
};