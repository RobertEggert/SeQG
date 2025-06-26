import { useEffect, type Dispatch, type SetStateAction } from "react";
import {
    fetchExplanationFromLLMShortTerm,
    type ExplainStateType,
    type QuestionStateType
} from "../../utils/LLMFetcher";
import { Box, Typography } from "@mui/material";
import LoadingData from "./LoadingData";

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
            const { question, option_s, correctAnswer_s } = questionState.q_data[0]; // ensurance that the first element is always used
            // safe to use them here
            fetchExplanationFromLLMShortTerm({
                setExplanationState,
                age,
                experience,
                question,
                option_s,
                correctAnswer_s
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [explanationState.e_fetch]);

    return explanationState.e_fetch ? (
        <LoadingData isQuestion={false} />
    ) : (
        <Box sx={{ marginTop: 4 }}>
            <Typography>{explanationState.e_data?.explain}</Typography>
        </Box>
    );
};

export default ExplainAnswer;
