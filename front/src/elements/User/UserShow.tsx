import { DeleteButton, DeleteWithConfirmButton, ListButton, Show, SimpleShowLayout, TextField, TopToolbar, useRecordContext } from 'react-admin';
import { Stack } from '@mui/material';
import ArrowBack from "@mui/icons-material/ArrowBack";


const PostTitle = () => {
    const record = useRecordContext();

    // the record can be empty while loading
    if (!record) return null;

    return <span>{record.nombre_completo}</span>;
};

export const UserShow = () => (
    <Show title={<PostTitle />}>
        <SimpleShowLayout >
            <TextField source="nombre_completo" />
            <TextField source="correo" />
            <TextField source="rol" />

            <Stack direction="row" spacing={10}>
                <ListButton label="Regresar" icon={<ArrowBack />} color="inherit" />
                <DeleteWithConfirmButton label="Borrar" />
            </Stack>
        </SimpleShowLayout>
    </Show>
);