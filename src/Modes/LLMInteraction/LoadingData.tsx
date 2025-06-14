import { Box, CircularProgress } from "@mui/material";
import { flexAlignColumn } from "../../styling/theme";
import FadedTextChanger from "../../utils/FadedTextChanger";
const LOADING_MESSAGES = [
    "Fetching question from the LLM",
    "Waiting for response",
    "AI is generating",
    "Wait until question is loaded"
];

const LoadingData = () => {
    return (
        <Box
            sx={{
                ...flexAlignColumn,
                justifyContent: "center",
                paddingTop: 5
            }}
        >
            <CircularProgress size={60} color="secondary" thickness={2} />
            <FadedTextChanger textArray={LOADING_MESSAGES} />
        </Box>
    );
};

export default LoadingData;
