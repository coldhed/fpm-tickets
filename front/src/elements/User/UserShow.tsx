import { DeleteButton, DeleteWithConfirmButton, ListButton, Show, SimpleShowLayout, TextField, TopToolbar, useRecordContext } from 'react-admin';
import { Stack } from '@mui/material';
import ArrowBack from "@mui/icons-material/ArrowBack";


const PostTitle = () => {
    const record = useRecordContext();

    // the record can be empty while loading
    if (!record) return null;

    return <span>{record.nombre_completo}</span>;
};

const ConfirmTitle = () => {
    const record = useRecordContext();

    // the record can be empty while loading
    if (!record) return null;

    return <span>Borrar {record.correo}?</span>;
};

const headerStyle = "text-xl font-bold pb-1 pt-4 text-[#04953f]"

const NombreTitle = () => {
    const record = useRecordContext();
    return <span className="px-2 text-xl font-bold text-navy-700 dark:text-white flex items-center justify-center">{record ? `${record.nombre_completo}` : ''}</span>;

};

export const UserShow = () => (
    <Show title={<PostTitle />} >

        <div className="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-neutral-200 bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">

            <div className="mt-2 mb-8 w-full">
                < NombreTitle />
            </div>

            <div className="grid grid-cols-2 gap-4 px-2 w-full">

                <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                    <p className={headerStyle} >Correo</p>
                    <TextField source="correo" label="" />
                </div>
                <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                    <p className={headerStyle} >Rol</p>
                    <TextField source="rol" label="" />
                </div>

            </div>

            <Stack direction="row" spacing={10} className="pt-9">
                <ListButton label="Regresar" icon={<ArrowBack />} color="inherit" />
                <DeleteWithConfirmButton label="Borrar" confirmTitle={<ConfirmTitle />} />
            </Stack>
        </div>
    </Show>
);