import { Typography, Box, Button } from "@mui/material";
import type { QuestionTypeProps } from "../LLMInteraction/QuestionTypeRecognizer";
import { useState } from "react";
import AnswerHighlighter from "./AnswerHighlighter";
import submitAnswer from "../LLMInteraction/SubmitAnswer";

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

    const [selectedAnswer_s, setSelectedAnswers] = useState<number[]>([]);
    const [isFeedback, setIsFeedback] = useState(false);

    const handleSelection = (index: number) => {
        if (selectedAnswer_s.includes(index)) {
            const removedIndex = selectedAnswer_s.filter((selected) => selected !== index);
            setSelectedAnswers(removedIndex);
        } else {
            setSelectedAnswers([...selectedAnswer_s, index]);
        }
    };

    const handleSubmit = () => {
        setIsFeedback(true);

        const isCorrect =
            selectedAnswer_s.length === correctAnswers.length &&
            selectedAnswer_s.every((i) => correctAnswers.includes(i));

        submitAnswer(userId, isCorrect, questionState, setAnswerCorrect, setExplanationState, handleNextQButtonClick);
    };

    const isDisabled = explanationState.e_data !== null || explanationState.e_fetch || answerCorrect === true;

    return (
        <>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                {questionState.q_data?.question}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, marginBottom: 2 }}>
                {options.map((option, index) => {
                    const isSelected = selectedAnswer_s.includes(index);
                    const isCorrect = correctAnswers.includes(index);
                    return (
                        <AnswerHighlighter
                            index={index}
                            option={option}
                            isDisabled={isDisabled}
                            isFeedback={isFeedback}
                            isCorrect={isCorrect}
                            isSelected={isSelected}
                            handleSelection={handleSelection}
                        />
                    );
                })}
            </Box>
            <Button variant="contained" onClick={handleSubmit} disabled={isDisabled}>
                Submit Answer
            </Button>
        </>
    );
};

export default MultipleChoiceEvent;
