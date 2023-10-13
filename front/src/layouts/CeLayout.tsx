import {
    Admin,
    Resource,
    ListGuesser,
    EditGuesser,
    ShowGuesser,
    TopToolbar,
    CreateButton,
    CustomRoutes
} from "react-admin";
import { Route } from "react-router-dom";
import { UserList } from "../elements/User/UserList";
import { UserCreate } from "../elements/User/UserCreate";
import { UserShow } from "../elements/User/UserShow";
import { TicketList } from "../elements/TicketsList";
import { TicketCreate } from "../elements/TicketCreate";
import { TicketEdit } from "../elements/TicketUpdate";
import { AulaCreate } from "../elements/Aula/AulaCreate";
import { AulaList } from "../elements/Aula/AulaList";
import { AulaShow } from "../elements/Aula/AulaShow";
import Dashboard from "../Dashboard";

export const CeLayout = () => {
    return (
        <>
            <Resource
                name="Tickets"
                list={TicketList}
                create={TicketCreate}
                edit={TicketEdit}
            />
            <Resource name="Usuarios" list={UserList} create={UserCreate} show={UserShow} />

            <Resource name="Aula" list={AulaList}/>

            {/* <Resource name="Aulas" list={AulaList} create={AulaCreate} show={AulaShow} /> */}

            <CustomRoutes>
                <Route path="/dashboard" element={<Dashboard />} />
            </CustomRoutes>


        </>
    );
};