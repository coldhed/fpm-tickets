import {
    Admin,
    Resource,
    ListGuesser,
    EditGuesser,
    ShowGuesser,
    TopToolbar,
    CreateButton,
} from "react-admin";
import { UserList } from "../elements/UserList";
import { TicketList } from "../elements/TicketList";
import { UserCreate } from "../elements/UserCreate";

export const CeLayout = () => {
    return (
        <>
            <Resource name="Usuarios" list={UserList} create={UserCreate} />
            <Resource name="Tickets" list={TicketList} />
        </>
    );
};