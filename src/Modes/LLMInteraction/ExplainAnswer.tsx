import { useEffect, type Dispatch, type SetStateAction } from "react";
import {
    fetchExplanationFromLLMShortTerm,
    type ExplainStateType,
    type LLM_API_Question_Type
} from "../../utils/LLMFetcher";
import { Box } from "@mui/material";
import LoadingData from "./LoadingData";
import GenerativeText from "../GenerativeText";

type ExplainAnswerType = {
    setExplanationState: Dispatch<SetStateAction<ExplainStateType>>;
    explanationState: ExplainStateType;
    questionData: LLM_API_Question_Type;
    age?: string | null;
    experience?: number | null;
};

const ExplainAnswer = ({ setExplanationState, explanationState, questionData, age, experience }: ExplainAnswerType) => {
    useEffect(() => {
        if (explanationState.e_fetch && questionData) {
            const { question, option_s, correctAnswer_s, questionType } = questionData;
            // safe to use them here
            fetchExplanationFromLLMShortTerm({
                setExplanationState,
                age,
                experience,
                question,
                option_s,
                correctAnswer_s,
                questionType
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [explanationState.e_fetch]);

    return explanationState.e_fetch ? (
        <LoadingData isQuestion={false} />
    ) : (
        <Box sx={{ marginTop: 4 }}>
            <GenerativeText sx={{ maxWidth: 1000 }} question={explanationState.e_data?.explain ?? ""} />
        </Box>
    );
};

export default ExplainAnswer;
