import type { Dispatch, SetStateAction } from "react";
import type {
    ExplainStateType,
    QuestionStateType
} from "../Modes/Anonymous/AnonymousLLMQuestions";

export type LLM_API_Question_Type = {
    question: string;
    options: string[];
    correctIndex: number;
};

export type LLM_API_Explanation_Type = {
    explain: string;
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
