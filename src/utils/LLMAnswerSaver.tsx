export const sendAnswerToLLMBackend = (
    isAnswerCorrect: boolean,
    userId: string,
    topic?: string
) => {
    fetch("http://localhost:3002/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAnswerCorrect, userId, topic })
    }).catch((err) => {
        // Optionally log or ignore
        console.error("Failed to send answer:", err);
    });
};
