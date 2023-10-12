import { DeleteButton, DeleteWithConfirmButton, ListButton, Show, SimpleShowLayout, TextField, TopToolbar, useRecordContext } from 'react-admin';
import { Stack } from '@mui/material';
import ArrowBack from "@mui/icons-material/ArrowBack";

const PostTitle = () => {
    const record = useRecordContext();
    if (!record) return null;
    return <span>{record.nombre}</span>;
};

const ConfirmTitle = () => {
    const record = useRecordContext();
    if (!record) return null;
    return <span>Borrar {record.ciudad}?</span>;
};

export const AulaShow = () => (
    <Show title={<PostTitle />}>
        <SimpleShowLayout>
                <TextField source="nombre" label="Nombre" />
                <TextField source="ciudad" label="Ciudad" />
                <TextField source="esatdo" label="Estado" />
                <TextField source="CP" label="Codigo Postal" />
                <TextField source="calle" label="Calle" />

            <Stack direction="row" spacing={10}>
                <ListButton label="Regresar" icon={<ArrowBack />} color="inherit" />
                <DeleteWithConfirmButton label="Borrar" confirmTitle={<ConfirmTitle />} />
            </Stack>
        </SimpleShowLayout>
    </Show>
);

// "_id": "6528672852adaf594cea4f33",
//     "nombre": "Aula 1 - Colegio Occidente",
//     "coor_aula": "651221e905e2d70aed0d4f95",
//     "ciudad": "Ciudad Obregón",
//     "esatdo": "Sonora",
//     "CP": "189",
//     "calle": "Calle 300",
//     "id": "6528672852adaf594cea4f33"