import { Button, Box } from "@mui/material";
import { doWidthCalc, doHeightCalc } from "../utils/calcUtils";
import MainScreenCircularProcessBar from "./MainScreenCircularProcessBar";
import MainScreenIconText from "./MainScreenIconText";
import type { COLORMODES, MODES } from "./MainScreen";
import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import { useNavigate } from "@tanstack/react-router";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";

type MainScreenButtonProps = {
    mode: MODES;
    buttonMode: MODES;
    startColor: COLORMODES;
    modeColor: COLORMODES;
    progressBarColor: COLORMODES;
    icon: IconDefinition;
    setMode: Dispatch<SetStateAction<MODES>>;
};

const MainScreenButton = ({
    mode,
    buttonMode,
    startColor,
    modeColor,
    progressBarColor,
    icon,
    setMode
}: MainScreenButtonProps) => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);
    const progressTimer = useRef<NodeJS.Timeout | null>(null);
    const holdTimeout = useRef<NodeJS.Timeout | null>(null);

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
                const navigateToMode = "/mode/" + mode?.toLowerCase();
                navigate({ to: navigateToMode });
            }, 1500);
        }
    };

    const handleMouseUp = () => {
        if (holdTimeout.current) clearTimeout(holdTimeout.current);
        if (progressTimer.current) clearInterval(progressTimer.current);
        setProgress(0);
    };

    return (
        <Button
            variant="contained"
            sx={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: mode
                    ? mode === buttonMode
                        ? modeColor
                        : startColor
                    : startColor,
                width: doWidthCalc(mode, buttonMode),
                height: doHeightCalc(mode, buttonMode),
                transition: "width 0.5s ease, height 0.5s ease"
            }}
            onClick={() => setMode(buttonMode)}
            onMouseDown={() => handleMouseDown(buttonMode)}
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
                <MainScreenIconText
                    mode={buttonMode}
                    icon={icon}
                    iconSize={mode === buttonMode ? "3rem" : "1.5rem"}
                    textSize={mode === buttonMode ? "1.5rem" : "1rem"}
                />
                {mode === buttonMode && (
                    <MainScreenCircularProcessBar
                        colorMode={progressBarColor}
                        progress={progress}
                    />
                )}
            </Box>
        </Button>
    );
};

export default MainScreenButton;
