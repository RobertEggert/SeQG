import { Button } from "@mui/material";
import type { MODES } from "../MainScreen";

type EnterModeButtonProps = {
    handleClick: () => void;
    mode: MODES;
};

const EnterModeButton = ({ handleClick, mode }: EnterModeButtonProps) => {
    return (
        <Button
            variant="contained"
            onClick={handleClick}
            sx={{
                backgroundColor: "rgba(76, 175, 80, 0.9)",
                color: "white",
                "&:hover": {
                    backgroundColor: "#006400"
                },
                width: "25%",
                fontWeight: "bold",
                borderRadius: 10
            }}
        >
            Enter {mode} mode
        </Button>
    );
};

export default EnterModeButton;
