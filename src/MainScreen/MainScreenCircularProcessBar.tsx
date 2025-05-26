import { CircularProgress, Fade, Box, Typography } from "@mui/material";
import type { COLORMODES } from "./MainScreen";
import { useEffect, useState } from "react";

type MainScreenCircularProcessBarProps = {
    colorMode: COLORMODES;
    progress: number;
};

const MainScreenCircularProcessBar = ({
    colorMode,
    progress
}: MainScreenCircularProcessBarProps) => {
    const [showFade, setShowFade] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowFade((prev) => !prev);
        }, 1300); // toggle every second

        return () => clearInterval(interval);
    }, [showFade]);
    return (
        <>
            <CircularProgress
                variant="determinate"
                value={progress}
                sx={{ color: colorMode }}
                size={40}
                thickness={4}
            />
            <Fade in={showFade} timeout={500}>
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 32,
                        width: "100%",
                        textAlign: "center"
                    }}
                >
                    <Typography variant="subtitle1" sx={{ color: "white" }}>
                        To enter mode, press and hold
                    </Typography>
                </Box>
            </Fade>
        </>
    );
};

export default MainScreenCircularProcessBar;
