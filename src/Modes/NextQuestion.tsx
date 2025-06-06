import { Box, Button } from "@mui/material";
import type {
    ExplainStateType,
    QuestionStateType
} from "./Guest/GuestLLMQuestions";

type NextQuestionType = {
    handleNextQButtonClick: () => void;
    questionState: QuestionStateType;
    explanationState: ExplainStateType;
    answerCorrect: boolean | null;
    age: string | null;
    experience: number | null;
};

const NextQuestion = ({
    handleNextQButtonClick,
    questionState,
    explanationState,
    answerCorrect,
    age,
    experience
}: NextQuestionType) => {
    return (
        <Box
            sx={{
                display: "flex",
                mt: 4,
                right: "12%",
                bottom: "10%",
                position: "fixed"
            }}
        >
            <Button
                variant="contained"
                disabled={
                    questionState.q_data === null ||
                    explanationState.e_fetch ||
                    answerCorrect === true
                }
                onClick={handleNextQButtonClick}
            >
                {!age || !experience
                    ? "Tell age and experience first"
                    : "Next question"}
            </Button>
        </Box>
    );
};

export default NextQuestion;
