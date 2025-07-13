import { Box, Button } from "@mui/material";
import type { QuestionStateType, ExplainStateType } from "../utils/LLMFetcher";
import { useEffect, useState } from "react";
import SkipNextIcon from "@mui/icons-material/SkipNext";

type NextQuestionType = {
    handleNextQuestion: () => void;
    questionState: QuestionStateType;
    explanationState: ExplainStateType;
    answerCorrect: boolean | null;
    age: string | null;
    experience: number | null;
};

const NextQuestion = ({
    handleNextQuestion,
    questionState,
    explanationState,
    answerCorrect,
    age,
    experience
}: NextQuestionType) => {
    const [isFakeloader, setIsFakeloader] = useState(true);

    useEffect(() => {
        const currentCount = questionState.q_data?.length ?? 0;

        // brake out of useEffect if NO question is in queue
        if (currentCount < 1) return;
        const timeout = setTimeout(() => {
            setIsFakeloader(false);
        }, 2000);

        return () => clearTimeout(timeout);
    }, [questionState.q_data?.length]);

    const handleNextQuestionClick = () => {
        handleNextQuestion();
        setIsFakeloader(true);
    };

    const isDisabled =
        isFakeloader || questionState.q_data.length === 0 || explanationState.e_fetch || answerCorrect === true;
    return (
        <Box
            sx={{
                position: "absolute",
                bottom: 8,
                right: 8,
                zIndex: 10
            }}
        >
            <Button variant="contained" disabled={isDisabled} onClick={handleNextQuestionClick}>
                {!age || !experience ? "Tell your age and experience first" : <SkipNextIcon />}
            </Button>
        </Box>
    );
};

export default NextQuestion;
