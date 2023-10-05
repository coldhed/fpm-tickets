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
import { UserCreate } from "../elements/User/UserCreate";
import { UserShow } from "../elements/User/UserShow";
import { TicketList } from "../elements/TicketsList";
import { TicketCreate } from "../elements/TicketCreate";
import { TicketEdit } from "../elements/TicketUpdate";

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
        </>
    );
};