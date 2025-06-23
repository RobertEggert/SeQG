import { Box, Typography } from "@mui/material";
import { flexColumnCenterOfScreen } from "../../styling/theme";

const HostProhibited = () => {
    return (
        <Box
            sx={{
                ...flexColumnCenterOfScreen,
                padding: 2, // optional padding for small devices
                textAlign: "center" // center text inside Typography
            }}
        >
            <Typography fontSize={40}>Joining session prohibited! Host already connected</Typography>
        </Box>
    );
};

export default HostProhibited;
