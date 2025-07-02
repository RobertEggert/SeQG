import { Box, Typography, Button, Paper } from "@mui/material";
import { disconnectClientLLM } from "../utils/LLMDisconnector";

const WelcomeToModeScreen = ({ session, mode }: { session: string; mode: "Private" | "Guest" }) => {
    const handleDisconnect = async () => {
        const result = await disconnectClientLLM(session);
        console.log("Disconnect result:", result.status);
        if (result.status === "disconnected") {
            alert("Disconnected successfully!");
        } else {
            alert("Something went wrong.");
        }
    };

    return (
        <Box
            sx={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100vw",
                height: "100vh",
                background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 2,
                zIndex: 0
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    backdropFilter: "blur(10px)",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: 4,
                    padding: { xs: 3, md: 6 },
                    maxWidth: 500,
                    width: "100%",
                    textAlign: "center",
                    color: "white"
                }}
            >
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Welcome to {mode} Mode
                </Typography>
                <Typography variant="body1" mb={4}>
                    You can now use the Display. Please enter your age and experience to begin.
                </Typography>
                <Button
                    variant="contained"
                    color="error"
                    size="large"
                    onClick={handleDisconnect}
                    sx={{ borderRadius: 2 }}
                >
                    Disconnect Session
                </Button>
            </Paper>
        </Box>
    );
};

export default WelcomeToModeScreen;
