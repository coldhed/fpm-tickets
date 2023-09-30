import {
    Admin,
    Resource,
    ListGuesser,
    EditGuesser,
    ShowGuesser,
} from "react-admin";
import { TicketList } from "../elements/TicketList";

export const CaLayout = () => {
    return (
        <Resource name="Tickets" list={TicketList} />
    );
};