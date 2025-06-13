import { IconButton, Box, Typography } from "@mui/material";
import FadedComponent from "../../utils/FadedComponent";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { flexAlignColumn } from "../../styling/theme";

type ChangeModeButtonProps = {
    handleModeSwitch: () => void;
    enteringMode: boolean;
};

const ChangeModeButton = ({
    handleModeSwitch,
    enteringMode
}: ChangeModeButtonProps) => {
    return (
        <FadedComponent
            unmountOnExit
            mountOnEnter
            externalFade={!enteringMode ? undefined : enteringMode}
            timeout={1500}
            fadeTime={1000}
        >
            <IconButton
                onClick={handleModeSwitch}
                sx={{
                    border: "1px solid #bdbdbd",
                    backgroundColor: "white",

                    borderRadius: 5,
                    width: "20rem",
                    "&:hover": {
                        backgroundColor: "white"
                    }
                }}
            >
                <Box
                    sx={{
                        ...flexAlignColumn,
                        paddingRight: 2
                    }}
                >
                    <Typography fontSize={30}>Press or Swipe!</Typography>
                    <Typography>Switch Mode</Typography>
                </Box>
                <DoubleArrowIcon sx={{ fontSize: 50 }} />
            </IconButton>
        </FadedComponent>
    );
};

export default ChangeModeButton;
