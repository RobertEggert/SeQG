import { Box } from "@mui/material";
import type { MODES } from "./MainScreen";
import { useNavigate } from "@tanstack/react-router";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import SwipeableBox from "./MainScreenComponents/SwipeableBox";
import EnterModeButton from "./MainScreenComponents/EnterModeButton";
import ChangeModeButton from "./MainScreenComponents/ChangeModeButton";
import FadedImageChange from "./MainScreenComponents/FadedImageChange";

type MainScreenCharacterModeProps = {
    setMode: Dispatch<SetStateAction<MODES>>;
    mode: MODES;
};

const MainScreenCharacterMode = ({
    setMode,
    mode
}: MainScreenCharacterModeProps) => {
    const navigate = useNavigate();
    const [enteringMode, setEnteringMode] = useState<boolean | null>(null);

    const handleModeSwitch = () => {
        setMode(mode === "GUEST" ? "PRIVATE" : "GUEST");
    };

    const handleClick = () => {
        setEnteringMode(true);
        setTimeout(() => {
            navigate({ to: `/frontend-mode/${mode?.toLowerCase()}` });
        }, 1000);
    };

    return (
        <SwipeableBox<MODES>
            toBeSet={mode === "GUEST" ? "PRIVATE" : "GUEST"}
            setter={setMode}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "5rem"
                }}
            >
                <FadedImageChange enteringMode={enteringMode} mode={mode} />
                <ChangeModeButton
                    handleModeSwitch={handleModeSwitch}
                    enteringMode={enteringMode}
                />
            </Box>

            <EnterModeButton handleClick={handleClick} mode={mode} />
        </SwipeableBox>
    );
};

export default MainScreenCharacterMode;
