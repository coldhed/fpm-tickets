import { List, Datagrid, TextField, EditButton, DateField, ListProps, useListContext, useRecordContext } from "react-admin";
import Visibility from "@mui/icons-material/Visibility";
import { FilterLiveSearch, FilterList, FilterListItem } from 'react-admin';
import { Card, CardContent } from '@mui/material';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import '../CSS/TicketCreate.css';

export const PostFilterSidebar = () => (
    <Card sx={{ order: -1, mr: 2, mt: 9, width: 200 }}>
        <CardContent>
            <FilterLiveSearch source="titulo" label="TÍTULO" />
            <FilterList label="PRIORIDAD" icon={<PriorityHighRoundedIcon />}>
                <FilterListItem label="Alta" value={{ prioridad: "Alta" }} />
                <FilterListItem label="Media" value={{ prioridad: "Media" }} />
                <FilterListItem label="Baja" value={{ prioridad: "Baja" }} />
            </FilterList>
            <FilterList label="ESTATUS" icon={<InventoryRoundedIcon />}>
                <FilterListItem label="Abierto" value={{ estatus: "Abierto" }} />
                <FilterListItem label="En proceso" value={{ estatus: "En proceso" }} />
                <FilterListItem label="Cerrado" value={{ estatus: "Cerrado" }} />
            </FilterList>
        </CardContent>
    </Card>
);

const CustomEditButton = () => (
    <button className="middle none center mr-3 rounded-lg border custom-border-color py-3 px-6 font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:opacity-75 focus:ring focus:ring-pink-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">        <EditButton
        label="Visualizar Ticket"
        icon={<Visibility />}
    />
    </button>

);

const InicioTextComponent = () => (
    <div className="text-xs font-bold">
        <p>Inicio: </p>
    </div>
);

const PrioridadTextComponent = () => (
    <div className="text-xs font-bold">
        <p>Prioridad: </p>
    </div>
);
const EstatusTextComponent = () => (
    <div className="text-xs font-bold">
        <p> Estatus: </p>
    </div>
);

type Ticket = {
    id: string;
    prioridad: string;
};

const PriorityColor = () => {
    const record = useRecordContext<Ticket>();
    return (
        <span
            className={priorityClassColor(record.prioridad)}
        >
            {record.prioridad}
        </span>
    )
}

export const TicketList = (props: ListProps) => {
    const { data } = useListContext<Ticket>();
    console.log(data)

    return (
        <List aside={<PostFilterSidebar />}>
            <div>
                <Datagrid>
                    <TextField source="titulo" label="Título" />
                    <div className="relative inline-block px-3 py-1 font-semibold leading-tight">
                        <div className="inset-0 opacity-60">
                            <PriorityColor />
                        </div>
                    </div>
                    <TextField source="estatus" label="Estatus" />
                    <DateField source="inicio" label="Fecha de creación" />
                    <CustomEditButton />
                </Datagrid>
            </div>
        </List>
    )
};


function priorityClassColor(prioridad: string) {
    switch (prioridad) {
        case 'Alta':
            return 'bg-red-200 text-red-900 py-1 px-2 rounded-full';
        case 'Media':
            return 'bg-yellow-200 text-yellow-900 py-1 px-2 rounded-full';
        case 'Baja':
            return 'bg-green-200 text-green-900 py-1 px-2 rounded-full';
        default:
            return "";
    }
}

