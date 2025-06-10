import { Button } from "@mui/material";
import type { MODES } from "../MainScreen";

type EnterModeButtonProps = {
    handleClick: () => void;
    mode: MODES;
};

const EnterModeButton = ({ handleClick, mode }: EnterModeButtonProps) => {
    return (
        <Button
            variant="outlined"
            onClick={handleClick}
            sx={{
                borderWidth: 1,
                borderColor: "#bdbdbd",
                color: "darkgrey",
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
