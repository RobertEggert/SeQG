import { faUserSecret, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import doWidthCalc from "./utils/calcUtils";
import { useRef } from "react";

export type MODES = "ANONYMOUS" | "PRIVATE" | null;

export type COLORMODES = "#ADD8E6" | "#8C92AC" | "#191970"; // light blue, grey, purple

type MainScreenProps = {
    mode: MODES;
    setMode: React.Dispatch<React.SetStateAction<MODES>>;
};

const MainScreen = ({ mode, setMode }: MainScreenProps) => {
    const navigate = useNavigate();
    const holdTimeout = useRef<number | null>(null);

    const colorModes = {
        start: "#ADD8E6" as COLORMODES,
        anonymous: "#78909C" as COLORMODES,
        private: "#512DA8" as COLORMODES
    };

    const handleMouseDown = (buttonMode: MODES) => {
        if (buttonMode === mode) {
            holdTimeout.current = setTimeout(() => {
                console.log("Long press triggered for mode:", buttonMode);
                if (mode === "ANONYMOUS") {
                    navigate({ to: "/anonymous" });
                } else if (mode === "PRIVATE") {
                    navigate({ to: "/private" });
                }
            }, 1000); // 1000 ms => 1 second
        }
    };

    const handleMouseUp = () => {
        if (holdTimeout.current) {
            clearTimeout(holdTimeout.current);
        }
    };

    const handleClick = (currentMode: MODES) => {
        setMode(currentMode);
    };

    return (
        <Box sx={{ display: "flex", gap: 1 }}>
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
                    height: "100vh",
                    transition: "width 0.5s ease"
                }}
                onClick={() => handleClick("ANONYMOUS")}
                onMouseDown={() => handleMouseDown("ANONYMOUS")}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <FontAwesomeIcon size="xl" icon={faUserSecret} />
                    <Typography>Anonymous</Typography>
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
                    height: "100vh",
                    transition: "width 0.5s ease"
                }}
                onClick={() => handleClick("PRIVATE")}
                onMouseDown={() => handleMouseDown("PRIVATE")}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <FontAwesomeIcon size="xl" icon={faLock} />
                    <Typography>Private</Typography>
                </Box>
            </Button>
        </Box>
    );
};

export default MainScreen;
