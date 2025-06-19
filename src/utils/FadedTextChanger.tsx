import { Fade, Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";

type FadedTextProps = {
    timeout?: number;
    textArray: string[];
};

const FadedTextChanger = ({ timeout, textArray }: FadedTextProps) => {
    const [showFade, setShowFade] = useState(true);
    const [text, setText] = useState(textArray[Math.floor(Math.random() * textArray.length)]);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowFade(!showFade);
            if (!showFade) setText(textArray[Math.floor(Math.random() * textArray.length)]);
        }, 1300); // toggle every second

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showFade]); // we WANT only the showFade as a hook value
    return (
        <Fade in={showFade} timeout={timeout ?? 500} style={{ zIndex: 2 }}>
            <Box
                sx={{
                    width: "100%",
                    textAlign: "center"
                }}
            >
                <Typography variant="subtitle1">{text}</Typography>
            </Box>
        </Fade>
    );
};

export default FadedTextChanger;
