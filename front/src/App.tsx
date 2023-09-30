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
import { TicketList } from "./elements/TicketList";

import { CeLayout } from "./layouts/CeLayout";


export const App = () => (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
        {permissions => {

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




// export const App = () => {
//     return (
//         <Admin dataProvider={dataProvider} authProvider={authProvider}>
//             <Resource name="posts" list={ListGuesser} />
//             <Resource
//                 name="ticket"
//                 list={TicketList}
//             />
//         </Admin>
//     );
// };


