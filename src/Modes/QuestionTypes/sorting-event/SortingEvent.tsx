import { useState } from "react";
import {
    DndContext,
    type DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    closestCenter,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import { Box, Button, Typography } from "@mui/material";
import type { QuestionTypeProps } from "../../LLMInteraction/QuestionTypeRecognizer";
import submitAnswer from "../../LLMInteraction/AnswerHandeling";
import { flexAlignRow } from "../../../styling/theme";
import QuestionBubble from "../../LLMInteraction/QuestionBubble";

const SortingEvent = ({
    handleNextQuestion,
    setExplanationState,
    setAnswerCorrect,
    questionData,
    explanationState,
    answerCorrect,
    userId
}: QuestionTypeProps) => {
    const [option_sOrder, setOption_sOrder] = useState<{ id: number; text: string }[]>(
        (questionData.option_s ?? []).map((text, index) => ({
            id: index,
            text
        }))
    );
    const [isFeedback, setIsFeedback] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setOption_sOrder((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleSubmit = () => {
        const isCorrect = option_sOrder.every((option, index) => {
            return questionData.correctAnswer_s?.[index] === option.id;
        });
        setIsFeedback(true);
        submitAnswer(userId, isCorrect, questionData, setAnswerCorrect, setExplanationState, handleNextQuestion);
    };

    const handleFeedbackColor = (index: number) => {
        const correctAnswer_s = questionData.correctAnswer_s;
        if (option_sOrder[index].id !== correctAnswer_s?.[index]) {
            return "rgba(255, 0, 0, 0.4)";
        }
        return "white";
    };

    const handleRevert = () => {
        setOption_sOrder(
            (questionData.option_s ?? []).map((text, index) => ({
                id: index,
                text
            }))
        );
    };

    const isDisabled = explanationState.e_data !== null || explanationState.e_fetch || answerCorrect === true;

    return (
        <>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                <QuestionBubble question={questionData?.question ?? ""} mode={userId ? "PRIVATE" : "GUEST"} />
            </Typography>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={option_sOrder} strategy={verticalListSortingStrategy}>
                    {option_sOrder.map((option) => (
                        <SortableItem
                            key={option.id}
                            id={option.id}
                            option={option.text}
                            isFeedback={isFeedback}
                            handleFeedbackColor={handleFeedbackColor}
                        />
                    ))}
                </SortableContext>
                <Box sx={{ ...flexAlignRow, gap: 2, marginTop: 6 }}>
                    <Button variant="contained" onClick={handleSubmit} disabled={isDisabled}>
                        Submit Answer
                    </Button>
                    <Button variant="contained" onClick={handleRevert} disabled={isDisabled}>
                        Revert Order
                    </Button>
                </Box>
            </DndContext>
        </>
    );
};

export default SortingEvent;
