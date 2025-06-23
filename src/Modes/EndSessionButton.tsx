import { Box, Button } from "@mui/material";
import { disconnectClientLLM } from "../utils/LLMDisconnector";

const EndSessionButton = ({ session }: { session: string }) => {
    return (
        <Box
            sx={{
                display: "flex",
                marginTop: 4,
                left: "12%",
                bottom: "10%",
                position: "fixed"
            }}
        >
            <Button variant="contained" onClick={() => disconnectClientLLM(session)}>
                END SESSION
            </Button>
        </Box>
    );
};

export default EndSessionButton;
