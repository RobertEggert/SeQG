import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ExplainAnswer from "../LLMInteraction/ExplainAnswer";
import Question from "../LLMInteraction/Question";
import NextQuestion from "../NextQuestion";
import { type QuestionStateType, type ExplainStateType, fetchUserData } from "../../utils/LLMFetcher";
import AgeExperience from "../AgeExperience/AgeExperience";

const PrivateLLMQuestions = ({ userId }: { userId: string }) => {
    const [age, setAge] = useState<string | null>(null);
    const [experience, setExperience] = useState<number | null>(null);
    const [answerCorrect, setAnswerCorrect] = useState<boolean | null>(null);
    const [isProfileSubmitted, setIsProfileSubmitted] = useState(false);

    const [questionState, setQuestionState] = useState<QuestionStateType>({
        q_fetch: false,
        q_data: null
    });
    const [explanationState, setExplanationState] = useState<ExplainStateType>({
        e_fetch: false,
        e_data: null
    });

    const handleNextQButtonClick = () => {
        setAnswerCorrect(null);
        setQuestionState({ q_fetch: true, q_data: null });
        setExplanationState({ e_fetch: false, e_data: null });
    };

    useEffect(() => {
        const getUserData = async (userId: string) => {
            const userData = await fetchUserData(userId);
            if (userData.age && userData.experience) {
                setAge(userData.age);
                setExperience(userData.experience);
                setIsProfileSubmitted(true);
                setQuestionState({ q_fetch: true, q_data: null }); // Auto-submit if data exists
            }
        };

        if (age === null && experience === null) {
            getUserData(userId);
        }
    }, [userId, age, experience]);

    return (
        <>
            <Box sx={{ p: 3 }}>
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
                            isPriv={true}
                        />
                    </>
                )}

                {/* Question */}
                <Question
                    handleNextQButtonClick={handleNextQButtonClick}
                    setAnswerCorrect={setAnswerCorrect}
                    answerCorrect={answerCorrect}
                    setQuestionState={setQuestionState}
                    setExplanationState={setExplanationState}
                    questionState={questionState}
                    explanationState={explanationState}
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
            </Box>

            {/* Refetching Question */}
            <NextQuestion
                handleNextQButtonClick={handleNextQButtonClick}
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
