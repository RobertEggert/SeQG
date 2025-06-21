import { Typography, Box, Collapse, Fade } from "@mui/material";
import { useEffect, useState } from "react";
import { type SecurityTipsType, fetchSecurityTipsFromLLM } from "../../utils/LLMFetcher";
import { fallbackTips } from "../../utils/LLMFetcher";

const SecurityTips = () => {
    const initialTip = fallbackTips[Math.floor(Math.random() * fallbackTips.length)];

    const [currentTip, setCurrentTip] = useState<SecurityTipsType>(initialTip);
    const [nextTip, setNextTip] = useState<SecurityTipsType | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchSecurityTipsFromLLM().then((tip) => {
                if (tip) setNextTip(tip);
            });
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (nextTip?.title && nextTip?.subtitle) {
            const timeout = setTimeout(() => {
                setCurrentTip(nextTip);
                setNextTip(null);
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [nextTip]);

    if (!currentTip?.title || !currentTip?.subtitle) return null;

    return (
        <Collapse in={nextTip === null} timeout={1000}>
            <Fade in={nextTip === null} timeout={nextTip === null ? 3000 : 500}>
                <Box sx={{ paddingTop: 1 }}>
                    <Typography
                        sx={{
                            fontWeight: 700,
                            fontSize: "1.1rem",
                            color: "black"
                        }}
                    >
                        {currentTip.title}
                    </Typography>
                    <Typography
                        sx={{
                            textAlign: "block",
                            fontSize: "1rem",
                            lineHeight: 1.5,
                            color: "dimgrey"
                        }}
                    >
                        {currentTip.subtitle}
                    </Typography>
                </Box>
            </Fade>
        </Collapse>
    );
};

export default SecurityTips;
