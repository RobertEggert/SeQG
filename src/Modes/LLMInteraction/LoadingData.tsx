import { Box, CircularProgress } from "@mui/material";
import { flexAlignColumn } from "../../styling/theme";
import FadedTextChanger from "../../utils/FadedTextChanger";
const LOADING_MESSAGES_QUESTION = [
    "Fetching question from the LLM",
    "Waiting for response",
    "AI is generating",
    "Wait until question is loaded"
];

const LOADING_MESSAGES_EXPLAIN = [
    "Fetching explanation from the LLM",
    "Waiting for response",
    "AI is generating",
    "Wait until explanation is loaded"
];

const LoadingData = ({ isQuestion }: { isQuestion: boolean }) => {
    return (
        <Box
            sx={{
                ...flexAlignColumn,
                justifyContent: "center",
                paddingTop: 5
            }}
        >
            <CircularProgress size={60} color="secondary" thickness={2} />
            <FadedTextChanger textArray={isQuestion ? LOADING_MESSAGES_QUESTION : LOADING_MESSAGES_EXPLAIN} />
        </Box>
    );
};

export default LoadingData;
