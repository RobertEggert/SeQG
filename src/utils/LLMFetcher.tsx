import type { Dispatch, SetStateAction } from "react";

export type LLM_API_Question_Type = {
    question: string;
    option_s: string[];
    correctAnswer_s: number[];
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

export type SecurityTipsType = {
    title: string | null;
    subtitle: string | null;
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
    option_s?: string[];
    correctAnswer_s?: number[];
};

type FetchUserDataType = {
    age: string | null;
    experience: number | null;
};

export const fetchQuestionFromLLM = async ({ setQuestionState, age, experience }: FetchQuestionType) => {
    const response = await fetch("http://localhost:3002/api/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ age, experience })
    });
    const LLMdata: LLM_API_Question_Type = await response.json();

    if (!LLMdata?.option_s || !Array.isArray(LLMdata.option_s)) {
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
    const response = await fetch("http://localhost:3002/api/explanation/simpleprompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ age, experience })
    });
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
    option_s,
    correctAnswer_s
}: FetchExplanationType) => {
    const response = await fetch("http://localhost:3002/api/explanation/shortterm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            age,
            experience,
            question,
            option_s,
            correctAnswer_s
        })
    });
    const LLMdata: LLM_API_Explanation_Type = await response.json();

    if (!LLMdata?.explain) {
        console.error("Invalid response from server:", LLMdata);
        return;
    }
    setExplanationState({ e_fetch: false, e_data: LLMdata });
};

export const fallbackTips: SecurityTipsType[] = [
    {
        title: "Your cybersecurity posture is only as strong as your weakest link.",
        subtitle: "SeQG identifies areas of improvement and provides actionable advice to boost your security."
    },
    {
        title: "Cybersecurity is everyone's responsibility.",
        subtitle: "Take control of your digital safety with simple steps from SeQG."
    },
    {
        title: "Think before you click.",
        subtitle: "Phishing attempts can look real — SeQG teaches you how to spot them instantly."
    },
    {
        title: "Public Wi-Fi = Public Data?",
        subtitle: "Learn how to stay private on shared networks, even when on the go."
    },
    {
        title: "Still using your pet's name as a password?",
        subtitle: "SeQG helps you generate secure login habits in seconds."
    },
    {
        title: "Staying vigilant is a habit.",
        subtitle: "SeQG helps you build consistent cybersecurity practices in just a few minutes, every day."
    }
];

let fallbackIndex = 0;

export const fetchSecurityTipsFromLLM = async (): Promise<SecurityTipsType | null> => {
    try {
        const response = await fetch("http://localhost:3002/api/security/tipps");
        const LLMdata: SecurityTipsType = await response.json();

        if (!LLMdata.title || !LLMdata.subtitle) {
            console.error("Invalid response from server:", LLMdata);
            return null;
        }
        fallbackIndex = 0; // reset fallback index on successful fetch

        return LLMdata;
    } catch (error) {
        if (fallbackIndex % fallbackTips.length === 0) {
            console.warn("LLM offline or error. Serving fallback tips.", error);
            fallbackIndex = 0; // prevents from overflowing if the LLM is offline for a long time
        }

        const tip = fallbackTips[fallbackIndex];
        fallbackIndex++;
        return tip;
    }
};

export const fetchUserData = async (userId: string) => {
    const response = await fetch(`http://localhost:3001/user-data/${userId}`);
    const userData: FetchUserDataType = await response.json();
    return userData;
};
