import {
    Admin,
    Resource,
    ListGuesser,
    EditGuesser,
    ShowGuesser,
} from "react-admin";
import { dataProvider } from "./dataProvider";
import authProvider from "./authProvider";
import { TicketList } from "./ticket";

export const App = () => {
    return (
        <Admin dataProvider={dataProvider} authProvider={authProvider}>
            <Resource name="posts" list={ListGuesser} />
            <Resource
                name="ticket"
                list={TicketList}
            />
        </Admin>
    );
};

