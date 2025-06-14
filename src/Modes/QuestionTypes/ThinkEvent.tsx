import {
    Typography,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress
} from "@mui/material";
import type { QuestionTypeProps } from "../LLMInteraction/QuestionTypeRecognizer";
import { sendAnswerToLLMBackend } from "../../utils/LLMAnswerSaver";
import { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import { flexAlignColumn } from "../../styling/theme";

const ThinkEvent = ({
    handleNextQButtonClick,
    setExplanationState,
    setAnswerCorrect,
    questionState,
    explanationState,
    answerCorrect,
    userId
}: QuestionTypeProps) => {
    const TOTAL_TIME = 15;
    const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        if (timeLeft <= 0) {
            setShowAnswer(true);
            return;
        }

        const timer = setTimeout(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]);

    const handleUserResponse = (knewAnswer: boolean) => {
        if (userId) {
            sendAnswerToLLMBackend(
                knewAnswer,
                userId,
                questionState.q_data?.topic ?? "NO_TOPIC"
            );
        }

        setAnswerCorrect(knewAnswer);

        if (knewAnswer) {
            setTimeout(() => {
                handleNextQButtonClick();
            }, 2000);
            return;
        }
        setExplanationState({ e_fetch: true, e_data: null });
    };

    const isDisabled =
        explanationState.e_data !== null ||
        explanationState.e_fetch ||
        answerCorrect === true;

    return (
        <Box sx={{ textAlign: "center", marginTop: 4 }}>
            <Typography variant="h6" gutterBottom>
                {questionState.q_data?.question}
            </Typography>
            <ReactCardFlip isFlipped={showAnswer} flipDirection="horizontal">
                {/* THINKING */}
                <Box
                    sx={{
                        ...flexAlignColumn,
                        gap: 2
                    }}
                >
                    <Card
                        elevation={4}
                        sx={{
                            marginTop: 3,
                            minWidth: 400,
                            backgroundColor: "#f5f5f5"
                        }}
                    >
                        <CardContent>
                            <Typography variant="body1">
                                Take your time to think…
                            </Typography>
                            <CircularProgress
                                variant="determinate"
                                value={
                                    ((TOTAL_TIME - timeLeft) / TOTAL_TIME) * 100
                                }
                                sx={{ marginTop: 2 }}
                            />
                            <Typography
                                variant="caption"
                                display="block"
                                sx={{ marginTop: 1 }}
                            >
                                Revealing answer in {timeLeft} second
                                {timeLeft !== 1 ? "s" : ""}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>

                {/* ANSWER */}
                <Box
                    sx={{
                        ...flexAlignColumn,
                        gap: 2
                    }}
                >
                    <Card
                        elevation={4}
                        sx={{
                            marginTop: 3,
                            minWidth: 400,
                            bgcolor: "#f5f5f5"
                        }}
                    >
                        <CardContent>
                            <Typography variant="subtitle1">Answer:</Typography>
                            <Typography variant="body1">
                                {
                                    questionState.q_data?.option_s[
                                        questionState.q_data
                                            ?.correctAnswer_s?.[0] ?? 0
                                    ]
                                }
                            </Typography>
                        </CardContent>
                    </Card>
                    <Box>
                        <Typography variant="body1" gutterBottom>
                            Did you know the answer?
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                gap: 2
                            }}
                        >
                            <Button
                                disabled={isDisabled}
                                variant="contained"
                                color="success"
                                onClick={() => handleUserResponse(true)}
                            >
                                Yes
                            </Button>
                            <Button
                                disabled={isDisabled}
                                variant="contained"
                                color="error"
                                onClick={() => handleUserResponse(false)}
                            >
                                No
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </ReactCardFlip>
        </Box>
    );
};

export default ThinkEvent;
