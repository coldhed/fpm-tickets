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
            {permissions => {
                if (!permissions) return null;

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

    // return (
    //     <Admin dataProvider={dataProvider} authProvider={authProvider}>
    //         <CustomRoutes>
    //             <Route path="/" element={<h1>More layouts needed!</h1>} />
    //         </CustomRoutes>
    //     </Admin>
    // )
};



