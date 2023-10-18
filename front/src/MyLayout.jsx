import React from 'react'; // Agrega esta línea para importar React
import { Layout } from 'react-admin';
import { MyMenu } from './MyMenu';

export const MyLayout = props => <Layout {...props} menu={MyMenu} />;
