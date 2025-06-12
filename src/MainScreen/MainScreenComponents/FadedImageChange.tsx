import { Box, Fade } from "@mui/material";
import privateChar from "../../img/woman.png";
import guestChar from "../../img/spy.png";
import { useState, useEffect } from "react";
import type { MODES } from "../MainScreen";

type FadedImageChangeProps = {
    enteringMode: boolean | null;
    mode: MODES;
};

const FadedImageChange = ({ enteringMode, mode }: FadedImageChangeProps) => {
    const [displayMode, setDisplayMode] = useState<MODES>("GUEST");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDisplayMode(mode);
        }, 150);

        return () => clearTimeout(timeout);
    }, [mode]);

    const isGuest = displayMode === "GUEST";

    const mainImg = isGuest ? guestChar : privateChar;
    const shadowImg = isGuest ? privateChar : guestChar;

    const shadowRightPosition = shadowImg === guestChar ? -110 : -40;

    return (
        <Box
            sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "auto",
                maxHeight: "45vh",
                transition: "transform 0.7s ease",
                transform: enteringMode ? "translateX(50%)" : "translateX(0)"
            }}
        >
            {!enteringMode && (
                <Box
                    component="img"
                    src={shadowImg}
                    alt="shadow character"
                    sx={{
                        position: "absolute",
                        right: shadowRightPosition,
                        top: 20,
                        height: "35vh",
                        opacity: 0.3,
                        filter: "grayscale(80%)",
                        transform: "scale(0.7)",
                        transition:
                            "opacity 0.3s ease, transform 0.3s ease, right 0.3s ease"
                    }}
                />
            )}

            <Fade in timeout={300} key={mainImg} unmountOnExit>
                <Box
                    component="img"
                    src={mainImg}
                    alt="main character"
                    sx={{
                        padding: 2,
                        maxHeight: "45vh",
                        objectFit: "cover",
                        zIndex: 1,
                        position: "relative"
                    }}
                />
            </Fade>
        </Box>
    );
};

export default FadedImageChange;
