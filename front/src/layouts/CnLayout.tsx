import {
    Resource,
} from "react-admin";
import { TicketList } from "../elements/Ticket/TicketsList";
import { TicketCreate } from "../elements/Ticket/TicketCreate";
import { TicketEdit } from "../elements/Ticket/TicketUpdate";

import { AulaCreate } from "../elements/Aula/AulaCreate";
import { AulaList } from "../elements/Aula/AulaList";
import { AulaEdit } from "../elements/Aula/AulaUpdate";



export const CnLayout = () => {
    return (
        <>
            <Resource
                name="Tickets"
                list={TicketList}
                create={TicketCreate}
                edit={TicketEdit}
            />
            <Resource
                name="Aula"
                list={AulaList}
                create={AulaCreate}
                edit={AulaEdit}
            />
        </>
    );
};