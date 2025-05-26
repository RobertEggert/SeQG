import { Box } from "@mui/material";
import { useState } from "react";
import Matrix from "../img/Matrix";
import { faLock, faUserSecret } from "@fortawesome/free-solid-svg-icons";
import MainScreenButton from "./MainScreenButton";

export type MODES = "ANONYMOUS" | "PRIVATE" | null;

export type COLORMODES =
    | "rgba(173, 216, 230, 0.95)"
    | "rgba(120, 144, 156, 0.95)"
    | "rgba(81, 45, 168, 0.95)"; // light blue, grey, purple

const MainScreen = () => {
    const [mode, setMode] = useState<MODES>(null);

    const colorModes = {
        start: "rgba(173, 216, 230, 0.95)" as COLORMODES,
        anonymous: "rgba(120, 144, 156, 0.95)" as COLORMODES,
        private: "rgba(81, 45, 168, 0.95)" as COLORMODES
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                width: "100vw",
                height: "100vh"
            }}
        >
            <Matrix />
            <MainScreenButton
                mode={mode}
                buttonMode={"ANONYMOUS"}
                startColor={colorModes.start}
                modeColor={colorModes.anonymous}
                progressBarColor={colorModes.private}
                icon={faUserSecret}
                setMode={setMode}
            />
            <MainScreenButton
                mode={mode}
                buttonMode={"PRIVATE"}
                startColor={colorModes.start}
                modeColor={colorModes.private}
                progressBarColor={colorModes.anonymous}
                icon={faLock}
                setMode={setMode}
            />
        </Box>
    );
};

export default MainScreen;
