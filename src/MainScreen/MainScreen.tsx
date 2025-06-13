import { Box } from "@mui/material";
import { useState } from "react";

import MainLogo from "./MainLogo";
import MainScreenCharacterModeControl from "./MainScreenModeControl";
import Background from "./MainScreenComponents/Background";

export type MODES = "GUEST" | "PRIVATE" | null;

const MainScreen = () => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <Box
            sx={{
                position: "relative",
                width: "100vw",
                height: "100vh",
                overflow: "hidden"
            }}
        >
            <Background />
            <Box
                sx={{
                    zIndex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                    width: "100%",
                    height: "100%"
                }}
            >
                <MainLogo isPressed={isPressed} setIsPressed={setIsPressed} />
                {isPressed && <MainScreenCharacterModeControl />}
            </Box>
        </Box>
    );
};

export default MainScreen;
