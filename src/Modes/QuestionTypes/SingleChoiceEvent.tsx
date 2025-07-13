import { Box } from "@mui/material";
import type { QuestionTypeProps } from "../LLMInteraction/QuestionTypeRecognizer";
import { useState } from "react";
import AnswerHighlighter from "./AnswerHighlighter";
import submitAnswer from "../LLMInteraction/AnswerHandeling";
import QuestionBubble from "../LLMInteraction/QuestionBubble";
import { flexAlignColumn } from "../../styling/theme";
const SingleChoiceEvent = ({
    handleNextQuestion,
    setExplanationState,
    setAnswerCorrect,
    questionData,
    explanationState,
    answerCorrect,
    userId
}: QuestionTypeProps) => {
    const [selectedAnswer_s, setSelectedAnswers] = useState<number[]>([]);
    const [isFeedback, setIsFeedback] = useState(false);
    const correctAnswer_s = questionData?.correctAnswer_s ?? [];

    const handleSelection = (index: number) => {
        setSelectedAnswers([index]);
        setIsFeedback(true);
        handleSubmit([index]);
    };

    const handleSubmit = (submittedAnswer_s: number[]) => {
        const isCorrect = submittedAnswer_s.every((i) => correctAnswer_s.includes(i));
        submitAnswer(userId, isCorrect, questionData, setAnswerCorrect, setExplanationState, handleNextQuestion);
    };

    const isDisabled = explanationState.e_data !== null || explanationState.e_fetch || answerCorrect === true;

    return (
        <Box
            sx={{
                ...flexAlignColumn,
                gap: 2
            }}
        >
            <QuestionBubble question={questionData?.question ?? ""} />

            <Box
                sx={{
                    gridColumn: 2,
                    gridRow: 2,
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 2,
                    marginTop: 2
                }}
            >
                {questionData?.option_s.map((option, index) => {
                    const isCorrect = correctAnswer_s.includes(index);
                    const isSelected = selectedAnswer_s.includes(index);
                    return (
                        <AnswerHighlighter
                            key={index}
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
        </Box>
    );
};

export default SingleChoiceEvent;
