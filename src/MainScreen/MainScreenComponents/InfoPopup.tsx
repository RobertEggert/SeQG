import { Paper, Typography } from "@mui/material";
import type { RefObject } from "react";

const InfoPopup = ({ ref }: { ref: RefObject<HTMLDivElement | null> }) => {
    return (
        <Paper
            ref={ref}
            elevation={4}
            sx={{
                display: "flex",
                flexDirection: "column",
                position: "fixed",
                top: 80,
                right: 16,
                width: 300,
                padding: 2,
                backgroundColor: "#222",
                color: "white",
                zIndex: 1000,
                borderRadius: 2
            }}
        >
            <Typography
                display="flex"
                justifyContent="center"
                variant="h5"
                gutterBottom
            >
                Mode Definition
            </Typography>
            <Typography variant="h4" paddingBottom={2}>
                Guest Mode
                <Typography variant="body2">
                    In the Guest Mode you are fully anonymous. Your questions
                    are based on your self assessment.
                </Typography>
            </Typography>

            <Typography variant="h4" paddingBottom={2}>
                Private Mode
                <Typography variant="body2">
                    In Private Mode your answers train the LLM to create
                    Questions just for you.
                </Typography>
            </Typography>
        </Paper>
    );
};

export default InfoPopup;
