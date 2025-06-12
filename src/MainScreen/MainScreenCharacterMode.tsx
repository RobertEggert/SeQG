import { Box, IconButton, Paper, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import SwipeableBox from "./MainScreenComponents/SwipeableBox";
import EnterModeButton from "./MainScreenComponents/EnterModeButton";
import ChangeModeButton from "./MainScreenComponents/ChangeModeButton";
import FadedImageChange from "./MainScreenComponents/FadedImageChange";
import type { MODES } from "./MainScreen";
import {
    useEffect,
    useRef,
    useState,
    type Dispatch,
    type SetStateAction
} from "react";

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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                infoRef.current &&
                !infoRef.current.contains(event.target as Node)
            ) {
                setInfoOpen(false);
            }
        };

        if (infoOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [infoOpen]);

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
                        justifyContent: "center",
                        paddingTop: "7rem"
                    }}
                >
                    <Typography
                        variant="h3"
                        onMouseEnter={() => setInfoOpen(true)}
                        onMouseLeave={() => setInfoOpen(false)}
                        onClick={() => setInfoOpen((prev) => !prev)}
                        sx={{
                            color: "#ffffff",
                            mb: 3,
                            fontFamily: "'Orbitron', sans-serif",
                            fontWeight: 700,
                            textShadow: "2px 2px 6px rgba(0,0,0,0.6)",
                            letterSpacing: "2px",
                            textTransform: "uppercase",
                            cursor: "pointer",
                            transition: "color 0.3s",
                            "&:hover": {
                                color: "#90caf9"
                            }
                        }}
                    >
                        {mode === "GUEST" ? "Guest Mode" : "Private Mode"}
                    </Typography>

                    <FadedImageChange enteringMode={enteringMode} mode={mode} />
                    <ChangeModeButton
                        handleModeSwitch={handleModeSwitch}
                        enteringMode={enteringMode}
                    />
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

            {infoOpen && (
                <Paper
                    ref={infoRef}
                    elevation={4}
                    sx={{
                        position: "fixed",
                        top: 80,
                        right: 16,
                        width: 300,
                        padding: 2,
                        backgroundColor: "#222",
                        color: "white",
                        zIndex: 1000,
                        borderRadius: 2
                    }}
                >
                    <Typography variant="h5" gutterBottom>
                        Mode Definition
                    </Typography>
                    <Typography variant="body2">
                        <h4>Guest Mode</h4>
                        In the Guest Mode you are fully anonymous. Your
                        questions are based on your self assessment.
                        <h4>Private Mode</h4>
                        In Private Mode your answers train the LLM to create
                        Questions just for you.
                    </Typography>
                </Paper>
            )}
        </>
    );
};

export default MainScreenCharacterMode;
