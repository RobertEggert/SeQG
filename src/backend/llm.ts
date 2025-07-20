import express, { type Request, type Response } from "express";
import cors from "cors";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config({ path: `.env.local`, override: true });

interface QuestionRequest {
    age: string;
    experience: number;
    userId?: string; // Optional for private questions
}

interface ExplenationRequest {
    age: string;
    experience: number;
    question: string;
    option_s: string[];
    correctAnswer_s: number[];
}

interface SaveRequest {
    isAnswerCorrect: boolean;
    userId: string;
    topic: string;
}

interface QuestionResponse {
    question: string;
    option_s: [string, string];
    correctAnswer_s: number;
}

interface SecurityTipsResponse {
    title: string;
    subtitle: string;
}

interface ExplenationResponse {
    explain: string;
}

interface GuestFeedbackRequest {
    age: string;
    experience: number;
    stats: { [key: string]: { correct: number; total: number } };
}

interface GuestFeedbackResponse {
    feedback: string;
}

export type ProgressTrackingType = {
    user_id: string;
    age: string | null;
    experience: number | null;
    progress: {
        [key: string]: ProgressTopicsType;
    };
};

type ProgressTopicsType = {
    correct: number;
    total: number;
};

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOCAL_SERVER = process.env.VITE_LOCAL_ADDRESS || "NO_IP_FOUND";
const LLM_PORT = process.env.VITE_LLM_PORT || 3002;
const LLM_MODEL = process.env.VITE_LLM_MODEL || "NO_MODEL_FOUND";
const LLM_API_PORT = process.env.VITE_LLM_API_PORT || 11434;

//#region FETCHING
// QUESTION
app.post("/api/question", async (req: Request<object, object, QuestionRequest>, res: Response) => {
    const { age, experience } = req.body;

    try {
        // Load topic list and choose one randomly
        const topicsPath = path.join(__dirname, "./memory/TOPICS_LIST.json");
        const topicListRaw = fs.readFileSync(topicsPath, "utf-8");
        const topicList = JSON.parse(topicListRaw).topics as string[];
        const topic = topicList[Math.floor(Math.random() * topicList.length)];

        // Load prompt and inject dynamic values
        const rawPrompt = fs.readFileSync(path.join(__dirname, "./prompts/cs_ask.txt"), "utf-8");
        const prompt = rawPrompt
            .replace("{{age}}", age)
            .replace("{{experience}}", String(experience))
            .replace("{{topic}}", topic);

        console.log("Fetching question from LLM...");
        const ollamaRes = await fetch(`http://localhost:${LLM_API_PORT}/api/generate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: LLM_MODEL,
                prompt,
                stream: false
            })
        });

        const data = (await ollamaRes.json()) as { response: string };
        if (data) {
            console.log(`Question fetched on topic "${topic}"`);
        }

        const rawOutput: string = data.response;

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
});

// PRIVATE QUESTION
app.post("/api/question/private", async (req: Request<object, object, QuestionRequest>, res: Response) => {
    const { age, experience, userId } = req.body;

    try {
        // Load topic list and choose one randomly
        const statsPath = path.join(__dirname, `./memory/private-users/${userId}.json`);
        const statsListRaw = fs.readFileSync(statsPath, "utf-8");
        const progressList = JSON.parse(statsListRaw).progress;

        const topicsPath = path.join(__dirname, "./memory/TOPICS_LIST.json");
        const topicListRaw = fs.readFileSync(topicsPath, "utf-8");
        const topicList = JSON.parse(topicListRaw).topics as string[];
        const topic = topicList[Math.floor(Math.random() * topicList.length)];

        // Load prompt and inject dynamic values
        const rawPrompt = fs.readFileSync(path.join(__dirname, "./prompts/cs_ask_private.txt"), "utf-8");
        const prompt = rawPrompt
            .replace("{{age}}", age)
            .replace("{{experience}}", String(experience))
            .replace("{{topic}}", topic)
            .replace("{{stats}}", String(progressList));

        console.log("Fetching question from LLM...");
        const ollamaRes = await fetch(`http://localhost:${LLM_API_PORT}/api/generate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: LLM_MODEL,
                prompt,
                stream: false
            })
        });

        const data = (await ollamaRes.json()) as { response: string };
        if (data) {
            console.log(`Question fetched on topic "${topic}"`);
        }

        const rawOutput: string = data.response;

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
});

// EXPLAIN
app.post("/api/explanation/shortterm", async (req: Request<object, object, ExplenationRequest>, res: Response) => {
    const { age, experience, question, option_s, correctAnswer_s } = req.body;

    const rawPrompt = fs.readFileSync("src/backend/prompts/cs_explain_shortterm.txt", "utf-8");

    const prompt = rawPrompt
        .replace("{{age}}", age)
        .replace("{{experience}}", String(experience))
        .replace("{{question}}", question)
        .replace("{{option_s}}", String(option_s))
        .replace("{{correctAnswer_s}}", String(correctAnswer_s));

    try {
        console.log("Fetching explanation from LLM");
        const ollamaRes = await fetch(`http://localhost:${LLM_API_PORT}/api/generate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: LLM_MODEL,
                prompt,
                stream: false
            })
        });

        const data = (await ollamaRes.json()) as { response: string };
        if (data) {
            console.log("Explanation fetched successfully!");
        }
        const rawOutput: string = data.response;

        // In case something else gets returned too
        const jsonStart = rawOutput.indexOf("{");
        const jsonEnd = rawOutput.lastIndexOf("}");
        const jsonString = rawOutput.substring(jsonStart, jsonEnd + 1);

        const parsed: ExplenationResponse = JSON.parse(jsonString);
        res.json(parsed);
    } catch (err) {
        console.error("Error fetching or parsing LLM output:", err);
        res.status(500).json({
            error: "Failed to fetch explanation from LLM"
        });
    }
});

// TIPS
app.get("/api/security/tips", async (_, res: Response) => {
    const prompt = fs.readFileSync(path.join(__dirname, "./prompts/cs_tips.txt"), "utf-8");
    console.log("FETCH TIP");
    const ollamaRes = await fetch(`http://localhost:${LLM_API_PORT}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: LLM_MODEL,
            prompt,
            stream: false
        })
    });
    const data = (await ollamaRes.json()) as { response: string };
    console.log("RECEIVED TIP");

    const rawOutput: string = data.response;

    const jsonStart = rawOutput.indexOf("{");
    const jsonEnd = rawOutput.lastIndexOf("}");
    const jsonString = rawOutput.substring(jsonStart, jsonEnd + 1);

    const parsed: SecurityTipsResponse = JSON.parse(jsonString);
    res.json(parsed);
});

// FEEDBACK
app.post("/api/guest-feedback", async (req: Request<object, object, GuestFeedbackRequest>, res: Response) => {
    const { age, experience, stats } = req.body;

    try {
        const statsText = Object.entries(stats)
            .map(([topic, { correct, total }]) => `- ${topic}: ${correct}/${total}`)
            .join("\n");

        const rawPrompt = fs.readFileSync(path.join(__dirname, "./prompts/cs_feedback.txt"), "utf-8");
        const prompt = rawPrompt
            .replace("{{age}}", age)
            .replace("{{experience}}", String(experience))
            .replace("{{stats}}", statsText);

        console.log("Fetching guest feedback from LLM...");
        const ollamaRes = await fetch(`http://localhost:${LLM_API_PORT}/api/generate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: LLM_MODEL,
                prompt,
                stream: false
            })
        });
        console.log("stats are here:", stats);
        console.log("stats are here:", req.body);
        const data = (await ollamaRes.json()) as { response: string };
        const rawOutput: string = data.response.trim();

        console.log("Feedback fetched successfully!");
        console.log(" \n", rawOutput);

        const jsonStart = rawOutput.indexOf("{");
        const jsonEnd = rawOutput.lastIndexOf("}");
        const jsonString = rawOutput.substring(jsonStart, jsonEnd + 1);

        const cleanJsonString = jsonString.replace(/\n/g, " ").replace(/\r/g, " ").trim();

        const parsed: GuestFeedbackResponse = JSON.parse(cleanJsonString);
        res.json(parsed);
    } catch (err) {
        console.error("Error fetching guest feedback:", err);
        res.status(500).json({
            error: "Failed to fetch feedback from LLM"
        });
    }
});

//#endregion FETCHING

//#region SAVING
// SAVE ANSWER
app.post("/api/saveAnswer", async (req: Request<object, object, SaveRequest>, res: Response) => {
    const { isAnswerCorrect, userId, topic } = req.body;

    try {
        const userFilePath = path.join(__dirname, `./memory/private-users/${userId}.json`);

        if (!fs.existsSync(userFilePath)) {
            res.status(404).json({ error: "User not found" });
        }

        const rawData = fs.readFileSync(userFilePath, "utf-8");
        const parsedData: ProgressTrackingType = JSON.parse(rawData);

        // Ensure topic tracking exists if not create
        if (!parsedData.progress[topic]) {
            parsedData.progress[topic] = { correct: 0, total: 0 };
        }

        // Update the progress
        parsedData.progress[topic].total += 1;
        if (isAnswerCorrect) {
            parsedData.progress[topic].correct += 1;
        }

        // Save it back to the file
        fs.writeFileSync(userFilePath, JSON.stringify(parsedData, null, 2));
    } catch (err) {
        console.error("Error updating progress:", err);
    }
});
//#endregion SAVING

app.listen(LLM_PORT, () => {
    console.log(`✅ Server running at http://${LOCAL_SERVER}:${LLM_PORT}`);
});
