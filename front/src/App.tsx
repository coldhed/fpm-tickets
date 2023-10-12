import {
    Admin,
    Resource,
    ListGuesser,
    EditGuesser,
    ShowGuesser,
    usePermissions,
    CustomRoutes,
    useLogout,
} from "react-admin";
import { Route } from 'react-router-dom';

import { dataProvider } from "./dataProvider";
import authProvider from "./authProvider"
import { i18nProvider } from "./i18nProvider/i18nProvider";
import MyLoginPage from "./MyLoginPage";

import myTheme from "./myTheme";


import { CeLayout } from "./layouts/CeLayout";
import { CaLayout } from "./layouts/CaLayout";



export const App = () => (

    <Admin
        dataProvider={dataProvider}
        authProvider={authProvider}
        theme={myTheme}
        i18nProvider={i18nProvider}
        loginPage={<MyLoginPage theme={myTheme} />}
    >
        {permissions => {
            // if there are no permissions, you return the CaLayout 
            // and since you are not logged-in it will take you to the login page
            if (permissions === "no role") return CaLayout();

            if (permissions === "ce") return CeLayout();

            return CaLayout();
        }}
    </Admin>
);

