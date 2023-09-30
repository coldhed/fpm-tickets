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
import authProvider from "./authProvider";
import { TicketList } from "./elements/TicketList";

import { CeLayout } from "./layouts/CeLayout";
import { CaLayout } from "./layouts/CaLayout";


export const App = () => (

    <Admin dataProvider={dataProvider} authProvider={authProvider} >
        {permissions => {
            if (!permissions) {
                console.log("No permissions")
                return null;
            }

            if (permissions === "ce") return CeLayout();

            return CaLayout();
        }}
    </Admin>
);