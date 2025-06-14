import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from "@mui/material";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { QuestionStateType } from "../../utils/LLMFetcher";

type ConfirmDialogProps = {
    setIsProfileSubmitted: Dispatch<SetStateAction<boolean>>;
    setQuestionState: Dispatch<SetStateAction<QuestionStateType>>;
    age: string | null;
    experience: number | null;
};

const ConfirmDialog = ({
    setIsProfileSubmitted,
    setQuestionState,
    age,
    experience
}: ConfirmDialogProps) => {
    const [openDialog, setOpenDialog] = useState(false);

    const handleDialogConfirm = () => {
        setIsProfileSubmitted(true);
        setQuestionState({ q_fetch: true, q_data: null });
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
                <DialogTitle id="alert-dialog-title">
                    {"Age and Experience Consent"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        By submitting your age and experience, you allow the LLM
                        to process it so that we can offer you a more
                        personalised experience.
                        <br />
                        Do you allow to use them?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>NO</Button>
                    <Button onClick={handleDialogConfirm} autoFocus>
                        YES
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ConfirmDialog;
