import { Typography, Box } from "@mui/material";
import type { QuestionTypeProps } from "../LLMInteraction/QuestionTypeRecognizer";
import { useState } from "react";
import AnswerHighlighter from "./AnswerHighlighter";
import submitAnswer from "../LLMInteraction/SubmitAnswer";

const SingleChoiceEvent = ({
    handleNextQButtonClick,
    setExplanationState,
    setAnswerCorrect,
    questionState,
    explanationState,
    answerCorrect,
    userId
}: QuestionTypeProps) => {
    const [selectedAnswer_s, setSelectedAnswers] = useState<number[]>([]);
    const [isFeedback, setIsFeedback] = useState(false);
    const correctAnswer_s = questionState.q_data?.correctAnswer_s ?? [];

    const handleSelection = (index: number) => {
        setSelectedAnswers([index]);
        setIsFeedback(true);
        handleSubmit([index]);
    };

    const handleSubmit = (submittedAnswer_s: number[]) => {
        const isCorrect = submittedAnswer_s.every((i) => correctAnswer_s.includes(i));
        submitAnswer(userId, isCorrect, questionState, setAnswerCorrect, setExplanationState, handleNextQButtonClick);
    };

    const isDisabled = explanationState.e_data !== null || explanationState.e_fetch || answerCorrect === true;

    return (
        <>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                {questionState.q_data?.question}
            </Typography>
            <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
                {questionState.q_data?.option_s.map((option, index) => {
                    const isCorrect = correctAnswer_s.includes(index);
                    const isSelected = selectedAnswer_s.includes(index);
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
        </>
    );
};

export default SingleChoiceEvent;
