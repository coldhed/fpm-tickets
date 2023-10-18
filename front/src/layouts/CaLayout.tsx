import {
    Admin,
    Resource,
    ListGuesser,
    EditGuesser,
    ShowGuesser,
} from "react-admin";

import { TicketList } from "../elements/Ticket/TicketsList";
import { TicketCreate } from "../elements/Ticket/TicketCreate";
import { TicketEdit } from "../elements/Ticket/TicketUpdate";

export const CaLayout = () => {
    return (
        <>
            <Resource
                name="Tickets"
                list={TicketList}
                create={TicketCreate}
                edit={TicketEdit}
            />
        </>
    );
};