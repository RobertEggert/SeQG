import { Box, CircularProgress } from "@mui/material";
import FadedComponent from "../utils/FadedComponent";
import { flexAlignColumn } from "../styling/theme";

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
            <FadedComponent
                sxBox={{
                    width: "100%",
                    textAlign: "center"
                }}
            >
                Fetching Question
            </FadedComponent>
        </Box>
    );
};

export default LoadingData;
