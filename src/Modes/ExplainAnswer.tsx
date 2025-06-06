import { useEffect, type Dispatch, type SetStateAction } from "react";
import { fetchExplanationFromLLMShortTerm } from "../utils/LLMFetcher";
import { Box, Typography } from "@mui/material";
import LoadingData from "./LoadingData";
import type {
    ExplainStateType,
    QuestionStateType
} from "./Guest/GuestLLMQuestions";

type ExplainAnswerType = {
    setExplanationState: Dispatch<SetStateAction<ExplainStateType>>;
    explanationState: ExplainStateType;
    questionState: QuestionStateType;
    age?: string | null;
    experience?: number | null;
};

const ExplainAnswer = ({
    setExplanationState,
    explanationState,
    questionState,
    age,
    experience
}: ExplainAnswerType) => {
    useEffect(() => {
        if (explanationState.e_fetch && questionState.q_data) {
            const { question, options, correctIndex } = questionState.q_data;
            // safe to use them here
            fetchExplanationFromLLMShortTerm({
                setExplanationState,
                age,
                experience,
                question,
                options,
                correctIndex
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [explanationState.e_fetch]);

    return explanationState.e_fetch ? (
        <LoadingData />
    ) : (
        <Box sx={{ mt: 4 }}>
            <Typography>{explanationState.e_data?.explain}</Typography>
        </Box>
    );
};

export default ExplainAnswer;
