import { Box, Button } from "@mui/material";
import type { QuestionStateType, ExplainStateType } from "../utils/LLMFetcher";

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
    const isDisabled = questionState.q_data.length === 0 || explanationState.e_fetch || answerCorrect === true;
    return (
        <Box
            sx={{
                display: "flex",
                marginTop: 4,
                right: "12%",
                bottom: "10%",
                position: "fixed"
            }}
        >
            <Button variant="contained" disabled={isDisabled} onClick={handleNextQuestion}>
                {!age || !experience ? "Tell your age and experience first" : "Next question"}
            </Button>
        </Box>
    );
};

export default NextQuestion;
