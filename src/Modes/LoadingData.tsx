import { Box, CircularProgress } from "@mui/material";
import FadedComponent from "../utils/FadedComponent";
import { flexAlignColumn } from "../styling/theme";
const LOADING_MESSAGES = [
    "Fetching question from the LLM",
    "Waiting for response",
    "AI is generating",
    "Wait until question is loaded"
];

const LoadingData = () => {
    const randomMessage =
        LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];

    return (
        <Box
            sx={{
                ...flexAlignColumn,
                justifyContent: "center",
                paddingTop: 5
            }}
        >
            <CircularProgress size={60} color="secondary" thickness={2} />
            <FadedComponent
                sxBox={{
                    width: "100%",
                    textAlign: "center"
                }}
            >
                {randomMessage}
            </FadedComponent>
        </Box>
    );
};

export default LoadingData;
