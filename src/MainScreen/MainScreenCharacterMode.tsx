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
                    <Typography variant="h5" sx={{ color: "black", mb: 1 }}>
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
                        top: 64,
                        right: 16,
                        width: 300,
                        padding: 2,
                        backgroundColor: "#222",
                        color: "white",
                        zIndex: 1000,
                        borderRadius: 2
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Mode Definition
                    </Typography>
                    <Typography variant="body2">
                        ToDo define Anonymous and Guest here!
                    </Typography>
                </Paper>
            )}
        </>
    );
};

export default MainScreenCharacterMode;
