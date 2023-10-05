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

export const CeLayout = () => {
    return (
        <>
            <Resource name="Usuarios" list={UserList} create={UserCreate} edit={EditGuesser} />
            <Resource name="Tickets" list={TicketList} />
        </>
    );
};