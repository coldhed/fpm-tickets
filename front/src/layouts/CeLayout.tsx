import {
    Admin,
    Resource,
    ListGuesser,
    EditGuesser,
    ShowGuesser,
} from "react-admin";
import { UserList } from "../elements/UserList";

export const CeLayout = () => {
    return (
        <Resource name="Usuarios" list={UserList} />
    );
};