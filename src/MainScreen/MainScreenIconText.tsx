import { type IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography, Box } from "@mui/material";
import type { MODES } from "./MainScreen";

const MainScreenIconText = ({
    mode,
    icon,
    iconSize,
    textSize
}: {
    mode: MODES;
    icon: IconDefinition;
    iconSize: string;
    textSize: string;
}) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1
            }}
        >
            <FontAwesomeIcon
                icon={icon}
                style={{
                    fontSize: iconSize,
                    transition: "font-size 0.7s ease-in-out"
                }}
            />
            <Typography
                style={{
                    fontSize: textSize,
                    transition: "font-size 0.8s"
                }}
            >
                {mode}
            </Typography>
        </Box>
    );
};

export default MainScreenIconText;
