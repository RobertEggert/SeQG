import { Box } from "@mui/material";
import { useState } from "react";

import MainLogo from "./MainLogo";
import MainScreenCharacterModeControl from "./MainScreenModeControl";

export type MODES = "GUEST" | "PRIVATE" | null;

const MainScreen = () => {
    const [isPressed, setIsPressed] = useState(false);

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
            <MainLogo isPressed={isPressed} setIsPressed={setIsPressed} />
            {isPressed && <MainScreenCharacterModeControl />}
        </Box>
    );
};

export default MainScreen;
