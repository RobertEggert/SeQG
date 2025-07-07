import { Box, Button, IconButton, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import SwipeableBox from "./MainScreenComponents/SwipeableBox";
import EnterModeButton from "./MainScreenComponents/EnterModeButton";
import ChangeModeButton from "./MainScreenComponents/ChangeModeButton";
import FadedImageChange from "./MainScreenComponents/FadedImageChange";
import type { MODES } from "./MainScreen";
import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import InfoPopup from "./MainScreenComponents/InfoPopup";
import { flexAlignColumn } from "../styling/theme";
import ModeDescription from "./MainScreenComponents/ModeDescription";

type MainScreenCharacterModeProps = {
    setMode: Dispatch<SetStateAction<MODES>>;
    mode: MODES;
};

const MainScreenCharacterMode = ({ setMode, mode }: MainScreenCharacterModeProps) => {
    const navigate = useNavigate();
    const [enteringMode, setEnteringMode] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);
    const infoRef = useRef<HTMLDivElement>(null);

    const handleModeSwitch = () => {
        setMode(mode === "GUEST" ? "PRIVATE" : "GUEST");
    };

    const handleClick = () => {
        setEnteringMode(true);
        setTimeout(() => {
            navigate({ to: `/host-mode/${mode?.toLowerCase()}` });
        }, 1000);
    };

    return (
        <SwipeableBox<MODES> toBeSet={mode === "GUEST" ? "PRIVATE" : "GUEST"} setter={setMode}>
            <Box
                sx={{
                    ...flexAlignColumn
                }}
            >
                <Button
                    onClick={() => setInfoOpen(!infoOpen)}
                    onBlur={() => setInfoOpen(!infoOpen)}
                    disableRipple
                    sx={{
                        backgroundColor: "transparent",

                        marginBottom: 20
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            position: "relative",
                            color: "white",
                            paddingBottom: 3,
                            fontFamily: "'Orbitron', sans-serif",
                            fontWeight: 700,
                            textShadow: "2 2 6 rgba(0,0,0,0.6)",
                            letterSpacing: 2,
                            cursor: "pointer",
                            transition: "color 0.3s",
                            "&:hover": {
                                color: "#90caf9"
                            }
                        }}
                    >
                        {mode + " MODE"}
                    </Typography>
                </Button>
                <Box
                    sx={{
                        ...flexAlignColumn,
                        width: "100%",
                        height: "100%"
                    }}
                >
                    <FadedImageChange enteringMode={enteringMode} mode={mode} />
                    <ModeDescription mode={mode} />
                    <ChangeModeButton handleModeSwitch={handleModeSwitch} enteringMode={enteringMode} mode={mode} />
                </Box>
            </Box>

            <EnterModeButton handleClick={handleClick} mode={mode} />
            <IconButton
                onClick={() => setInfoOpen(!infoOpen)}
                onBlur={() => setInfoOpen(!infoOpen)}
                sx={{
                    position: "fixed",
                    top: 16,
                    right: 16,
                    color: "white",
                    zIndex: 1000,
                    backgroundColor: "rgba(0,0,0,0.5)"
                }}
                aria-label="Info"
            >
                <FontAwesomeIcon icon={faCircleInfo} size="lg" />
            </IconButton>

            {infoOpen && <InfoPopup ref={infoRef} />}
        </SwipeableBox>
    );
};

export default MainScreenCharacterMode;
