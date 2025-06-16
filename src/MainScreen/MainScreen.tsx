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
        <Box sx={{ overflow: "hidden", height: "100%", width: "100%" }}>
            <Background />
            <Box
                sx={{
                    ...flexAlignColumn,
                    paddingTop: 2,
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
