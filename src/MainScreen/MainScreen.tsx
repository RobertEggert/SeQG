import { Box } from "@mui/material";
import { useState } from "react";

import MainLogo from "./MainLogo";
import MainScreenCharacterModeControl from "./MainScreenModeControl";
import Background from "./MainScreenComponents/Background";
import { flexAlignColumn } from "../styling/theme";

export type MODES = "GUEST" | "PRIVATE" | null;

const MainScreen = () => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <Box>
            <Background />
            <Box sx={{ ...flexAlignColumn }}>
                <MainLogo isPressed={isPressed} setIsPressed={setIsPressed} />
                {isPressed && <MainScreenCharacterModeControl />}
            </Box>
        </Box>
    );
};

export default MainScreen;
