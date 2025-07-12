import { Box, Typography } from "@mui/material";
import { useRef, useState } from "react";
import AgeExperience from "../AgeExperience/AgeExperience";
import ExplainAnswer from "../LLMInteraction/ExplainAnswer";
import Question from "../LLMInteraction/Question";
import NextQuestion from "../NextQuestion";
import type { QuestionStateType, ExplainStateType } from "../../utils/LLMFetcher";
import EndSessionButton from "../EndSessionButton";

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

    const questionsFetchedRef = useRef(0);

    const handleNextQuestion = () => {
        //  queue for 3 questions max
        questionsFetchedRef.current -= 1;
        setQuestionState({ q_fetch: true, q_data: questionState.q_data.slice(1) });
        setAnswerCorrect(null);
        setExplanationState({ e_fetch: false, e_data: null });
    };

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
                            setAnswerCorrect={setAnswerCorrect}
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

export default GuestLLMQuestions;
