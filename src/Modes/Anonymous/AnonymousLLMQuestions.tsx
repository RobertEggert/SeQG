import { Box, Button, CircularProgress, Fade, Typography } from "@mui/material";
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

    const [fetchData, setFetchData] = useState(false);
    const [data, setData] = useState<LLM_API_Type | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);

    const [showFade, setShowFade] = useState(false);

    const fetchQuestionFromLLM = async () => {
        const response = await fetch("http://localhost:3002/api/question", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ age, experience })
        });
        const LLMdata: LLM_API_Type = await response.json();

        if (!LLMdata?.options || !Array.isArray(LLMdata.options)) {
            console.error("Invalid response from server:", LLMdata);
            return;
        }

        setData(LLMdata);
        setFetchData(false);
    };

    const handleAnswerClick = (choice: number) => {
        if (!data) {
            console.error("No data available.");
            return;
        }
        setFeedback(
            choice === data.correctIndex
                ? "✅ Correct!"
                : "❌ Incorrect. Try again."
        );
    };

    const handleButtonClick = () => {
        setFeedback(null);
        setFetchData(true);
        setData(null);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setShowFade((prev) => !prev);
        }, 1300); // toggle every second

        return () => clearInterval(interval);
    }, [showFade]);

    useEffect(() => {
        if (age && experience) {
            setFetchData(true);
        }
    }, [age, experience]);

    useEffect(() => {
        if (fetchData) {
            fetchQuestionFromLLM();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchData]);

    return (
        <>
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
                {fetchData && (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingTop: 5
                        }}
                    >
                        <CircularProgress
                            size={60}
                            color="secondary"
                            thickness={2}
                        />
                        <Fade in={showFade} timeout={500}>
                            <Typography
                                variant="subtitle1"
                                sx={{ color: "black" }}
                            >
                                Fetching data
                            </Typography>
                        </Fade>
                    </Box>
                )}

                {/* Display Question */}
                {data && (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6">{data.question}</Typography>
                        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                            {data.options.map((option, index) => (
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

            {/* Refetching Question */}
            <Box
                sx={{
                    display: "flex",
                    mt: 4,
                    right: "12%",
                    bottom: "10%",
                    position: "fixed"
                }}
            >
                <Button
                    variant="contained"
                    disabled={data === null}
                    onClick={handleButtonClick}
                >
                    {!age || !experience
                        ? "Tell age and experience first"
                        : "Skip question"}
                </Button>
            </Box>
        </>
    );
};

export default AnonymousLLMQuestions;
