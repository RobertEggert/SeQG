import type { Dispatch, ElementType, SetStateAction } from "react";
import type { ExplainStateType, QuestionType, LLM_API_Question_Type } from "../../utils/LLMFetcher";
import SingleChoiceEvent from "../QuestionTypes/SingleChoiceEvent";
import { Box } from "@mui/material";
import LineConnectEvent from "../QuestionTypes/LineConnectEvent";
import MultipleChoiceEvent from "../QuestionTypes/MultipleChoiceEvent";
import SortingEvent from "../QuestionTypes/SortingEvent";
import ThinkEvent from "../QuestionTypes/ThinkEvent";
import DragAndDropEvent from "../QuestionTypes/DragAndDropEvent";
import QuestionTypeOverlay from "../QuestionTypes/QuestionTypeOverlay";

export type QuestionTypeProps = {
    handleNextQuestion: () => void;
    setExplanationState: Dispatch<SetStateAction<ExplainStateType>>;
    setAnswerCorrect: Dispatch<SetStateAction<boolean | null>>;
    questionData: LLM_API_Question_Type;
    explanationState: ExplainStateType;
    answerCorrect: boolean | null;
    userId: string | undefined;
};

const QuestionTypeRecognizer = ({
    handleNextQuestion,
    setExplanationState,
    setAnswerCorrect,
    questionData,
    explanationState,
    answerCorrect,
    userId
}: QuestionTypeProps) => {
    if (!questionData) return null;

    const sharedProps = {
        handleNextQuestion,
        setExplanationState,
        setAnswerCorrect,
        questionData, // we ensure that the first element is always used
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

    const QuestionTypeComponent = componentForQuestionType[questionData.questionType]; // here we map the according component

    return QuestionTypeComponent ? (
        <QuestionTypeOverlay questionType={questionData.questionType}>
            <QuestionTypeComponent {...sharedProps} />
        </QuestionTypeOverlay>
    ) : (
        <Box>New question type?: {questionData.questionType}</Box>
    );
};

export default QuestionTypeRecognizer;
