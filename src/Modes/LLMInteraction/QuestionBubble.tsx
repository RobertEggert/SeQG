import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { imgContainer } from "../../utils/imgContainer";
import { flexAlignRow } from "../../styling/theme";

type QuestionBubbleProps = {
    question: string;
    typingSpeed?: number;
};

const randImages = Object.values(imgContainer);

const QuestionBubble = ({ question, typingSpeed = 20 }: QuestionBubbleProps) => {
    const [displayedText, setDisplayedText] = useState("");
    const [randomGuestImage, setRandomGuestImage] = useState<string>("");

    useEffect(() => {
        const randomImage = randImages[Math.floor(Math.random() * randImages.length)];
        setRandomGuestImage(randomImage);
    }, []);

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

    const isTyping = displayedText.length < question.length;

    return (
        <Box sx={{ ...flexAlignRow, alignItems: "flex-start" }}>
            {randomGuestImage && (
                <Box
                    component="img"
                    src={randomGuestImage}
                    alt="Charakter"
                    sx={{
                        gridRow: "1 / span 2",
                        width: "auto",
                        maxWidth: 80,
                        height: "100%",
                        objectFit: "contain",
                        mr: "2%"
                    }}
                />
            )}
            <Box
                sx={{
                    position: "relative",
                    backgroundColor: "#AFEEEE",
                    borderRadius: "16px",
                    padding: "12px 16px",
                    maxWidth: "90%",
                    whiteSpace: "pre-wrap",
                    overflow: "visible",
                    "&::after": {
                        content: '""',
                        position: "absolute",
                        top: "16px",
                        left: "-10px",
                        width: 0,
                        height: 0,
                        border: "10px solid transparent",
                        borderRightColor: "#AFEEEE",
                        borderLeft: 0
                    }
                }}
            >
                <Typography
                    variant="body1"
                    sx={{
                        opacity: 0,
                        visibility: "hidden",
                        pointerEvents: "none",
                        userSelect: "none",
                        whiteSpace: "pre-wrap"
                    }}
                >
                    {question}
                </Typography>

                <Box sx={{ position: "absolute", top: "12px", left: "16px", right: "16px" }}>
                    <Typography variant="body1">
                        {displayedText}
                        {isTyping && <span style={{ opacity: 0.6 }}>|</span>}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default QuestionBubble;
