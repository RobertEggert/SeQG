import { Box, Typography } from "@mui/material";
import { useRef, useState } from "react";
import AgeExperience from "../AgeExperience/AgeExperience";
import ExplainAnswer from "../LLMInteraction/ExplainAnswer";
import Question from "../LLMInteraction/Question";
import NextQuestion from "../NextQuestion";
import EndSessionButton from "../EndSessionButton";
import GuestDashboard from "./GuestDashboard";

import type { QuestionStateType, ExplainStateType } from "../../utils/LLMFetcher";

const GuestLLMQuestions = ({ session }: { session: string }) => {
    const [age, setAge] = useState<string | null>(null);
    const [experience, setExperience] = useState<number | null>(null);
    const [isProfileSubmitted, setIsProfileSubmitted] = useState(false);
    const [answerCorrect, setAnswerCorrect] = useState<boolean | null>(null);
    const [questionState, setQuestionState] = useState<QuestionStateType>({
        q_fetch: true,
        q_data: []
    });
    const [explanationState, setExplanationState] = useState<ExplainStateType>({
        e_fetch: false,
        e_data: null
    });

    const [stats, setStats] = useState<Record<string, { correct: number; total: number }>>({});
    const [showDashboard, setShowDashboard] = useState(false);

    const questionsFetchedRef = useRef(0);

    const handleNextQuestion = () => {
        // Queue for 3 questions max
        questionsFetchedRef.current -= 1;
        setQuestionState({ q_fetch: true, q_data: questionState.q_data.slice(1) });
        setAnswerCorrect(null);
        setExplanationState({ e_fetch: false, e_data: null });
    };

    const handleTrackStats = (topic: string, isCorrect: boolean) => {
        setStats((prev) => {
            const current = prev[topic] || { correct: 0, total: 0 };
            return {
                ...prev,
                [topic]: {
                    correct: current.correct + (isCorrect ? 1 : 0),
                    total: current.total + 1
                }
            };
        });
    };

    const handleEndSession = () => {
        setShowDashboard(true);
    };

    if (showDashboard && age && experience !== null) {
        return <GuestDashboard stats={stats} age={age} experience={experience} session={session} />;
    }

    return (
        <>
            <Box sx={{ padding: 3 }}>
                {!isProfileSubmitted && (
                    <>
                        {/* Ask about age and experience */}
                        <Typography color="green">✅ Connected</Typography>
                        <AgeExperience
                            setIsProfileSubmitted={setIsProfileSubmitted}
                            setQuestionState={setQuestionState}
                            setAge={setAge}
                            setExperience={setExperience}
                            age={age}
                            experience={experience}
                            questionsFetchedRef={questionsFetchedRef}
                            isPriv={false}
                        />
                    </>
                )}

                {/* Question */}
                {isProfileSubmitted && (
                    <>
                        <Question
                            handleNextQuestion={handleNextQuestion}
                            setAnswerCorrect={(val: boolean | null) => {
                                setAnswerCorrect(val);
                                if (val !== null && questionState.q_data[0]?.topic) {
                                    handleTrackStats(questionState.q_data[0].topic, val);
                                }
                            }}
                            answerCorrect={answerCorrect}
                            setQuestionState={setQuestionState}
                            setExplanationState={setExplanationState}
                            questionState={questionState}
                            explanationState={explanationState}
                            questionsFetchedRef={questionsFetchedRef}
                            age={age}
                            experience={experience}
                        />
                        {/* Explanation if wrongfully answered */}
                        <ExplainAnswer
                            setExplanationState={setExplanationState}
                            questionData={questionState.q_data[0]}
                            explanationState={explanationState}
                            age={age}
                            experience={experience}
                        />
                    </>
                )}
            </Box>

            <EndSessionButton session={session} onEndSession={handleEndSession} />

            {/* Refetching Question */}
            <NextQuestion
                handleNextQuestion={handleNextQuestion}
                questionState={questionState}
                explanationState={explanationState}
                answerCorrect={answerCorrect}
                age={age}
                experience={experience}
            />
        </>
    );
};

export default GuestLLMQuestions;
