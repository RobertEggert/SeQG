import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { imgContainerGuest } from "../../utils/imgContainer";
import { flexAlignRow } from "../../styling/theme";

type QuestionBubbleProps = {
    question: string;
    typingSpeed?: number;
};

const guestImages = Object.values(imgContainerGuest);
const randomGuestImage = guestImages[Math.floor(Math.random() * guestImages.length)];

const QuestionBubble = ({ question, typingSpeed = 20 }: QuestionBubbleProps) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        setDisplayedText("");
        let index = 0;

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
