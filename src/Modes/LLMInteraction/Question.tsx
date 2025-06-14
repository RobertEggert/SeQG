import { Box, Typography } from "@mui/material";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import {
    fetchQuestionFromLLM,
    type ExplainStateType,
    type QuestionStateType
} from "../../utils/LLMFetcher";
import LoadingData from "./LoadingData";
import QuestionTypeRecognizer from "./QuestionTypeRecognizer";
import { flexAlignColumn } from "../styling/theme";

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
    userId?: string; // only when private is entered
};

const IsCorrectComponent = ({
    answerCorrect
}: {
    answerCorrect: boolean | null;
}) => {
    return (
        <>
            {answerCorrect === true && (
                <Typography sx={{ marginTop: 2 }} color="success">
                    ✅ Correct!
                </Typography>
            )}
            {answerCorrect === false && (
                <Typography sx={{ marginTop: 2 }} color="error">
                    ❌ Incorrect.
                </Typography>
            )}
        </>
    );
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
        if (questionState.q_fetch) {
            fetchQuestionFromLLM({ setQuestionState, age, experience });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questionState.q_fetch]);

    console.log(questionState.q_data);

    return questionState.q_fetch ? (
        <LoadingData />
    ) : (
        <Box
            sx={{
                ...flexAlignColumn,
                marginTop: 4
            }}
        >
            <QuestionTypeRecognizer
                handleNextQButtonClick={handleNextQButtonClick}
                setExplanationState={setExplanationState}
                setAnswerCorrect={setAnswerCorrect}
                questionState={questionState}
                explanationState={explanationState}
                answerCorrect={answerCorrect}
                userId={userId}
            />
            <IsCorrectComponent answerCorrect={answerCorrect} />
        </Box>
    );
};

export default Question;
