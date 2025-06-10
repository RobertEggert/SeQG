import { Box, Typography, Button } from "@mui/material";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { fetchQuestionFromLLM } from "../utils/LLMFetcher";
import LoadingData from "./LoadingData";
import type {
    ExplainStateType,
    QuestionStateType
} from "./Guest/GuestLLMQuestions";
import { sendAnswerToLLMBackend } from "../utils/LLMAnswerSaver";

type QuestionType = {
    handleNextQButtonClick: () => void;
    setQuestionState: Dispatch<SetStateAction<QuestionStateType>>;
    setExplanationState: Dispatch<SetStateAction<ExplainStateType>>;
    setAnswerCorrect: Dispatch<SetStateAction<boolean | null>>;
    questionState: QuestionStateType;
    explanationState: ExplainStateType;
    age?: string | null;
    experience?: number | null;
    answerCorrect: boolean | null;
    userId?: string;
};

const Question = ({
    handleNextQButtonClick,
    setQuestionState,
    setExplanationState,
    setAnswerCorrect,
    questionState,
    explanationState,
    answerCorrect,
    age,
    experience,
    userId
}: QuestionType) => {
    useEffect(() => {
        if (age && experience) {
            setQuestionState({ q_fetch: true, q_data: null });
        }
    }, [age, experience, setQuestionState]);

    useEffect(() => {
        if (questionState.q_fetch) {
            fetchQuestionFromLLM({ setQuestionState, age, experience });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questionState.q_fetch]);

    const handleAnswerClick = (answerClicked: number) => {
        const isCorrect = answerClicked === questionState.q_data?.correctIndex;
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

    return questionState.q_fetch ? (
        <LoadingData />
    ) : (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6">
                {questionState.q_data?.question}
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                {questionState.q_data?.options.map((option, index) => (
                    <Button
                        key={index}
                        variant="outlined"
                        disabled={
                            explanationState.e_data !== null ||
                            explanationState.e_fetch ||
                            answerCorrect === true
                        }
                        onClick={() => handleAnswerClick(index)}
                    >
                        {option}
                    </Button>
                ))}
            </Box>
            {answerCorrect === true && (
                <Typography sx={{ mt: 2 }} color="success">
                    ✅ Correct!
                </Typography>
            )}
            {answerCorrect === false && (
                <Typography sx={{ mt: 2 }} color="error">
                    ❌ Incorrect.
                </Typography>
            )}
        </Box>
    );
};

export default Question;
