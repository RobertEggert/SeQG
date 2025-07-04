import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box } from "@mui/material";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { QuestionStateType } from "../../utils/LLMFetcher";
import { useNavigate } from "@tanstack/react-router";
import { sendAgeAndExperiencePrivate } from "../../utils/LLMSaver";

type ConfirmDialogProps = {
    setIsProfileSubmitted: Dispatch<SetStateAction<boolean>>;
    setQuestionState: Dispatch<SetStateAction<QuestionStateType>>;
    age: string | null;
    experience: number | null;
    isPriv: boolean;
    userId?: string;
};

const ConfirmDialog = ({
    setIsProfileSubmitted,
    setQuestionState,
    age,
    experience,
    isPriv,
    userId
}: ConfirmDialogProps) => {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);

    const handleNavGuestmode = () => {
        handleDialogClose();
        navigate({ to: "/host-mode/guest" });
    };

    const handleDialogConfirm = () => {
        setIsProfileSubmitted(true);
        setQuestionState({ q_fetch: true, q_data: [] });
        if (age && experience && userId && userId !== "") sendAgeAndExperiencePrivate(age, experience, userId);
        setOpenDialog(false);
    };

    const handleContinueClick = () => {
        if (age && experience) {
            setOpenDialog(true);
        }
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                disabled={!age || !experience}
                onClick={handleContinueClick}
                style={{ marginTop: "16px" }}
            >
                Continue
            </Button>
            <Dialog
                open={openDialog}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Age and Experience Consent</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        By submitting your age and experience, you allow the LLM to process it so that we can offer you
                        a more personalised experience.
                        <br />
                        Do you allow to use them?
                        {isPriv &&
                            "\tYou are currently in the private Mode, which saves your age and experience for one month server side. Do you wish to instead go to Guest mode?"}
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box>{isPriv && <Button onClick={handleNavGuestmode}>Return to Guest mode</Button>}</Box>
                    <Box>
                        <Button onClick={handleDialogClose}>NO</Button>
                        <Button onClick={handleDialogConfirm}>YES</Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ConfirmDialog;
