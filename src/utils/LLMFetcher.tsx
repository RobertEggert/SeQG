import type { Dispatch, SetStateAction } from "react";

export type LLM_API_Question_Type = {
    question: string;
    options: string[];
    correctIndex: number;
    topic: string;
    questionType: QuestionType;
};

export type QuestionType =
    | "single-choice-event"
    | "multiple-choice-event"
    | "drag-drop-event"
    | "line-connect-event"
    | "sorting-event"
    | "think-event";

export type LLM_API_Explanation_Type = {
    explain: string;
};

export type ExplainStateType = {
    e_fetch: boolean;
    e_data: LLM_API_Explanation_Type | null;
};

export type QuestionStateType = {
    q_fetch: boolean;
    q_data: LLM_API_Question_Type | null;
};

type FetchQuestionType = {
    setQuestionState: Dispatch<SetStateAction<QuestionStateType>>;
    age?: string | null;
    experience?: number | null;
};

type FetchExplanationType = {
    setExplanationState: Dispatch<SetStateAction<ExplainStateType>>;
    age?: string | null;
    experience?: number | null;
    question?: string;
    options?: string[];
    correctIndex?: number;
};

type FetchUserDataType = {
    age: string | null;
    experience: number | null;
};

export const fetchQuestionFromLLM = async ({
    setQuestionState,
    age,
    experience
}: FetchQuestionType) => {
    const response = await fetch("http://localhost:3002/api/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ age, experience })
    });
    const LLMdata: LLM_API_Question_Type = await response.json();

    if (!LLMdata?.options || !Array.isArray(LLMdata.options)) {
        console.error("Invalid response from server:", LLMdata);
        return;
    }
    setQuestionState({ q_fetch: false, q_data: LLMdata });
};

export const fetchExplanationFromLLMLongTerm = async ({
    setExplanationState,
    age,
    experience
}: FetchExplanationType) => {
    const response = await fetch(
        "http://localhost:3002/api/explanation/simpleprompt",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ age, experience })
        }
    );
    const LLMdata: LLM_API_Explanation_Type = await response.json();

    if (!LLMdata?.explain) {
        console.error("Invalid response from server:", LLMdata);
        return;
    }

    setExplanationState({ e_fetch: false, e_data: LLMdata });
};

export const fetchExplanationFromLLMShortTerm = async ({
    setExplanationState,
    age,
    experience,
    question,
    options,
    correctIndex
}: FetchExplanationType) => {
    const response = await fetch(
        "http://localhost:3002/api/explanation/shortterm",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                age,
                experience,
                question,
                options,
                correctIndex
            })
        }
    );
    const LLMdata: LLM_API_Explanation_Type = await response.json();

    if (!LLMdata?.explain) {
        console.error("Invalid response from server:", LLMdata);
        return;
    }
    setExplanationState({ e_fetch: false, e_data: LLMdata });
};

export const fetchUserData = async (userId: string) => {
    const response = await fetch(`http://localhost:3001/user-data/${userId}`);
    const userData: FetchUserDataType = await response.json();
    return userData;
};
