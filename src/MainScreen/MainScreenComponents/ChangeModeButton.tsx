import { IconButton, Box, Typography } from "@mui/material";
import FadedComponent from "../../utils/FadedComponent";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

type ChangeModeButtonProps = {
    handleModeSwitch: () => void;
    enteringMode: boolean | null;
};

const ChangeModeButton = ({
    handleModeSwitch,
    enteringMode
}: ChangeModeButtonProps) => {
    return (
        <FadedComponent
            unmountOnExit
            mountOnEnter
            externalFade={enteringMode !== null ? enteringMode : undefined}
            timeout={2000}
            fadeTime={1000}
        >
            <IconButton
                onClick={handleModeSwitch}
                sx={{
                    border: "1px solid #bdbdbd",
                    backgroundColor: "white",
                    borderRadius: 5,
                    width: "20rem"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
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
