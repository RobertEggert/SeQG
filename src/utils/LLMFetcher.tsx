import type { Dispatch, SetStateAction } from "react";

export type LLM_API_Question_Type = {
    question: string;
    options: string[];
    correctIndex: number;
};

export type LLM_API_Explanation_Type = {
    explain: string;
};

type FetchQuestionType = {
    setQData: Dispatch<SetStateAction<LLM_API_Question_Type | null>>;
    setQFetch: Dispatch<SetStateAction<boolean>>;
    age?: string | null;
    experience?: number | null;
};

type FetchExplanationType = {
    setEData: Dispatch<SetStateAction<LLM_API_Explanation_Type | null>>;
    setEFetch: Dispatch<SetStateAction<boolean>>;
    age?: string | null;
    experience?: number | null;
    question?: string;
    options?: string[];
    correctIndex?: number;
};

export const fetchQuestionFromLLM = async ({
    setQData,
    setQFetch,
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

    setQData(LLMdata);
    setQFetch(false);
};

export const fetchExplanationFromLLMAdvanced = async ({
    setEData,
    setEFetch,
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

    setEData(LLMdata);
    setEFetch(false);
};

export const fetchExplanationFromLLMShortTerm = async ({
    setEData,
    setEFetch,
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

    setEData(LLMdata);
    setEFetch(false);
};
