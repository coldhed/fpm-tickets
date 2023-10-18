import { List, Datagrid, TextField, EditButton, DateField, ListProps, useListContext, useRecordContext } from "react-admin";
import React, { useState } from 'react';
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

const PriorityColor2 = () => {
    const record = useRecordContext<Ticket>();
    return (
        <span
            className={priorityClassColor2(record.prioridad)}
        >
            {record.prioridad}
        </span>
    )
}

export const TicketList = (props: ListProps) => {
    // const [view, setView] = useState(false);
    const [showFirstDatagrid, setShowFirstDatagrid] = useState(true);

    const handleCheckboxChange = () => {
        setShowFirstDatagrid(!showFirstDatagrid);
    };

    const { data } = useListContext<Ticket>();

    return (
        <List aside={<PostFilterSidebar />}>
            {/* Button toggle between view == true && view == false (con un handler fn) */}
            {/* OPerador ternario */}
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={showFirstDatagrid}
                        onChange={handleCheckboxChange}
                    />{' '}
                    Visualizar en Tarjetas
                </label>
            </div>

            {showFirstDatagrid ? (
                <Datagrid bulkActionButtons={false} >
                    <div className="flex flex-col gap-2">
                        <div className="m-auto h-73 w-full max-w-md bg-white shadow p-2 border-t-4 border-green-600 rounded">
                            <header className="p-2 border-b flex items-center justify-center"> 
                                <div className="flex flex-col font-bold">
                                    <TextField class="text-lg " source="titulo" label="Título"/>
                                </div>
                            </header>
                            <div className="flex flex-wrap p-2 w-full gap-4 text-xl">
                                <div className="flex flex-col w-full ">
                                    <InicioTextComponent />
                                    <DateField className="text-xl" source="inicio" label="Fecha de creación"/>
                                </div>

                                <div className="flex flex-col">
                                    <PrioridadTextComponent />
                                    <PriorityColor2 />
                                </div>

                                <div className="flex flex-col">
                                    <EstatusTextComponent />
                                    <TextField source="estatus" label="Estatus"/>
                                </div>

                            </div>
                            <div className="flex flex-col">
                                    <CustomEditButton />
                            </div>

                        </div>
                    </div>
                </Datagrid>
            ) : (
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
                
            )}

            <div>
                
            </div>

            <div>
                
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

function priorityClassColor2(prioridad: string) {
    switch (prioridad) {
        case 'Alta':
            return 'bg-red-200 text-red-900 py-0.001 px-2 rounded-full flex items-center justify-center text-sm';
        case 'Media':
            return 'bg-yellow-200 text-yellow-900 py-0.001 px-2 rounded-full flex items-center justify-center text-sm';
        case 'Baja':
            return 'bg-green-200 text-green-900 py-0.001 px-2 rounded-full flex items-center justify-center text-sm';
        default:
            return "";
    }
}