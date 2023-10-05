import {
    Admin,
    Resource,
    ListGuesser,
    EditGuesser,
    ShowGuesser,
    TopToolbar,
    CreateButton,
} from "react-admin";
import { UserList } from "../elements/User/UserList";
import { TicketList } from "../elements/TicketList";
import { UserCreate } from "../elements/User/UserCreate";
import { UserShow } from "../elements/User/UserShow";


export const CeLayout = () => {
    return (
        <>
            <Resource name="Usuarios" list={UserList} create={UserCreate} show={UserShow} />
            <Resource name="Tickets" list={TicketList} />
        </>
    );
};