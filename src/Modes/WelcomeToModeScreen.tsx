import { Box, Typography, Button } from "@mui/material";
import { flexColumnCenterOfScreen } from "../styling/theme";
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
                ...flexColumnCenterOfScreen,
                gap: 5, // spacing between children
                padding: 2, // optional padding for small devices
                textAlign: "center" // center text inside Typography
            }}
        >
            <Typography fontSize={40}>Client! Welcome to the {mode} Mode!</Typography>
            <Button variant="contained" onClick={handleDisconnect}>
                DISCONNECT SESSION
            </Button>
        </Box>
    );
};

export default WelcomeToModeScreen;
