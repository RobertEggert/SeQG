import { Box, Fade } from "@mui/material";
import guestChar from "../../img/guest.png";
import privateChar from "../../img/private.png";
import { useState, useEffect } from "react";
import type { MODES } from "../MainScreen";

type FadedImageChangeProps = {
    enteringMode: boolean | null;
    mode: MODES;
};

const FadedImageChange = ({ enteringMode, mode }: FadedImageChangeProps) => {
    const [modeChanged, setModeChanged] = useState(true);
    const [currentSrc, setCurrentSrc] = useState(guestChar);
    useEffect(() => {
        setModeChanged(false);

        setTimeout(() => {
            setCurrentSrc(mode === "GUEST" ? guestChar : privateChar);
            setModeChanged(true);
        }, 300);
    }, [mode]);
    return (
        <Box
            sx={{
                transition: "transform 0.7s ease",
                transform: enteringMode ? "translateX(50%)" : "translateX(0)"
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
    );
};

export default FadedImageChange;
