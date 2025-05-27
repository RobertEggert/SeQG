import express, { type Request, type Response } from "express";
import cors from "cors";
import fetch from "node-fetch";

interface QuestionRequest {
    age: string | number;
    experience: number;
}

interface QuestionResponse {
    question: string;
    options: [string, string];
    correctIndex: number;
}

const app = express();
app.use(cors());
app.use(express.json());

const LOCAL_SERVER = "192.168.2.80";
const LLM_PORT = 3002;

app.post(
    "/api/question",
    async (req: Request<object, object, QuestionRequest>, res: Response) => {
        const { age, experience } = req.body;

        const prompt = `
                    You are a Cybersecurity tutor.
                    Generate a single-choice question based on the user's profile:

                    - Age: ${age}
                    - Cybersecurity experience: ${experience} out of 5

                    Return strictly in this JSON format:
                    {
                        "question": "Your question?",
                        "options": ["Wrong answer", "Correct answer", "Another wrong answer", ...],
                        "correctIndex": 1
                    }
                    Where as the index is read like an array starting from 0.
                    The amount of single choice questions should not be more then 4.

                    You are PROHIBITED from returning any other text, format, additional information, or explanations.
                    If you cannot generate a question, return an empty JSON object: {}.
                    `;

        try {
            console.log("Fetching question from LLM");
            const ollamaRes = await fetch(
                "http://localhost:11434/api/generate",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        model: "llama3.1",
                        prompt,
                        stream: false
                    })
                }
            );

            const data = (await ollamaRes.json()) as { response: string };
            const rawOutput: string = data.response;

            // Attempt to extract JSON content
            const jsonStart = rawOutput.indexOf("{");
            const jsonEnd = rawOutput.lastIndexOf("}");
            const jsonString = rawOutput.substring(jsonStart, jsonEnd + 1);

            const parsed: QuestionResponse = JSON.parse(jsonString);
            res.json(parsed);
        } catch (err) {
            console.error("Error fetching or parsing LLM output:", err);
            res.status(500).json({
                error: "Failed to fetch question from LLM"
            });
        }
    }
);

app.listen(LLM_PORT, () => {
    console.log(`✅ Server running at http://${LOCAL_SERVER}:${LLM_PORT}`);
});
