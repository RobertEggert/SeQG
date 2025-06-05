import { useEffect, type Dispatch, type SetStateAction } from "react";
import {
    fetchExplanationFromLLMShortTerm,
    type LLM_API_Explanation_Type,
    type LLM_API_Question_Type
} from "../utils/LLMFetcher";
import { Box, Typography } from "@mui/material";
import LoadingData from "./LoadingData";

type ExplainAnswerType = {
    setEData: Dispatch<SetStateAction<LLM_API_Explanation_Type | null>>;
    setEFetch: Dispatch<SetStateAction<boolean>>;
    e_fetch: boolean;
    e_data: LLM_API_Explanation_Type | null;
    q_data: LLM_API_Question_Type | null;
    age?: string | null;
    experience?: number | null;
};

const ExplainAnswer = ({
    setEData,
    setEFetch,
    e_fetch,
    e_data,
    q_data,
    age,
    experience
}: ExplainAnswerType) => {
    useEffect(() => {
        if (e_fetch && q_data) {
            const { question, options, correctIndex } = q_data;
            // safe to use them here
            fetchExplanationFromLLMShortTerm({
                setEData,
                setEFetch,
                age,
                experience,
                question,
                options,
                correctIndex
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [e_fetch]);

    return e_fetch ? (
        <LoadingData />
    ) : (
        <Box sx={{ mt: 4 }}>
            <Typography>{e_data?.explain}</Typography>
        </Box>
    );
};

export default ExplainAnswer;
