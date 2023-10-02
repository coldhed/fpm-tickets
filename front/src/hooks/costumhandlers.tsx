import {useNotify,useRefresh,useRedirect,} from "react-admin";

export const useOnSuccess = (message : string, route : string) => {
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    return () => {
        notify(message);
        redirect(route);
        refresh();
    };
   
};