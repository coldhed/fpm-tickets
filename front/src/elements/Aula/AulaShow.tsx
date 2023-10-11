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

    return <span>Borrar {record.coor_aula}?</span>;
};

export const AulaShow = () => (
    <Show title={<PostTitle />}>
        <SimpleShowLayout >
                <TextField source="nombre" label="Nombre" />
                <TextField source="coor_aula" label="Coordinador" />
                <TextField source="direccion" label="Direccion" />
                <TextField source="ciudad" label="Ciudad" />
                <TextField source="estado" label="Estado" />
                <TextField source="codigo_postal" label="Codigo Postal" />
                <TextField source="calle" label="Calle" />

            <Stack direction="row" spacing={10}>
                <ListButton label="Regresar" icon={<ArrowBack />} color="inherit" />
                <DeleteWithConfirmButton label="Borrar" confirmTitle={<ConfirmTitle />} />
            </Stack>
        </SimpleShowLayout>
    </Show>
);