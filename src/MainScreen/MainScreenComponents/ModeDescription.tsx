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
            "You are selecting Private Mode, where your experience will be based on your profile and performance";
    } else {
        description = "You are selecting Guest Mode, where your experience will be based on your self assessment";
    }

    return (
        <Box
            sx={{
                ...flexAlignColumn,
                mt: 3,
                px: 3,
                py: 2,
                maxWidth: 600,
                mx: "auto",
                textAlign: "center",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: 2,
                color: "rgba(255,255,255,0.9)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: { xs: 14, sm: 16 },
                userSelect: "none",
                position: "relative",
                zIndex: 2
            }}
        >
            <Typography variant="body1">{description}</Typography>
        </Box>
    );
};

export default ModeDescription;
