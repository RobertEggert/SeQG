import { Box, Fade, keyframes } from "@mui/material";
import privateChar from "../../img/woman.png";
import guestChar from "../../img/spy.png";
import type { MODES } from "../MainScreen";
import { flexAllCenter } from "../../styling/theme";

type FadedImageChangeProps = {
    enteringMode: boolean;
    mode: MODES;
};
const rotateGuestStart = keyframes`
  0% {
    transform: perspective(60rem) rotateY(0deg) translateZ(0rem) rotateY(0deg);
    filter: grayscale(80%);
    opacity: 1;
  }
  100% {
    transform: perspective(60rem) rotateY(135deg) translateZ(25rem) rotateY(-135deg) translateY(-6.25rem);
    filter: grayscale(0%);
    opacity: 0.6;
  }
`;

const rotateGuestEnd = keyframes`
  0% {
    transform: perspective(60rem) rotateY(135deg) translateZ(25rem) rotateY(-135deg) translateY(-6.25rem);
    filter: grayscale(0%);
    opacity: 0.6;
  }
  100% {
    transform: perspective(60rem) rotateY(360deg) translateZ(0rem) rotateY(-360deg);
    filter: grayscale(80%);
    opacity: 1;
  }
`;

const rotatePrivateStart = keyframes`
  0% {
    transform: perspective(60rem) rotateY(0deg) translateZ(0rem) rotateY(0deg) translateX(-18.75rem) translateY(0rem);
    filter: grayscale(0%);
    opacity: 1;
  }
  100% {
    transform: perspective(60rem) rotateY(135deg) translateZ(25rem) rotateY(-135deg) translateX(-18.75rem) translateY(-6.25rem);
    filter: grayscale(80%);
    opacity: 0.4;
  }
`;

const rotatePrivateEnd = keyframes`
  0% {
    transform: perspective(60rem) rotateY(135deg) translateZ(25rem) rotateY(-135deg) translateX(-18.75rem) translateY(-6.25rem);
    filter: grayscale(80%);
    opacity: 0.4;
  }
  100% {
    transform: perspective(60rem) rotateY(360deg) translateZ(0rem) rotateY(-360deg) translateX(-18.75rem);
    filter: grayscale(0%);
    opacity: 1;
  }
`;

const FadedImageChange = ({ enteringMode, mode }: FadedImageChangeProps) => {
    return (
        <Box
            sx={{
                ...flexAllCenter,
                transform: enteringMode
                    ? mode === "PRIVATE"
                        ? "translateX(23%)"
                        : "translateX(17%)"
                    : "translateX(0%)",
                transition: "transform 1s ease-in-out",
                paddingBottom: 4
            }}
        >
            {/* GUEST CHAR */}
            <Fade in={!enteringMode || mode === "GUEST"} timeout={500}>
                <Box
                    component="img"
                    src={guestChar}
                    sx={{
                        padding: 2,
                        height: "50vh",
                        zIndex: mode === "PRIVATE" ? 2 : 1,
                        animation:
                            mode === "PRIVATE"
                                ? `${rotateGuestStart} 2s ease-in-out`
                                : `${rotateGuestEnd} 2s ease-in-out`,
                        animationFillMode: "forwards"
                    }}
                />
            </Fade>
            {/* PRIVATE CHAR */}
            <Fade in={!enteringMode || mode === "PRIVATE"} timeout={500}>
                <Box
                    component="img"
                    src={privateChar}
                    sx={{
                        padding: 2,
                        height: "50vh",
                        zIndex: mode === "GUEST" ? 2 : 1,
                        animation:
                            mode === "GUEST"
                                ? `${rotatePrivateStart} 2s ease-in-out`
                                : `${rotatePrivateEnd} 2s ease-in-out`,
                        animationFillMode: "forwards"
                    }}
                />
            </Fade>
        </Box>
    );
};

export default FadedImageChange;
