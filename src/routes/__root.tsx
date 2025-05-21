import { Box, Button, Typography } from "@mui/material";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret, faLock } from "@fortawesome/free-solid-svg-icons";

export const Route = createRootRoute({
    component: () => <RootRouteComponent />
});

type MODES = "ANONYMOUS" | "PRIVATE" | null;

type COLORMODES = "#ADD8E6" | "#8C92AC" | "#191970";

const doWidthCalc = (mode: MODES, current: MODES) => {
    if (!mode) {
        return "100vh";
    }
    if (current === mode) {
        return "130vh";
    }
    if (current !== mode) {
        return "70vh";
    }
    return "100vh";
};

const RootRouteComponent = () => {
    const [hoverMode, setHoverMode] = useState<MODES>(null);

    const colorModes = {
        start: "#ADD8E6" as COLORMODES,
        anonymous: "#78909C" as COLORMODES,
        private: "#512DA8" as COLORMODES
    };

    return (
        <Box sx={{ display: "flex", gap: 1 }}>
            <Button
                variant="contained"
                href="/anonymous"
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    backgroundColor: hoverMode
                        ? hoverMode === "ANONYMOUS"
                            ? colorModes.anonymous
                            : colorModes.start
                        : colorModes.start,
                    width: doWidthCalc(hoverMode, "ANONYMOUS"),
                    height: "100vh",
                    transition: "width 0.5s ease"
                }}
                onMouseOver={() => {
                    setHoverMode("ANONYMOUS");
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <FontAwesomeIcon size="xl" icon={faUserSecret} />
                    <Typography>Anonymous</Typography>
                </Box>
            </Button>
            <Button
                variant="contained"
                href="/private"
                sx={{
                    backgroundColor: hoverMode
                        ? hoverMode === "PRIVATE"
                            ? colorModes.private
                            : colorModes.start
                        : colorModes.start,
                    width: doWidthCalc(hoverMode, "PRIVATE"),
                    height: "100vh",
                    transition: "width 0.5s ease"
                }}
                onMouseOver={() => setHoverMode("PRIVATE")}
            >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <FontAwesomeIcon size="xl" icon={faLock} />
                    <Typography>Private</Typography>
                </Box>
            </Button>
            <Outlet />
            <TanStackRouterDevtools />
        </Box>
    );
};

// TanStackRouterDevtools is only for development
