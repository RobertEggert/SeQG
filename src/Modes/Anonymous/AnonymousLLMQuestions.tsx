import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AgeExpreience from "../AgeExperience";

type LLM_API_Type = {
    question: string;
    options: string[];
    correctIndex: number;
};

const AnonymousLLMQuestions = () => {
    const [age, setAge] = useState<string | null>(null);
    const [experience, setExperience] = useState<number | null>(null);

    const [correctIndex, setCorrectIndex] = useState(-1);
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState<string[]>([]);
    const [feedback, setFeedback] = useState("");

    const fetchQuestionFromLLM = async () => {
        const response = await fetch("http://localhost:3002/api/question", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ age, experience })
        });
        const data: LLM_API_Type = await response.json();

        if (!data?.options || !Array.isArray(data.options)) {
            console.error("Invalid response from server:", data);
            return;
        }

        const shuffled = data.options.sort(() => 0.5 - Math.random());
        console.log(data);
        setQuestion(data.question);
        setOptions(shuffled);
        setCorrectIndex(data.correctIndex);
        setFeedback("");
    };

    const handleAnswerClick = (choice: number) => {
        setFeedback(
            choice === correctIndex ? "✅ Correct!" : "❌ Incorrect. Try again."
        );
    };

    useEffect(() => {
        if (age && experience) {
            fetchQuestionFromLLM();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [age, experience]);

    return (
        <Box sx={{ p: 3 }}>
            <Typography color="green">✅ Connected</Typography>

            {/* Ask about age and experience */}
            {(!age || !experience) && (
                <AgeExpreience
                    age={age}
                    experience={experience}
                    setAge={setAge}
                    setExperience={setExperience}
                />
            )}

            {/* Loading screen when data is not defined - TODO*/}

            {/* Display Question */}
            {question && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6">{question}</Typography>
                    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                        {options.map((option, index) => (
                            <Button
                                key={index}
                                variant="outlined"
                                onClick={() => handleAnswerClick(index)}
                            >
                                {option}
                            </Button>
                        ))}
                    </Box>
                    {feedback && (
                        <Typography sx={{ mt: 2 }}>{feedback}</Typography>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default AnonymousLLMQuestions;
