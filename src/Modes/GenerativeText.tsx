import { Box, Typography, type SxProps } from "@mui/material";
import { useEffect, useState } from "react";

export type GenerativeTextProps = {
    sx?: SxProps;
    question: string;
    typingSpeed?: number;
    mode?: "GUEST" | "PRIVATE"; // only for QuestionBubble currently
};

const GenerativeText = ({ sx, question, typingSpeed = 30 }: GenerativeTextProps) => {
    const [displayedText, setDisplayedText] = useState("");
    const isTyping = displayedText.length < question.length;
    useEffect(() => {
        setDisplayedText("");
        let index = 0;

        const interval = setInterval(() => {
            index++;
            setDisplayedText(question.slice(0, index));

            if (index >= question.length) {
                clearInterval(interval);
            }
        }, typingSpeed);

        return () => clearInterval(interval);
    }, [question, typingSpeed]);

    return (
        <Box sx={sx}>
            <Typography>
                {displayedText}
                {isTyping && <span style={{ opacity: 0.6 }}>|</span>}
            </Typography>
        </Box>
    );
};

export default GenerativeText;
