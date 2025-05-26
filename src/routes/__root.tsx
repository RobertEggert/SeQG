import {
    createRootRoute,
    Outlet,
    useRouterState
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import MainScreen from "../MainScreen/MainScreen";

export const Route = createRootRoute({
    component: () => <RootRouteComponent />
});

const RootRouteComponent = () => {
    const { location } = useRouterState();
    const isRoot = location.pathname === "/";

    return (
        <>
            {isRoot && <MainScreen />}
            <Outlet />
            <TanStackRouterDevtools />
        </>
    );
};
