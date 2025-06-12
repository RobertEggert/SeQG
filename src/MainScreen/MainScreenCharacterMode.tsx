import { Box, IconButton, Typography } from "@mui/material";
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

type MainScreenCharacterModeProps = {
    setMode: Dispatch<SetStateAction<MODES>>;
    mode: MODES;
};

const MainScreenCharacterMode = ({
    setMode,
    mode
}: MainScreenCharacterModeProps) => {
    const navigate = useNavigate();
    const [enteringMode, setEnteringMode] = useState<boolean>(false);
    const [infoOpen, setInfoOpen] = useState(false);
    const infoRef = useRef<HTMLDivElement>(null);

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
        <>
            <SwipeableBox<MODES>
                toBeSet={mode === "GUEST" ? "PRIVATE" : "GUEST"}
                setter={setMode}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        paddingTop: "5rem",
                        gap: 3
                    }}
                >
                    <Typography
                        variant="h3"
                        onClick={() => setInfoOpen(!infoOpen)}
                        sx={{
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
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 5,
                            alignItems: "center"
                        }}
                    >
                        <FadedImageChange
                            enteringMode={enteringMode}
                            mode={mode}
                        />
                        <ChangeModeButton
                            handleModeSwitch={handleModeSwitch}
                            enteringMode={enteringMode}
                        />
                    </Box>
                </Box>

                <EnterModeButton handleClick={handleClick} mode={mode} />
            </SwipeableBox>

            <IconButton
                onClick={() => setInfoOpen((prev) => !prev)}
                sx={{
                    position: "fixed",
                    top: 16,
                    right: 16,
                    color: "white",
                    zIndex: 1000,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" }
                }}
                aria-label="Info"
            >
                <FontAwesomeIcon icon={faCircleInfo} size="lg" />
            </IconButton>

            {infoOpen && <InfoPopup ref={infoRef} />}
        </>
    );
};

export default MainScreenCharacterMode;
