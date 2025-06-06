import { Box } from "@mui/material";
import { useState } from "react";
import Matrix from "../img/Matrix";
import { faLock, faUserSecret } from "@fortawesome/free-solid-svg-icons";
import MainScreenButton from "./MainScreenButton";
import { colorModes } from "../styling/theme";

export type MODES = "GUEST" | "PRIVATE" | null;

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
                buttonMode={"GUEST"}
                startColor={colorModes.start}
                modeColor={colorModes.guest}
                progressBarColor={colorModes.private}
                icon={faUserSecret}
                setMode={setMode}
            />
            <MainScreenButton
                mode={mode}
                buttonMode={"PRIVATE"}
                startColor={colorModes.start}
                modeColor={colorModes.private}
                progressBarColor={colorModes.guest}
                icon={faLock}
                setMode={setMode}
            />
        </Box>
    );
};

export default MainScreen;
