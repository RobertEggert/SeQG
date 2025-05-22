import {
    createRootRoute,
    Outlet,
    useRouterState
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useState } from "react";
import MainScreen, { type MODES } from "../MainScreen";

export const Route = createRootRoute({
    component: () => <RootRouteComponent />
});

const RootRouteComponent = () => {
    const [mode, setMode] = useState<MODES>(null);
    const { location } = useRouterState();
    const isRoot = location.pathname === "/";

    return (
        <>
            {isRoot && <MainScreen mode={mode} setMode={setMode} />}
            <Outlet />
            <TanStackRouterDevtools />
        </>
    );
};

// TanStackRouterDevtools is only for development
