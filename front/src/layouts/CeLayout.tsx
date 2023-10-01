import {
    Admin,
    Resource,
    ListGuesser,
    EditGuesser,
    ShowGuesser,
} from "react-admin";
import { UserList } from "../elements/UserList";
import { TicketList } from "../elements/TicketList";

export const CeLayout = () => {
    return (
        <>
            <Resource name="Usuarios" list={UserList} />
            <Resource name="Tickets" list={TicketList} />
        </>
    );
};