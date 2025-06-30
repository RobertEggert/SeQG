import { Box, Button, Card, Typography } from "@mui/material";
import type { QuestionTypeProps } from "../LLMInteraction/QuestionTypeRecognizer";
import { useState } from "react";
import submitAnswer from "../LLMInteraction/AnswerHandeling";
import DeleteIcon from "@mui/icons-material/Delete";
import { flexAlignRow } from "../../styling/theme";

type ConnectedOptions = {
    match: [string, string];
};

const LineConnectEvent = ({
    handleNextQuestion,
    setExplanationState,
    setAnswerCorrect,
    questionData,
    explanationState,
    answerCorrect,
    userId
}: QuestionTypeProps) => {
    const [connectedElements, setConnectedElements] = useState<ConnectedOptions[]>([]);
    const [isFeedback, setIsFeedback] = useState(false);

    const handleSubmit = () => {
        // check if all indexes are connected to the correct ones
        const isCorrect = true;
        setIsFeedback(true);
        submitAnswer(userId, isCorrect, questionData, setAnswerCorrect, setExplanationState, handleNextQuestion);
    };

    const handleFeedbackColor = () => {
        // check if the index is connected to the correct one
        return "white";
    };

    const handleRevert = () => {
        setConnectedElements([]);
    };

    const option_s = questionData.option_s;
    const isDisabled = explanationState.e_data !== null || explanationState.e_fetch || answerCorrect === true;

    const halfPoint = questionData.option_s.length / 2;

    return (
        <>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                {questionData?.question}
            </Typography>
            <Box>
                {/* Probably need a component, which takes in all items, then does the seperation and inside that component
                one will use React Flow so that the lines connect => so all below must be put inside a component */}
                {option_s.map((option, index) => {
                    if (index < halfPoint)
                        return (
                            <Card
                                sx={{ padding: 2, backgroundColor: isFeedback ? handleFeedbackColor() : "white" }}
                                elevation={4}
                            >
                                {option}
                            </Card>
                        );
                    return null;
                })}
                {option_s.map((option, index) => {
                    if (index >= halfPoint)
                        return (
                            <Card
                                sx={{ pading: 2, backgroundColor: isFeedback ? handleFeedbackColor() : "white" }}
                                elevation={4}
                            >
                                {option}
                            </Card>
                        );
                    return null;
                })}
            </Box>
            <Box sx={{ ...flexAlignRow, gap: 2, marginTop: 2 }}>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={isDisabled || connectedElements.length === option_s.length / 2}
                >
                    Submit Answer
                </Button>
                <Button
                    startIcon={<DeleteIcon />}
                    variant="contained"
                    onClick={handleRevert}
                    disabled={isDisabled || connectedElements.length < 1}
                >
                    Revert Answers
                </Button>
            </Box>
        </>
    );
};

export default LineConnectEvent;
