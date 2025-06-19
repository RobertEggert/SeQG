import { Box, keyframes } from "@mui/material";
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
  }
  100% {
    transform: perspective(60rem) rotateY(135deg) translateZ(25rem) rotateY(-135deg) translateY(-6.25rem);
    filter: grayscale(0%);
  }
`;

const rotateGuestEnd = keyframes`
  0% {
    transform: perspective(60rem) rotateY(135deg) translateZ(25rem) rotateY(-135deg) translateY(-6.25rem);
    filter: grayscale(0%);
  }
  100% {
    transform: perspective(60rem) rotateY(360deg) translateZ(0rem) rotateY(-360deg);
    filter: grayscale(80%);
  }
`;

const rotatePrivateStart = keyframes`
  0% {
    transform: perspective(60rem) rotateY(0deg) translateZ(0rem) rotateY(0deg) translateX(-18.75rem) translateY(0rem);
    filter: grayscale(0%);
      }
  100% {
    transform: perspective(60rem) rotateY(135deg) translateZ(25rem) rotateY(-135deg) translateX(-18.75rem) translateY(-6.25rem);
    filter: grayscale(80%);
  }
`;

const rotatePrivateEnd = keyframes`
  0% {
    transform: perspective(60rem) rotateY(135deg) translateZ(25rem) rotateY(-135deg) translateX(-18.75rem) translateY(-6.25rem);
    filter: grayscale(80%);
    
  }
  100% {
    transform: perspective(60rem) rotateY(360deg) translateZ(0rem) rotateY(-360deg) translateX(-18.75rem);
    filter: grayscale(0%);
  }
`;

const FadedImageChange = ({ enteringMode, mode }: FadedImageChangeProps) => {
    const isGuest = mode === "GUEST";
    const isPriv = mode === "PRIVATE";

    const shadowOrGone = enteringMode ? 0 : 0.6;

    return (
        <Box
            sx={{
                ...flexAllCenter,
                transform: enteringMode ? (isPriv ? "translateX(23%)" : "translateX(17%)") : "translateX(0%)",
                transition: "transform 1s ease-in-out",
                paddingBottom: 4
            }}
        >
            {/* GUEST CHAR */}
            <Box
                component="img"
                src={guestChar}
                sx={{
                    padding: 2,
                    height: "50vh",
                    zIndex: isPriv ? 2 : 1,
                    animation: isPriv ? `${rotateGuestStart} 2s ease-in-out` : `${rotateGuestEnd} 2s ease-in-out`,
                    animationFillMode: "forwards",
                    opacity: isGuest ? 1 : shadowOrGone,
                    transition: "opacity 0.5s ease-in-out"
                }}
            />
            {/* PRIVATE CHAR */}
            <Box
                component="img"
                src={privateChar}
                sx={{
                    padding: 2,
                    height: "50vh",
                    zIndex: isGuest ? 2 : 1,
                    animation: isGuest ? `${rotatePrivateStart} 2s ease-in-out` : `${rotatePrivateEnd} 2s ease-in-out`,
                    animationFillMode: "forwards",
                    opacity: isPriv ? 1 : shadowOrGone,
                    transition: "opacity 1s ease-in-out"
                }}
            />
        </Box>
    );
};

export default FadedImageChange;
