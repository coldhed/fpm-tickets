import { ReferenceArrayField, Show, List, ReferenceField, TextField, EmailField, usePermissions, useLogout, CreateButton, TopToolbar, ExportButton, DeleteButton, ShowButton, ArrayField, SimpleForm, CardContentInner, SimpleShowLayout } from 'react-admin';
import { SearchInput, EditButton } from "react-admin";
import Visibility from "@mui/icons-material/Visibility";
import { SavedQueriesList, FilterLiveSearch, FilterList, FilterListItem } from 'react-admin';
import { ArrayInputProps, SimpleFormIterator, ArrayInput, Datagrid, Toolbar, SelectInput, SaveButton, Edit, TabbedForm, FormTab, required, TextInput, DateField } from 'react-admin';

const ListActions = () => (
    <TopToolbar>
        <CreateButton />
        <ExportButton />
    </TopToolbar>
);

const CustomEditButton = () => (
    <EditButton
        label="Visualizar Aula"
        icon={<Visibility />}
    />
);

const CustomListToolbar = () => (
    <Toolbar>
        <CustomEditButton />
    </Toolbar>
);

export const AulaList = () => {
    return (
        <List actions={<ListActions />}>
            <Datagrid>
                <TextField source="nombre" label="Nombre" />
                <TextField source="ciudad" label="Ciudad" />
                <TextField source="estado" label="Estado" />
                <CustomEditButton />
            </Datagrid>
        </List>
    );
};

<div>
    <ReferenceArrayField label="Aula" reference="aulas" source="aula">
        <Datagrid>
            <TextField source="nombre" />
            <TextField source="ciudad" />
            <TextField source="estado" />
            <EditButton />
        </Datagrid>
    </ReferenceArrayField>
</div>

// source/components .map
{/* <TextField source="CP" label="Codigo Postal" /> */ }
