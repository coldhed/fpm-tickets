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



const FiltrosList = [
    <SearchInput source="titulo" alwaysOn />,
];

const CustomListToolbar = () => (
    <Toolbar>
        <CustomEditButton />
    </Toolbar>
);

export const TicketList = () => (
    <List aside={<PostFilterSidebar />}>
        <Datagrid >
            <TextField source="titulo" label="Título"/>
            <TextField source="prioridad" label="Prioridad"/>
            <TextField source="estatus" label="Estatus"/>
            <DateField source="inicio" label="Fecha de creación"/>
            <CustomEditButton />
        </Datagrid>
    </List>
);



