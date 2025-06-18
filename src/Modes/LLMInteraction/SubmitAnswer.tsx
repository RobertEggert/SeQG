import type { Dispatch, SetStateAction } from "react";
import { sendAnswerToLLMBackend } from "../../utils/LLMAnswerSaver";
import type {
    ExplainStateType,
    QuestionStateType
} from "../../utils/LLMFetcher";

// Currently in use of Single-Choice and Multiple-Choice
const submitAnswer = (
    userId: string | undefined,
    isCorrect: boolean,
    questionState: QuestionStateType,
    setAnswerCorrect: Dispatch<SetStateAction<boolean | null>>,
    setExplanationState: Dispatch<SetStateAction<ExplainStateType>>,
    handleNextQButtonClick: () => void
) => {
    if (userId) {
        sendAnswerToLLMBackend(
            isCorrect,
            userId,
            questionState.q_data?.topic ?? "NO_TOPIC"
        );
    }

    setAnswerCorrect(isCorrect);

    if (isCorrect) {
        setTimeout(() => {
            handleNextQButtonClick();
        }, 2000);
    } else {
        setExplanationState({ e_fetch: true, e_data: null });
    }
};

export default submitAnswer;
