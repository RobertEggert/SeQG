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
        if (!question) return;

        let index = 1; // Wir zeigen das erste Zeichen direkt

        setDisplayedText(question.charAt(0)); // Erster Buchstabe sofort sichtbar

        const interval = setInterval(() => {
            setDisplayedText((prev) => prev + question.charAt(index));
            index++;
            if (index >= question.length) {
                clearInterval(interval);
            }
        }, typingSpeed);

        return () => clearInterval(interval);
    }, [question, typingSpeed]);

    return (
        <Box sx={{ ...flexAlignRow }}>
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
                    "&::after": {
                        content: '""',
                        position: "absolute",
                        top: "10px",
                        left: "-5px",
                        width: 0,
                        height: 0,
                        border: "10px solid transparent",
                        borderRightColor: "#AFEEEE",
                        borderLeft: 0,
                        marginTop: "-5px"
                    }
                }}
            >
                <Typography variant="body1">
                    {displayedText}
                    <span style={{ opacity: 0.6 }}>|</span>
                </Typography>
            </Box>
        </Box>
    );
};

export default QuestionBubble;
