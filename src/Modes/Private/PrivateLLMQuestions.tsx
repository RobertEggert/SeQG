import {
    Box,
    Typography,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import { useEffect, useState } from "react";
import AgeExpreience from "../AgeExperience";
import ExplainAnswer from "../ExplainAnswer";
import Question from "../Question";
import NextQuestion from "../NextQuestion";
import {
    type QuestionStateType,
    type ExplainStateType,
    fetchUserData
} from "../../utils/LLMFetcher";

const PrivateLLMQuestions = ({ userId }: { userId: string }) => {
    const [age, setAge] = useState<string | null>(null);
    const [experience, setExperience] = useState<number | null>(null);
    const [answerCorrect, setAnswerCorrect] = useState<boolean | null>(null);
    const [isProfileSubmitted, setIsProfileSubmitted] = useState(false);
    const [openDialog, setOpenDialog] = useState(false); // State for dialog

    const [questionState, setQuestionState] = useState<QuestionStateType>({
        q_fetch: false,
        q_data: null
    });
    const [explanationState, setExplanationState] = useState<ExplainStateType>({
        e_fetch: false,
        e_data: null
    });

    const handleNextQButtonClick = () => {
        setAnswerCorrect(null);
        setQuestionState({ q_fetch: true, q_data: null });
        setExplanationState({ e_fetch: false, e_data: null });
    };

    const handleContinueClick = () => {
        if (age && experience) {
            setOpenDialog(true); // Open dialog instead of submitting directly
        }
    };

    const handleDialogConfirm = () => {
        setIsProfileSubmitted(true);
        setQuestionState({ q_fetch: true, q_data: null });
        setOpenDialog(false);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    useEffect(() => {
        const getUserData = async (userId: string) => {
            const userData = await fetchUserData(userId);
            if (userData.age !== null && userData.experience !== null) {
                setAge(userData.age);
                setExperience(userData.experience);
                setIsProfileSubmitted(true);
                setQuestionState({ q_fetch: true, q_data: null }); // Auto-submit if data exists
            }
        };

        if (age === null && experience === null) {
            getUserData(userId);
        }
    }, [userId, age, experience]);

    return (
        <>
            <Box sx={{ p: 3 }}>
                {/* Ask about age and experience */}
                {(!age || !experience || !isProfileSubmitted) && (
                    <>
                        <Typography color="green">✅ Connected</Typography>
                        <AgeExpreience
                            age={age}
                            experience={experience}
                            setAge={setAge}
                            setExperience={setExperience}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={!age || !experience}
                            onClick={handleContinueClick}
                            style={{ marginTop: "16px" }}
                        >
                            Continue
                        </Button>
                    </>
                )}

                {/* Confirmation Dialog */}
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
                            By submitting your age and experience, you allow the
                            LLM to process it so that we can offer you a more
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

                {/* Question */}
                <Question
                    handleNextQButtonClick={handleNextQButtonClick}
                    setAnswerCorrect={setAnswerCorrect}
                    answerCorrect={answerCorrect}
                    setQuestionState={setQuestionState}
                    setExplanationState={setExplanationState}
                    questionState={questionState}
                    explanationState={explanationState}
                    age={age}
                    experience={experience}
                    userId={userId}
                />
                {/* Explanation if wrongfully answered */}
                <ExplainAnswer
                    setExplanationState={setExplanationState}
                    questionState={questionState}
                    explanationState={explanationState}
                    age={age}
                    experience={experience}
                />
            </Box>

            {/* Refetching Question */}
            <NextQuestion
                handleNextQButtonClick={handleNextQButtonClick}
                questionState={questionState}
                explanationState={explanationState}
                answerCorrect={answerCorrect}
                age={age}
                experience={experience}
            />
        </>
    );
};

export default PrivateLLMQuestions;
