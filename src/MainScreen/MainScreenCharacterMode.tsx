import { Button, Box, IconButton, Fade, Typography } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import type { MODES } from "./MainScreen";
import guestChar from "../img/guest.png";
import privateChar from "../img/private.png";
import { useNavigate } from "@tanstack/react-router";
import type { Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";
import FadedComponent from "../utils/FadedComponent";

type MainScreenCharacterModeProps = {
    setMode: Dispatch<SetStateAction<MODES>>;
    mode: MODES;
};

const MainScreenCharacterMode = ({
    setMode,
    mode
}: MainScreenCharacterModeProps) => {
    const navigate = useNavigate();
    const [modeChanged, setModeChanged] = useState(true);
    const [currentSrc, setCurrentSrc] = useState(guestChar);
    const [swipeX, setSwipeX] = useState(0);
    const [isSwiped, setIsSwiped] = useState(false);
    const [enteringMode, setEnteringMode] = useState<boolean | undefined>(
        undefined
    );

    const swipeThreshold = 50;

    useEffect(() => {
        setModeChanged(false);

        setTimeout(() => {
            setCurrentSrc(mode === "GUEST" ? guestChar : privateChar);
            setModeChanged(true);
        }, 300);
    }, [mode]);

    const touchStart = (e: React.TouchEvent) => {
        setSwipeX(e.changedTouches[0].clientX); // start pf swipe
    };

    const touchMove = (e: React.TouchEvent) => {
        const swipeDistance = Math.abs(swipeX - e.changedTouches[0].clientX);
        if (swipeDistance > swipeThreshold) {
            setIsSwiped(true);
        }
    };

    const touchEnd = () => {
        if (!isSwiped) return;

        setMode(mode === "GUEST" ? "PRIVATE" : "GUEST");
        setSwipeX(0);
        setIsSwiped(false);
    };

    const handleModeSwitch = () => {
        setMode(mode === "GUEST" ? "PRIVATE" : "GUEST");
    };

    const handleClick = () => {
        setEnteringMode(true);
        setTimeout(() => {
            navigate({ to: `/mode/${mode?.toLowerCase()}` });
        }, 2000);
    };

    return (
        <Box
            onTouchStart={touchStart}
            onTouchMove={touchMove}
            onTouchEnd={touchEnd}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 5,
                width: "100rem",
                alignItems: "center"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                    marginTop: "5rem",
                    width: "40rem"
                }}
            >
                <Box
                    sx={{
                        transition: "padding-left 1s ease",
                        paddingLeft: enteringMode ? "20rem" : 0
                    }}
                >
                    <Fade in={modeChanged} timeout={600}>
                        <Box
                            component="img"
                            src={currentSrc}
                            alt="character"
                            sx={{
                                padding: 10,
                                width: "auto",
                                height: "auto",
                                maxHeight: "45vh",
                                objectFit: "cover"
                            }}
                        />
                    </Fade>
                </Box>
                <FadedComponent
                    unmountOnExit
                    mountOnEnter
                    externalFade={enteringMode}
                    timeout={2000}
                    fadeTime={1000}
                >
                    <IconButton
                        onClick={handleModeSwitch}
                        sx={{
                            border: "1px solid #bdbdbd",
                            borderRadius: 5,
                            width: "20rem"
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                paddingRight: 2
                            }}
                        >
                            <Typography fontSize={30}>
                                Press or Swipe!
                            </Typography>
                            <Typography>Switch Mode</Typography>
                        </Box>
                        <DoubleArrowIcon sx={{ fontSize: 50 }} />
                    </IconButton>
                </FadedComponent>
            </Box>

            <Button
                variant="outlined"
                onClick={handleClick}
                sx={{
                    borderWidth: 1,
                    borderColor: "#bdbdbd",
                    color: "darkgrey",
                    width: "25%",
                    fontWeight: "bold",
                    borderRadius: 10
                }}
            >
                Enter {mode} mode
            </Button>
        </Box>
    );
};

export default MainScreenCharacterMode;
