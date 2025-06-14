import { Typography, Box, Button } from "@mui/material";
import type { QuestionTypeProps } from "../LLMInteraction/QuestionTypeRecognizer";
import { sendAnswerToLLMBackend } from "../../utils/LLMAnswerSaver";

const SingleChoiceEvent = ({
    handleNextQButtonClick,
    setExplanationState,
    setAnswerCorrect,
    questionState,
    explanationState,
    answerCorrect,
    userId
}: QuestionTypeProps) => {
    const handleAnswerClick = (answerClicked: number) => {
        const isCorrect =
            questionState.q_data?.correctAnswer_s.includes(answerClicked);
        // THIS IF STATEMENT HAS TO BE A EXPORTET FUNCTION --> USED MULTIPLE TIMES!
        if (isCorrect) {
            console.log(userId);
            if (userId)
                sendAnswerToLLMBackend(
                    true,
                    userId,
                    questionState.q_data?.topic ?? "NO_TOPIC"
                );
            setAnswerCorrect(true);
            setTimeout(() => {
                handleNextQButtonClick();
            }, 2000);
            return;
        } else {
            if (userId)
                sendAnswerToLLMBackend(
                    false,
                    userId,
                    questionState.q_data?.topic ?? "NO_TOPIC"
                );

            setAnswerCorrect(false);
            setExplanationState({ e_fetch: true, e_data: null });
        }
    };

    const isDisabled =
        explanationState.e_data !== null ||
        explanationState.e_fetch ||
        answerCorrect === true;

    return (
        <>
            <Typography variant="h6">
                {questionState.q_data?.question}
            </Typography>
            <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
                {questionState.q_data?.option_s.map((option, index) => (
                    <Button
                        key={index}
                        variant="outlined"
                        disabled={isDisabled}
                        onClick={() => handleAnswerClick(index)}
                    >
                        {option}
                    </Button>
                ))}
            </Box>
        </>
    );
};

export default SingleChoiceEvent;
