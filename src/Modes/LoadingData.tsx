import { Box, CircularProgress, Fade, Typography } from "@mui/material";
import { useState, useEffect } from "react";

const LoadingData = () => {
    const [showFade, setShowFade] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowFade((prev) => !prev);
        }, 1300); // toggle every second

        return () => clearInterval(interval);
    }, [showFade]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 5
            }}
        >
            <CircularProgress size={60} color="secondary" thickness={2} />
            <Fade in={showFade} timeout={500}>
                <Typography variant="subtitle1" sx={{ color: "black" }}>
                    Fetching data
                </Typography>
            </Fade>
        </Box>
    );
};

export default LoadingData;
