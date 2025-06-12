import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import MainLogo from "./MainLogo";
import MainScreenCharacterModeControl from "./MainScreenModeControl";
import videoBackground from "../img/background.mp4";

export type MODES = "GUEST" | "PRIVATE" | null;

const MainScreen = () => {
    const [isPressed, setIsPressed] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 1;
        }
    }, []);

    return (
        <Box
            sx={{
                position: "relative",
                width: "100vw",
                height: "100vh",
                overflow: "hidden"
            }}
        >
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    top: 0,
                    left: 0,
                    zIndex: 0
                }}
                src={videoBackground}
            />

            <Box
                sx={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                    width: "100%",
                    height: "100%"
                }}
            >
                <MainLogo isPressed={isPressed} setIsPressed={setIsPressed} />
                {isPressed && <MainScreenCharacterModeControl />}
            </Box>
        </Box>
    );
};

export default MainScreen;
