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

export const UserShow = () => (
    <Show title={<PostTitle />} className="mt-4 mr-[8rem]">
        <SimpleShowLayout >
            <div className="flex flex-col justify-center px-8 py-4">
                <p>Nombre Completo</p>
                <TextField source="nombre_completo" label="" />
                <p>Correo</p>
                <TextField source="correo" label="" />
                <p>Rol</p>
                <TextField source="rol" label="" />

                <Stack direction="row" spacing={10}>
                    <ListButton label="Regresar" icon={<ArrowBack />} color="inherit" />
                    <DeleteWithConfirmButton label="Borrar" confirmTitle={<ConfirmTitle />} />
                </Stack>
            </div>
        </SimpleShowLayout>
    </Show>
);

{/* <FormTab label="Ticket">

    <div className="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-neutral-200 bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">

        <div className="mt-2 mb-8 w-full">
            < TicketTitle />
        </div>

        <div className="grid grid-cols-2 gap-4 px-2 w-full">
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <InicioTextComponent />
                <DateField label="Inicio" source="inicio" showTime />
            </div>

            <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                < PrioridadTextComponent />
                <TextField label="Prioridad" source="prioridad" />
            </div>

            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                < CategoriaTextComponent />
                <TextField label="Categoría" source="categoria" />
            </div>

            <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                < SubategoriaTextComponent />
                <TextField label="Tipo de incidencia" source="subcategoria" />
            </div>

            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                < EstatusTextComponent />
                <TextField label="Estatus actual" source="estatus" />
            </div>

            <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <EstatusCambioTextComponent />
                <SelectInput label="Estatus" source="estatus" choices={[
                    { id: 'Abierto', name: 'Abierto' },
                    { id: 'En proceso', name: 'En proceso' },
                    { id: 'Cerrado', name: 'Cerrado' },
                ]} />
            </div>
        </div>
    </div>

</FormTab> */}