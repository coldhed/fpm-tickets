import {
    Admin,
    Resource,
    ListGuesser,
    EditGuesser,
    ShowGuesser,
    usePermissions,
    CustomRoutes,
    useLogout,
} from "react-admin";
import { Route } from 'react-router-dom';
import { dataProvider } from "./dataProvider";
import authProvider from "./authProvider";
import { CeLayout } from "./layouts/CeLayout";


export const App = () => (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
        {permissions => {
            console.log("inside admin: ", permissions);
            if (!permissions) {
                console.log("no permissions")
                useLogout()();
                return null;
            };

            console.log("returning as if permissions")
            return (
                <>
                    <CustomRoutes>
                        <Route path="/test" element={<h1>Test</h1>} />
                    </CustomRoutes>
                    {permissions === "ce" ? CeLayout() :
                        <CustomRoutes>
                            <Route path="/" element={<h1>More layouts needed!</h1>} />
                        </CustomRoutes>
                    }
                </>
            )
        }}
    </Admin>
);



