import { Box, Typography, Button, Paper, Fade } from "@mui/material";
import { disconnectClientLLM } from "../utils/LLMDisconnector";
import { flexAllCenter } from "../styling/theme";

const WelcomeToModeScreen = ({ session, mode }: { session: string; mode: "Private" | "Guest" }) => {
    const handleDisconnect = async () => {
        const result = await disconnectClientLLM(session);
        if (result.status === "disconnected") {
            alert("Disconnected successfully!");
        } else {
            alert("Something went wrong.");
        }
    };

    return (
        <Box
            sx={{
                ...flexAllCenter,
                position: "fixed",
                width: "100%",
                height: "100%",
                background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
                padding: 2,
                zIndex: 0
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: 4,
                    padding: 5,
                    textAlign: "center",
                    color: "white"
                }}
            >
                <Fade in timeout={1500}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Welcome to {mode} Mode
                    </Typography>
                </Fade>
                <Fade in timeout={5000}>
                    <Typography sx={{ paddingBottom: 4 }}>
                        You can now use the Display. Please enter your age and experience to begin.
                    </Typography>
                </Fade>
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
