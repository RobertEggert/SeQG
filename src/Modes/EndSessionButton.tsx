import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { Dispatch, SetStateAction } from "react";

const EndSessionButton = ({ setShowDashboard }: { setShowDashboard: Dispatch<SetStateAction<boolean>> }) => {
    const handleClick = () => {
        setShowDashboard(true);
    };

    return (
        <Box
            sx={{
                position: "absolute",
                top: 8,
                right: 8,
                zIndex: 10
            }}
        >
            <IconButton
                onClick={handleClick}
                aria-label="End Session"
                sx={{
                    width: 48,
                    height: 48,
                    backgroundColor: "error.main",
                    color: "white",
                    "&:hover": {
                        backgroundColor: "error.dark"
                    },
                    boxShadow: "0px 4px 8px rgba(0,0,0,0.3)"
                }}
            >
                <CloseIcon sx={{ fontSize: 32 }} />
            </IconButton>
        </Box>
    );
};

export default EndSessionButton;
