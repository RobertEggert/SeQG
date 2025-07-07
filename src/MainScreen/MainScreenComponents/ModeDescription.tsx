import { Box, Typography } from "@mui/material";
import type { MODES } from "../MainScreen";
import { flexAlignColumn } from "../..//styling/theme";

type ModeDescriptionProps = {
    mode: MODES;
};

const ModeDescription = ({ mode }: ModeDescriptionProps) => {
    let description = "";

    if (mode === "PRIVATE") {
        description =
            "You are selecting Private Mode, where you will answer questions based on your profile and your performance in different cybersecurity topics";
    } else {
        description =
            "You are selecting Guest Mode, where you will answer cybersecurity questions based on your self assessment";
    }

    return (
        <Box
            sx={{
                ...flexAlignColumn,
                maxWidth: 600,
                padding: 1,
                textAlign: "center",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: 2,
                color: "rgba(255,255,255,0.9)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: 14,
                zIndex: 2
            }}
        >
            <Typography variant="body1">{description}</Typography>
        </Box>
    );
};

export default ModeDescription;
