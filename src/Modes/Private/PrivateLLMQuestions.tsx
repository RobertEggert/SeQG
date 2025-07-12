import { Box, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ExplainAnswer from "../LLMInteraction/ExplainAnswer";
import Question from "../LLMInteraction/Question";
import NextQuestion from "../NextQuestion";
import { type QuestionStateType, type ExplainStateType, fetchUserData } from "../../utils/LLMFetcher";
import AgeExperience from "../AgeExperience/AgeExperience";
import EndSessionButton from "../EndSessionButton";

const PrivateLLMQuestions = ({ userId, session }: { userId: string; session: string }) => {
    const [age, setAge] = useState<string | null>(null);
    const [experience, setExperience] = useState<number | null>(null);
    const [answerCorrect, setAnswerCorrect] = useState<boolean | null>(null);
    const [isProfileSubmitted, setIsProfileSubmitted] = useState(false);
    const [questionState, setQuestionState] = useState<QuestionStateType>({
        q_fetch: true,
        q_data: []
    });
    const [explanationState, setExplanationState] = useState<ExplainStateType>({
        e_fetch: false,
        e_data: null
    });

    const questionsFetchedRef = useRef(0);

    const handleNextQuestion = () => {
        //  queue for 3 questions max
        questionsFetchedRef.current -= 1;
        setQuestionState({ q_fetch: true, q_data: questionState.q_data.slice(1) });
        setAnswerCorrect(null);
        setExplanationState({ e_fetch: false, e_data: null });
    };

    useEffect(() => {
        const getUserData = async (userId: string) => {
            const userData = await fetchUserData(userId);
            if (userData.age && userData.experience) {
                setAge(userData.age);
                setExperience(userData.experience);
                setIsProfileSubmitted(true);
                setQuestionState({ q_fetch: true, q_data: [] }); // Auto-submit if data exists
            }
        };

        if (age === null && experience === null && userId !== "") {
            getUserData(userId);
        }
    }, [userId, age, experience]);

    return (
        <>
            <Box sx={{ padding: 3 }}>
                {/* Ask about age and experience */}
                {!isProfileSubmitted && (
                    <>
                        <Typography color="green">✅ Connected</Typography>
                        <AgeExperience
                            setIsProfileSubmitted={setIsProfileSubmitted}
                            setQuestionState={setQuestionState}
                            setAge={setAge}
                            setExperience={setExperience}
                            age={age}
                            experience={experience}
                            questionsFetchedRef={questionsFetchedRef}
                            userId={userId}
                            isPriv={true}
                        />
                    </>
                )}
                {isProfileSubmitted && (
                    <>
                        {/* Question */}
                        <Question
                            handleNextQuestion={handleNextQuestion}
                            setAnswerCorrect={setAnswerCorrect}
                            answerCorrect={answerCorrect}
                            setQuestionState={setQuestionState}
                            setExplanationState={setExplanationState}
                            questionState={questionState}
                            explanationState={explanationState}
                            questionsFetchedRef={questionsFetchedRef}
                            age={age}
                            experience={experience}
                            userId={userId}
                        />
                        {/* Explanation if wrongfully answered */}
                        <ExplainAnswer
                            setExplanationState={setExplanationState}
                            questionState={questionState}
                            explanationState={explanationState}
                            age={age}
                            experience={experience}
                        />
                    </>
                )}
            </Box>

            {/* Grading or Ending Session - TODO */}
            <EndSessionButton session={session} />

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

export default PrivateLLMQuestions;
