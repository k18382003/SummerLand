import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default observer(function RequireAuth(){
    const { accountstore } = useStore();
    const location = useLocation();

    if (!accountstore.isLoggedIn)
        return <Navigate to='/' state={{from : location}}/>

    return <Outlet />
})