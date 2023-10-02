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

import { TicketList } from "./elements/Tickets";
import { TicketCreate } from "./elements/TicketCreate";
import myTheme from "./myTheme";


import { CeLayout } from "./layouts/CeLayout";
import { CaLayout } from "./layouts/CaLayout";
import { TicketEdit } from "./elements/TicketUpdate";


export const App = () => (


    <Admin dataProvider={dataProvider} authProvider={authProvider} >
        <Resource
          name="Tickets"
          list={TicketList}
          create={TicketCreate}
          edit={TicketEdit}
        />
        {/* {permissions => {
=======
    <Admin dataProvider={dataProvider} authProvider={authProvider} theme={myTheme} >
        {permissions => {

            if (permissions === "no role") {
                console.log("No permissions")
                return (
                    // PREGUNTAR DE ESTO A JORGE
                    CaLayout()
                );
            }

            if (permissions === "ce") return CeLayout();

            return CaLayout();
        }} */}
    </Admin>
);

