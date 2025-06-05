import { Box, Typography, Button } from "@mui/material";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import {
    fetchQuestionFromLLM,
    type LLM_API_Explanation_Type,
    type LLM_API_Question_Type
} from "../utils/LLMFetcher";
import LoadingData from "./LoadingData";

type GetQuestionType = {
    setQData: Dispatch<SetStateAction<LLM_API_Question_Type | null>>;
    setQFetch: Dispatch<SetStateAction<boolean>>;
    setEData: Dispatch<SetStateAction<LLM_API_Explanation_Type | null>>;
    setEFetch: Dispatch<SetStateAction<boolean>>;
    age?: string | null;
    experience?: number | null;
    q_fetch: boolean;
    q_data: LLM_API_Question_Type | null;
    e_fetch: boolean;
    e_data: LLM_API_Explanation_Type | null;
};

const GetQuestion = ({
    setQData,
    setQFetch,
    setEData,
    setEFetch,
    q_fetch,
    q_data,
    e_fetch,
    e_data,
    age,
    experience
}: GetQuestionType) => {
    useEffect(() => {
        if (age && experience) {
            setQFetch(true);
        }
    }, [age, experience]);

    useEffect(() => {
        if (q_fetch) {
            fetchQuestionFromLLM({ setQData, setQFetch, age, experience });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [q_fetch]);

    const ShowResponse = (answerClicked: number) => {
        const checkCorrectness = answerClicked === q_data?.correctIndex;
        console.log(checkCorrectness);
        if (!checkCorrectness) {
            setEFetch(true);
            setEData({ explain: "" }); // dirty fix for rerender
            return <Typography sx={{ mt: 2 }}>❌ Incorrect.</Typography>;
        }
        return <Typography sx={{ mt: 2 }}>✅ Correct!</Typography>;
    };

    return q_fetch ? (
        <LoadingData />
    ) : (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6">{q_data?.question}</Typography>
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                {q_data?.options.map((option, index) => (
                    <Button
                        key={index}
                        variant="outlined"
                        disabled={e_data !== null || e_fetch}
                        onClick={() => ShowResponse(index)}
                    >
                        {option}
                    </Button>
                ))}
            </Box>
        </Box>
    );
};

export default GetQuestion;
