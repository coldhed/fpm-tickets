import React from 'react'; // Agrega esta línea para importar React
import { Menu } from 'react-admin';
import LabelIcon from '@mui/icons-material/Label';
import AppsIcon from '@mui/icons-material/Apps';
import DraftsIcon from '@mui/icons-material/Drafts';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import DashboardIcon from '@mui/icons-material/Dashboard';


export const MyMenu = () => (
    <Menu>

        <Menu.Item to="/dashboard" primaryText="Tablero" leftIcon={<AppsIcon />}/>
        <Menu.Item to="/Tickets" primaryText="Tickets" leftIcon={<DraftsIcon />}/>
        <Menu.Item to="/Usuarios" primaryText="Usuarios" leftIcon={<EmojiPeopleIcon />}/>
        <Menu.Item to="/Aula" primaryText="Aula" leftIcon={<LabelIcon />}/>

    </Menu>
);