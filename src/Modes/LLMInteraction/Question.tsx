import { Box, Typography } from "@mui/material";
import { useEffect, type Dispatch, type RefObject, type SetStateAction } from "react";
import { fetchQuestionFromLLM, type ExplainStateType, type QuestionStateType } from "../../utils/LLMFetcher";
import LoadingData from "./LoadingData";
import QuestionTypeRecognizer from "./QuestionTypeRecognizer";
import { flexAlignColumn } from "../../styling/theme";

type QuestionType = {
    handleNextQuestion: () => void;
    setQuestionState: Dispatch<SetStateAction<QuestionStateType>>;
    setExplanationState: Dispatch<SetStateAction<ExplainStateType>>;
    setAnswerCorrect: Dispatch<SetStateAction<boolean | null>>;
    questionState: QuestionStateType;
    explanationState: ExplainStateType;
    questionsFetchedRef: RefObject<number>;
    age?: string | null;
    experience?: number | null;
    answerCorrect: boolean | null;
    userId?: string; // only when private is entered
};

const IsCorrectComponent = ({ answerCorrect }: { answerCorrect: boolean | null }) => {
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

const AMOUNT_OF_PREFETCHED_QUESTIONS = 3;

const Question = ({
    handleNextQuestion,
    setQuestionState,
    setExplanationState,
    setAnswerCorrect,
    questionState,
    explanationState,
    questionsFetchedRef,
    answerCorrect,
    age,
    experience,
    userId
}: QuestionType) => {
    useEffect(() => {
        if (questionState.q_fetch && questionsFetchedRef.current < AMOUNT_OF_PREFETCHED_QUESTIONS) {
            fetchQuestionFromLLM({ setQuestionState, age, experience });
            questionsFetchedRef.current += 1;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questionState.q_fetch, questionState.q_data.length]);

    console.log(questionState.q_data);

    return questionState.q_data.length === 0 ? (
        <LoadingData isQuestion={true} />
    ) : (
        <Box
            sx={{
                ...flexAlignColumn,
                marginTop: 2
            }}
        >
            <QuestionTypeRecognizer
                handleNextQuestion={handleNextQuestion}
                setExplanationState={setExplanationState}
                setAnswerCorrect={setAnswerCorrect}
                questionData={questionState.q_data?.[0] ?? []}
                explanationState={explanationState}
                answerCorrect={answerCorrect}
                userId={userId}
            />
            <IsCorrectComponent answerCorrect={answerCorrect} />
        </Box>
    );
};

export default Question;
