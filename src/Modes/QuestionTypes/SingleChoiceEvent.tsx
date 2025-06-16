import { Typography, Box, Button } from "@mui/material";
import type { QuestionTypeProps } from "../LLMInteraction/QuestionTypeRecognizer";
import { sendAnswerToLLMBackend } from "../../utils/LLMAnswerSaver";
import AnswerHighlighter from "./AnswerHighlighter";
import { useState } from "react";

const SingleChoiceEvent = ({
    handleNextQButtonClick,
    setExplanationState,
    setAnswerCorrect,
    questionState,
    explanationState,
    answerCorrect,
    userId
}: QuestionTypeProps) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);

    const handleAnswerClick = (answerClicked: number) => {
        setSelectedIndex(answerClicked);
        setShowFeedback(true);
        const isCorrect =
            questionState.q_data?.correctAnswer_s.includes(answerClicked);
        // THIS IF STATEMENT HAS TO BE A EXPORTET FUNCTION --> USED MULTIPLE TIMES!
        if (isCorrect) {
            console.log(userId);
            if (userId)
                sendAnswerToLLMBackend(
                    true,
                    userId,
                    questionState.q_data?.topic ?? "NO_TOPIC"
                );
            setAnswerCorrect(true);
            setTimeout(() => {
                handleNextQButtonClick();
            }, 2000);
            return;
        } else {
            if (userId)
                sendAnswerToLLMBackend(
                    false,
                    userId,
                    questionState.q_data?.topic ?? "NO_TOPIC"
                );

            setAnswerCorrect(false);
            setExplanationState({ e_fetch: true, e_data: null });
        }
    };

    const isDisabled =
        explanationState.e_data !== null ||
        explanationState.e_fetch ||
        answerCorrect === true;

    return (
        <>
            <Typography variant="h6">
                {questionState.q_data?.question}
            </Typography>
            <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
                {questionState.q_data?.option_s.map((option, index) => {
                    let isSelected = selectedIndex === index;
                    let isCorrect = false;

                    if (showFeedback) {
                        const isCorrectIndex =
                            questionState.q_data?.correctAnswer_s.includes(
                                index
                            ) ?? false;
                        const isSelectedIndex = selectedIndex === index;

                        isCorrect = isCorrectIndex;
                        isSelected = isSelectedIndex;

                        if (isSelectedIndex && !isCorrectIndex) {
                            isCorrect = false;
                        }
                    }

                    return (
                        <AnswerHighlighter
                            key={index}
                            isSelected={isSelected}
                            isCorrect={isCorrect}
                            showFeedback={showFeedback}
                        >
                            <Button
                                variant="outlined"
                                disabled={isDisabled}
                                onClick={() => handleAnswerClick(index)}
                                fullWidth
                            >
                                {option}
                            </Button>
                        </AnswerHighlighter>
                    );
                })}
            </Box>
        </>
    );
};

export default SingleChoiceEvent;
