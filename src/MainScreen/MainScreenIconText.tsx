import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography, Box } from "@mui/material";
import type { MODES } from "./MainScreen";

const MainScreenIconText = ({ mode }: { mode: MODES }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1
            }}
        >
            <FontAwesomeIcon
                icon={faLock}
                style={{
                    fontSize: mode === "PRIVATE" ? "3rem" : "1.5rem",
                    transition: "font-size 0.7s ease-in-out"
                }}
            />
            <Typography
                style={{
                    fontSize: mode === "PRIVATE" ? "1.5rem" : "1rem",
                    transition: "font-size 0.8s"
                }}
            >
                {mode}
            </Typography>
        </Box>
    );
};

export default MainScreenIconText;
