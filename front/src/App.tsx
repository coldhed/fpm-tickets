import {
    Admin,
    Resource,
    ListGuesser,
    EditGuesser,
    ShowGuesser,
} from "react-admin";
import { dataProvider } from "./dataProvider";
import authProvider from "./authProvider";

export const App = () => {
    return (
        <Admin dataProvider={dataProvider} authProvider={authProvider}>
            <Resource name="posts" list={ListGuesser} />
        </Admin>
    );
};

