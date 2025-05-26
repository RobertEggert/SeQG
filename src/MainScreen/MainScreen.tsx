import { Box, Button } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { doHeightCalc, doWidthCalc } from "../utils/calcUtils";
import { useRef, useState } from "react";
import Matrix from "../img/Matrix";
import MainScreenCircularProcessBar from "./MainScreenCircularProcessBar";
import MainScreenIconText from "./MainScreenIconText";

export type MODES = "ANONYMOUS" | "PRIVATE" | null;

export type COLORMODES =
    | "rgba(173, 216, 230, 0.95)"
    | "rgba(120, 144, 156, 0.95)"
    | "rgba(81, 45, 168, 0.95)"; // light blue, grey, purple

const MainScreen = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState<MODES>(null);
    const [progress, setProgress] = useState(0);
    const progressTimer = useRef<NodeJS.Timeout | null>(null);
    const holdTimeout = useRef<NodeJS.Timeout | null>(null);

    const colorModes = {
        start: "rgba(173, 216, 230, 0.95)" as COLORMODES,
        anonymous: "rgba(120, 144, 156, 0.95)" as COLORMODES,
        private: "rgba(81, 45, 168, 0.95)" as COLORMODES
    };

    const handleMouseDown = (buttonMode: MODES) => {
        if (buttonMode === mode) {
            setProgress(0); // start at 0 immediately
            let currentProgress = 0;

            // First tick after delay
            progressTimer.current = setInterval(() => {
                setProgress(currentProgress);
                currentProgress += 12;

                if (currentProgress >= 100) {
                    clearInterval(progressTimer.current!);
                }
            }, 150);

            holdTimeout.current = setTimeout(() => {
                console.log("Long press triggered for mode:", buttonMode);
                if (mode === "ANONYMOUS") {
                    navigate({ to: "/mode/anonymous" });
                } else if (mode === "PRIVATE") {
                    navigate({ to: "/mode/private" });
                }
            }, 1500);
        }
    };

    const handleMouseUp = () => {
        if (holdTimeout.current) clearTimeout(holdTimeout.current);
        if (progressTimer.current) clearInterval(progressTimer.current);
        setProgress(0);
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                width: "100vw",
                height: "100vh"
            }}
        >
            <Matrix />
            <Button
                variant="contained"
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    backgroundColor: mode
                        ? mode === "ANONYMOUS"
                            ? colorModes.anonymous
                            : colorModes.start
                        : colorModes.start,
                    width: doWidthCalc(mode, "ANONYMOUS"),
                    height: doHeightCalc(mode, "ANONYMOUS"),
                    transition: "width 0.5s ease, height 0.5s ease"
                }}
                onClick={() => setMode("ANONYMOUS")}
                onMouseDown={() => handleMouseDown("ANONYMOUS")}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <Box
                    flexDirection={"column"}
                    sx={{
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <MainScreenIconText mode={mode} />
                    {mode === "ANONYMOUS" && (
                        <MainScreenCircularProcessBar
                            colorMode={colorModes.private}
                            progress={progress}
                        />
                    )}
                </Box>
            </Button>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: mode
                        ? mode === "PRIVATE"
                            ? colorModes.private
                            : colorModes.start
                        : colorModes.start,
                    width: doWidthCalc(mode, "PRIVATE"),
                    height: doHeightCalc(mode, "PRIVATE"),
                    transition: "width 0.5s ease, height 0.5s ease"
                }}
                onClick={() => setMode("PRIVATE")}
                onMouseDown={() => handleMouseDown("PRIVATE")}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <Box
                    flexDirection={"column"}
                    sx={{
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <MainScreenIconText mode={mode} />
                    {mode === "PRIVATE" && (
                        <MainScreenCircularProcessBar
                            colorMode={colorModes.anonymous}
                            progress={progress}
                        />
                    )}
                </Box>
            </Button>
        </Box>
    );
};

export default MainScreen;
