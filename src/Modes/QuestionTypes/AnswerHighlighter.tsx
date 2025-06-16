import React from "react";
import { Box } from "@mui/material";

type Props = {
    children: React.ReactNode;
    isSelected: boolean;
    isCorrect: boolean;
    showFeedback: boolean;
};

const AnswerHighlighter = ({
    children,
    isSelected,
    isCorrect,
    showFeedback
}: Props) => {
    let borderColor = "transparent";

    if (showFeedback) {
        if (isCorrect) {
            borderColor = "green";
        } else if (isSelected) {
            borderColor = "red";
        }
    }

    return (
        <Box
            sx={{
                border: `2px solid ${borderColor}`,
                borderRadius: "8px",
                padding: 2,
                marginBottom: 1
            }}
        >
            {children}
        </Box>
    );
};

export default AnswerHighlighter;
