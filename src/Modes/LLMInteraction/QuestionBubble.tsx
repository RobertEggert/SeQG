import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { imgContainer } from "../../utils/imgContainer";
import { flexAlignRow } from "../../styling/theme";
import GenerativeText, { type GenerativeTextProps } from "../GenerativeText";

const privateImages = Object.values(imgContainer.private);
const guestImages = Object.values(imgContainer.guest);
const lightBlue = "#AFEEEE";

const QuestionBubble = ({ question, typingSpeed = 30, mode }: GenerativeTextProps) => {
    const [randomGuestImage, setRandomGuestImage] = useState("");
    const isGuest = mode === "GUEST";
    useEffect(() => {
        if (isGuest) {
            const randomGuestImage = guestImages[Math.floor(Math.random() * guestImages.length)];
            setRandomGuestImage(randomGuestImage);
        } else {
            const randomPrivateImage = privateImages[Math.floor(Math.random() * privateImages.length)];
            setRandomGuestImage(randomPrivateImage);
        }
    }, [isGuest, question]);

    return (
        <Box sx={{ ...flexAlignRow, alignItems: "flex-start" }}>
            <Box
                component="img"
                src={randomGuestImage}
                alt="Charakter"
                sx={{
                    gridRow: "1 / span 2",
                    maxWidth: 80,
                    height: "100%",
                    objectFit: "contain",
                    paddingRight: 2,
                    paddingBottom: 2
                }}
            />
            <Box
                sx={{
                    position: "relative",
                    backgroundColor: lightBlue,
                    borderRadius: 4,
                    paddingX: 1,
                    paddingY: 3,
                    maxWidth: "90%",
                    overflow: "visible",
                    "&::after": {
                        content: '""',
                        position: "absolute",
                        top: 16,
                        left: -10,
                        width: 0,
                        height: 0,
                        border: "10px solid transparent",
                        borderRightColor: lightBlue,
                        borderLeft: 0
                    }
                }}
            >
                <Typography sx={{ opacity: 0 }}>{question}</Typography>
                <GenerativeText
                    sx={{ position: "absolute", top: 12, left: 16, right: 16 }}
                    question={question}
                    typingSpeed={typingSpeed}
                />
            </Box>
        </Box>
    );
};

export default QuestionBubble;
