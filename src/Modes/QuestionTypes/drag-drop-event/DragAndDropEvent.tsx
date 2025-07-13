import { Box, Button, Grid, Typography } from "@mui/material";
import type { QuestionTypeProps } from "../../LLMInteraction/QuestionTypeRecognizer";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { useState } from "react";
import DragItem, { type DragItemType } from "./DragItem";
import DropZone from "./DropZone";
import { flexAlignColumn, flexAlignRow, flexAllCenter } from "../../../styling/theme";
import submitAnswer from "../../LLMInteraction/AnswerHandeling";
import DeleteIcon from "@mui/icons-material/Delete";
import QuestionBubble from "../../LLMInteraction/QuestionBubble";

const DragAndDropEvent = ({
    handleNextQuestion,
    setExplanationState,
    setAnswerCorrect,
    questionData,
    explanationState,
    answerCorrect,
    userId
}: QuestionTypeProps) => {
    const [assignments, setAssignments] = useState<number[][]>([[], []]);
    const [isFeedback, setIsFeedback] = useState(false);

    const handleDrop = (item: DragItemType, zone: number) => {
        setAssignments((prev) => {
            const newAssignments = [...prev];
            // Remove item from both zones first
            newAssignments[0] = newAssignments[0].filter((i) => i !== item.index);
            newAssignments[1] = newAssignments[1].filter((i) => i !== item.index);
            // Add to the selected zone
            newAssignments[zone] = [...newAssignments[zone], item.index];
            return newAssignments;
        });
    };

    const handleSubmit = () => {
        const isCorrect = questionData.correctAnswer_s.every((correctZone, itemIndex) => {
            return assignments[correctZone]?.includes(itemIndex);
        });
        setIsFeedback(true);
        submitAnswer(userId, isCorrect, questionData, setAnswerCorrect, setExplanationState, handleNextQuestion);
    };

    const handleFeedbackColor = (index: number) => {
        const correctAnswer_s = questionData.correctAnswer_s;
        if (!assignments[correctAnswer_s[index]]?.includes(index)) {
            return "rgba(255, 0, 0, 0.4)";
        }
        if (assignments[correctAnswer_s[index]] === undefined) {
            return "rgba(255, 0, 0, 0.4)";
        }
        return "white";
    };

    const handleRevert = () => {
        setAssignments([[], []]);
    };

    const option_s = questionData.option_s;
    const isDisabled = explanationState.e_data !== null || explanationState.e_fetch || answerCorrect === true;

    return (
        <>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                <QuestionBubble question={questionData?.question ?? ""} mode={userId ? "PRIVATE" : "GUEST"} />
            </Typography>
            <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
                <Box sx={{ ...flexAllCenter }}>
                    <Grid container sx={{ ...flexAlignColumn }} justifyContent="center" spacing={2}>
                        <Grid sx={{ ...flexAlignRow }}>
                            {option_s.map((opt, i) =>
                                !assignments[0].includes(i) && !assignments[1].includes(i) ? (
                                    <DragItem
                                        key={i}
                                        index={i}
                                        text={opt}
                                        isFeedback={isFeedback}
                                        handleFeedbackColor={handleFeedbackColor}
                                    />
                                ) : null
                            )}
                        </Grid>
                        <Grid sx={{ ...flexAlignRow, gap: 2 }}>
                            <Grid>
                                <DropZone
                                    dropCategory={questionData?.dropZones?.[0] ?? "NO CATEGORY FOUND"}
                                    zoneIndex={0}
                                    onDrop={handleDrop}
                                >
                                    {assignments[0].map((i) => (
                                        <DragItem
                                            key={i}
                                            index={i}
                                            text={option_s[i]}
                                            isFeedback={isFeedback}
                                            handleFeedbackColor={handleFeedbackColor}
                                        />
                                    ))}
                                </DropZone>
                            </Grid>

                            <Grid>
                                <DropZone
                                    dropCategory={questionData?.dropZones?.[1] ?? "NO CATEGORY FOUND"}
                                    zoneIndex={1}
                                    onDrop={handleDrop}
                                >
                                    {assignments[1].map((i) => (
                                        <DragItem
                                            key={i}
                                            index={i}
                                            text={option_s[i]}
                                            isFeedback={isFeedback}
                                            handleFeedbackColor={handleFeedbackColor}
                                        />
                                    ))}
                                </DropZone>
                            </Grid>
                        </Grid>
                        <Grid sx={{ ...flexAlignRow, gap: 2 }}>
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                disabled={
                                    isDisabled || !(assignments[0].length + assignments[1].length === option_s.length)
                                }
                            >
                                Submit Answer
                            </Button>
                            <Button
                                startIcon={<DeleteIcon />}
                                variant="contained"
                                onClick={handleRevert}
                                disabled={isDisabled || (assignments[0].length === 0 && assignments[1].length === 0)}
                            >
                                Revert Answers
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </DndProvider>
        </>
    );
};

/*<Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
                {questionData?.option_s.map((option, index) => {
                    const isCorrect = correctAnswer_s.includes(index);
                    const isSelected = selectedAnswer_s.includes(index);
                    return <Button></Button>;
                })}
            </Box> */

export default DragAndDropEvent;
