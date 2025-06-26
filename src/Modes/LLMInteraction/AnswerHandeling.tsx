import type { Dispatch, SetStateAction } from "react";
import { sendAnswerToLLMBackend } from "../../utils/LLMAnswerSaver";
import type { ExplainStateType, LLM_API_Question_Type } from "../../utils/LLMFetcher";

// Currently in use of Single-Choice and Multiple-Choice
const submitAnswer = (
    userId: string | undefined,
    isCorrect: boolean,
    questionData: LLM_API_Question_Type | null,
    setAnswerCorrect: Dispatch<SetStateAction<boolean | null>>,
    setExplanationState: Dispatch<SetStateAction<ExplainStateType>>,
    handleNextQuestion: () => void
) => {
    if (userId) {
        sendAnswerToLLMBackend(isCorrect, userId, questionData?.topic ?? "NO_TOPIC");
    }

    setAnswerCorrect(isCorrect);

    if (isCorrect) {
        setTimeout(() => {
            handleNextQuestion();
        }, 2000);
    } else {
        setExplanationState({ e_fetch: true, e_data: null });
    }
};

export default submitAnswer;
