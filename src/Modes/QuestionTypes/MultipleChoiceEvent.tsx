import { Typography, Box, Button } from "@mui/material";
import type { QuestionTypeProps } from "../QuestionTypeRecognizer";
import { sendAnswerToLLMBackend } from "../../utils/LLMAnswerSaver";
import { useState } from "react";

const MultipleChoiceEvent = ({
    handleNextQButtonClick,
    setExplanationState,
    setAnswerCorrect,
    questionState,
    explanationState,
    answerCorrect,
    userId
}: QuestionTypeProps) => {
    const options = questionState.q_data?.option_s ?? [];
    const correctAnswers = questionState.q_data?.correctAnswer_s ?? [];

    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

    const toggleSelection = (index: number) => {
        setSelectedIndices((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };

    const handleSubmit = () => {
        const isCorrect = selectedIndices.every((i) =>
            correctAnswers.includes(i)
        );

        if (userId) {
            sendAnswerToLLMBackend(
                isCorrect,
                userId,
                questionState.q_data?.topic ?? "NO_TOPIC"
            );
        }

        setAnswerCorrect(isCorrect);

        if (isCorrect) {
            setTimeout(() => {
                handleNextQButtonClick();
            }, 2000);
        } else {
            setExplanationState({ e_fetch: true, e_data: null });
        }
    };

    const isDisabled =
        explanationState.e_data !== null ||
        explanationState.e_fetch ||
        answerCorrect === true;

    return (
        <>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                {questionState.q_data?.question}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, marginBottom: 2 }}>
                {options.map((option, index) => {
                    const isSelected = selectedIndices.includes(index);
                    return (
                        <Button
                            key={index}
                            variant={isSelected ? "contained" : "outlined"}
                            color={isSelected ? "primary" : "inherit"}
                            onClick={() => toggleSelection(index)}
                            disabled={isDisabled}
                        >
                            {option}
                        </Button>
                    );
                })}
            </Box>
            <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={selectedIndices.length === 0 || isDisabled}
            >
                Submit Answer
            </Button>
        </>
    );
};

export default MultipleChoiceEvent;
