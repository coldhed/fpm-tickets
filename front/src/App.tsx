import {
    Admin,
    Resource,
    ListGuesser,
    EditGuesser,
    ShowGuesser,
    usePermissions,
    CustomRoutes,
} from "react-admin";
import { Route } from 'react-router-dom';
import { dataProvider } from "./dataProvider";
import authProvider from "./authProvider";
import { CeLayout } from "./layouts/CeLayout";


export const App = () => {
    return (
        <Admin dataProvider={dataProvider} authProvider={authProvider}>
            {permissions => (
                <>
                    {permissions === "ce" ? CeLayout() :
                        <CustomRoutes>
                            <Route path="/" element={<h1>More layouts needed!</h1>} />
                        </CustomRoutes>
                    }
                </>
            )}
        </Admin>
    );
};



