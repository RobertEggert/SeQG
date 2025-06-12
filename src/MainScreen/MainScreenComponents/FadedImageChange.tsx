import { Box, Fade } from "@mui/material";
import privateChar from "../../img/woman.png";
import guestChar from "../../img/spy.png";
import type { MODES } from "../MainScreen";

type FadedImageChangeProps = {
    enteringMode: boolean;
    mode: MODES;
};

const FadedImageChange = ({ enteringMode, mode }: FadedImageChangeProps) => {
    return (
        <Box
            sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                height: "auto",
                left: "-4rem",
                maxHeight: "45vh",
                transition: "transform 0.5s ease",
                transform: enteringMode ? "translateX(17%)" : "translateX(0)"
            }}
        >
            <Fade in={!enteringMode} timeout={300}>
                <Box
                    component="img"
                    src={mode === "GUEST" ? privateChar : guestChar}
                    sx={{
                        position: "absolute",
                        right: mode === "GUEST" ? -20 : -110,
                        top: 20,
                        height: "35vh",
                        opacity: 0.3,
                        filter: "grayscale(100%)",
                        transform: "scale(0.8)",
                        transition:
                            "opacity 0.3s ease, transform 0.3s ease, right 0.3s ease"
                    }}
                />
            </Fade>

            <Fade in timeout={300}>
                <Box
                    component="img"
                    src={mode === "GUEST" ? guestChar : privateChar}
                    sx={{
                        padding: 7,
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
