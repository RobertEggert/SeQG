import { Box } from "@mui/material";
import { useState } from "react";
import Matrix from "../img/Matrix";
import { faLock, faUserSecret } from "@fortawesome/free-solid-svg-icons";
import MainScreenButton from "./MainScreenButton";
import { colorModes } from "../styling/theme";

export type MODES = "ANONYMOUS" | "PRIVATE" | null;

const MainScreen = () => {
    const [mode, setMode] = useState<MODES>(null);

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
