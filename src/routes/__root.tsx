import {
    createRootRoute,
    Outlet,
    useRouterState
} from "@tanstack/react-router";
import MainScreen from "../MainScreen/MainScreen";
import { Box } from "@mui/material";

export const Route = createRootRoute({
    component: () => <RootRouteComponent />
});

const RootRouteComponent = () => {
    const { location } = useRouterState();
    const isRoot = location.pathname === "/";

    return (
        <Box>
            {isRoot && <MainScreen />}
            <Outlet />
        </Box>
    );
};
