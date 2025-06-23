import { Box, Typography } from "@mui/material";
import { flexColumnCenterOfScreen } from "../../styling/theme";

const ClientProhibited = () => {
    return (
        <Box
            sx={{
                ...flexColumnCenterOfScreen,
                padding: 2, // optional padding for small devices
                textAlign: "center" // center text inside Typography
            }}
        >
            <Typography fontSize={40}>
                Joining session prohibited! No host, client already connected or role was invalid
            </Typography>
        </Box>
    );
};

export default ClientProhibited;
