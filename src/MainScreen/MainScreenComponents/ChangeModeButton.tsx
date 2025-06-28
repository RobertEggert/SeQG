import { IconButton, Box, Typography } from "@mui/material";
import FadedComponent from "../../utils/FadedComponent";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { flexAlignColumn } from "../../styling/theme";
import { useState, useEffect } from "react";
import type { MODES } from "../MainScreen";

type ChangeModeButtonProps = {
    handleModeSwitch: () => void;
    enteringMode: boolean;
    mode: MODES;
};

const ChangeModeButton = ({ handleModeSwitch, enteringMode, mode }: ChangeModeButtonProps) => {
    const [isAnimation, setIsAnimation] = useState(false);

    useEffect(() => {
        setIsAnimation(true);
        const timer = setTimeout(() => {
            setIsAnimation(false);
        }, 1500); // match the animation duration
        return () => clearTimeout(timer);
    }, [mode]); // whenever `mode` changes, disable button for 1.5s

    return (
        <FadedComponent externalFade={!enteringMode ? undefined : enteringMode} timeout={2000} fadeTime={1000}>
            <IconButton
                onClick={handleModeSwitch}
                disabled={isAnimation}
                sx={{
                    outline: isAnimation ? "1px solid black" : 0,
                    backgroundColor: isAnimation ? "grey" : "white",
                    marginTop: "15%",
                    borderRadius: 5,
                    width: "20rem",
                    "&:hover": {
                        backgroundColor: "white"
                    },
                    "&:disabled": {
                        backgroundColor: "darkgrey"
                    }
                }}
            >
                <Box
                    sx={{
                        ...flexAlignColumn,
                        paddingRight: 2
                    }}
                >
                    <Typography fontSize={30}>Press or Swipe!</Typography>
                    <Typography>Switch Mode</Typography>
                </Box>
                <DoubleArrowIcon sx={{ fontSize: 50 }} />
            </IconButton>
        </FadedComponent>
    );
};

export default ChangeModeButton;
