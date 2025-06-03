import express, { type Request, type Response } from "express";
import cors from "cors";
import fetch from "node-fetch";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

interface QuestionRequest {
    age: string;
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

const LOCAL_SERVER = process.env.VITE_LOCAL_ADDRESS || "192.168.2.80";
const LLM_PORT = process.env.VITE_LLM_PORT || 3002;
const LLM_MODEL = process.env.VITE_LLM_MODEL || "llama3.1";
const LLM_API_PORT = process.env.VITE_LLM_API_PORT || 11434;

app.post(
    "/api/question",
    async (req: Request<object, object, QuestionRequest>, res: Response) => {
        const { age, experience } = req.body;

        const rawPrompt = fs.readFileSync(
            "src/backend/prompts/cybersecurity_prompt.txt",
            "utf-8"
        );

        const prompt = rawPrompt
            .replace("{{age}}", age)
            .replace("{{experience}}", String(experience));

        try {
            console.log("Fetching question from LLM");
            const ollamaRes = await fetch(
                `http://localhost:${LLM_API_PORT}/api/generate`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        model: LLM_MODEL,
                        prompt,
                        stream: false
                    })
                }
            );

            const data = (await ollamaRes.json()) as { response: string };
            if (data) {
                console.log("Questions fetched successfully!");
            }
            const rawOutput: string = data.response;

            // In case something else gets returned too
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
