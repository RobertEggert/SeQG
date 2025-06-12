import type { Dispatch, ElementType, SetStateAction } from "react";
import type {
    QuestionStateType,
    ExplainStateType,
    QuestionType
} from "../utils/LLMFetcher";
import SingleChoiceEvent from "./QuestionTypes/SingleChoiceEvent";
import { Box, Typography } from "@mui/material";
import LineConnectEvent from "./QuestionTypes/LineConnectEvent";
import MultipleChoiceEvent from "./QuestionTypes/MultipleChoiceEvent";
import SortingEvent from "./QuestionTypes/SortingEvent";
import ThinkEvent from "./QuestionTypes/ThinkEvent";
import DragAndDropEvent from "./QuestionTypes/DragAndDropEvent";

export type QuestionTypeProps = {
    handleNextQButtonClick: () => void;
    setExplanationState: Dispatch<SetStateAction<ExplainStateType>>;
    setAnswerCorrect: Dispatch<SetStateAction<boolean | null>>;
    questionState: QuestionStateType;
    explanationState: ExplainStateType;
    answerCorrect: boolean | null;
    userId: string | undefined;
};

const QuestionTypeRecognizer = ({
    handleNextQButtonClick,
    setExplanationState,
    setAnswerCorrect,
    questionState,
    explanationState,
    answerCorrect,
    userId
}: QuestionTypeProps) => {
    if (!questionState.q_data) return <Typography>No Data found</Typography>;

    const sharedProps = {
        handleNextQButtonClick,
        setExplanationState,
        setAnswerCorrect,
        questionState,
        explanationState,
        answerCorrect,
        userId
    };

    const componentForQuestionType: Record<QuestionType, ElementType> = {
        "single-choice-event": SingleChoiceEvent,
        "multiple-choice-event": MultipleChoiceEvent,
        "drag-drop-event": DragAndDropEvent,
        "line-connect-event": LineConnectEvent,
        "sorting-event": SortingEvent,
        "think-event": ThinkEvent
    };

    const QuestionTypeComponent =
        componentForQuestionType[questionState.q_data.questionType]; // here we map the according component

    return QuestionTypeComponent ? (
        <QuestionTypeComponent {...sharedProps} />
    ) : (
        <Box>New question type?: {questionState.q_data?.questionType}</Box>
    );
};

export default QuestionTypeRecognizer;
