import { Box } from "@mui/material";

const ClientProhibited = () => {
    return (
        <Box>
            <h1>Joining session prohibited! No host, client already connected or role was invalid</h1>
        </Box>
    );
};

export default ClientProhibited;
