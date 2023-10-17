import { useMediaQuery, Theme } from "@mui/material";
import {TextInput, SearchInput, Toolbar, List, Datagrid, TextField,EditButton, DateField } from "react-admin";
import LibaryBooks from "@mui/icons-material/LibraryBooks";
import { Chip } from '@mui/material'
import Visibility from "@mui/icons-material/Visibility";


import { SavedQueriesList, FilterLiveSearch, FilterList, FilterListItem } from 'react-admin';
import { Card, CardContent } from '@mui/material';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';

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
    <EditButton
        label="Visualizar Ticket" 
        icon={<Visibility/>}
    />
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


const FiltrosList = [
    <SearchInput source="titulo" alwaysOn />,
];

const CustomListToolbar = () => (
    <Toolbar>
        <CustomEditButton />
    </Toolbar>
);



export const TicketList = () => (
    <List aside={<PostFilterSidebar />} >
        <Datagrid className="mx-[20rem] " >
            <div className="flex flex-col gap-2">
                <div className="m-auto h-52 w-full max-w-md bg-white shadow p-2 border-t-4 border-green-600 rounded">
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
                            <TextField source="prioridad" label="Prioridad"/>
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
    </List>
);



