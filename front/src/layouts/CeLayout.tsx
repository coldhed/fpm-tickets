import {
    Admin,
    Resource,
    ListGuesser,
    EditGuesser,
    ShowGuesser,
} from "react-admin";
import { UserList } from "../elements/UserList";

import { TicketList } from "../elements/Tickets";
import { TicketCreate } from "../elements/TicketCreate";
import { TicketEdit } from "../elements/TicketUpdate";

export const CeLayout = () => {
    return (
        <>
            <Resource name="Usuarios" list={UserList} />
            <Resource
                name="Tickets"
                list={TicketList}
                create={TicketCreate}
                edit={TicketEdit}
            />
        </>
    );
};