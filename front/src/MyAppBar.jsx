import * as React from 'react';
import { AppBar, TitlePortal, ToggleThemeButton } from 'react-admin';
import Box from '@mui/material/Box';

export const MyAppBar = () => (
    <AppBar color="primary" >
        <TitlePortal />
        <Box flex="1" />
        <img
            className="h-14 p-2 ml-[-130px]"
            src="src/resources/logo-white.png"
            alt="logo"
        />
        <Box flex="1" />
    </AppBar>
);