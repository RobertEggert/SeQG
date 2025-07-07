const LOCAL_ADDRESS = import.meta.env.VITE_LOCAL_ADDRESS || "NO_IP";
const BE_PORT = import.meta.env.VITE_BE_PORT || 3001;
const LLM_PORT = import.meta.env.VITE_LLM_PORT || 3002;

export const sendAnswerToLLMBackend = (isAnswerCorrect: boolean, userId: string, topic?: string) => {
    // this actually fetches nothing but it has to be called fetch
    fetch(`http://${LOCAL_ADDRESS}:${LLM_PORT}/api/saveAnswer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAnswerCorrect, userId, topic })
    }).catch((err) => {
        // Optionally log or ignore
        console.error("Failed to send answer:", err);
    });
};

export const sendAgeAndExperiencePrivate = (age: string, experience: number, userId: string) => {
    // this actually fetches nothing but it has to be called fetch
    fetch(`http://${LOCAL_ADDRESS}:${BE_PORT}/private/saveAgeAndExprience`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ age, experience, userId })
    }).catch((err) => {
        // Optionally log or ignore
        console.error("Failed to send answer:", err);
    });
};
