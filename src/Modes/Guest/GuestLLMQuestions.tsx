import { Box, Typography } from "@mui/material";
import { useState } from "react";
import AgeExpreience from "../AgeExperience";
import ExplainAnswer from "../ExplainAnswer";
import Question from "../Question";
import NextQuestion from "../NextQuestion";
import type {
    QuestionStateType,
    ExplainStateType
} from "../../utils/LLMFetcher";

const GuestLLMQuestions = () => {
    const [age, setAge] = useState<string | null>(null);
    const [experience, setExperience] = useState<number | null>(null);
    const [answerCorrect, setAnswerCorrect] = useState<boolean | null>(null);

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

    return (
        <>
            <Box sx={{ p: 3 }}>
                {/* Ask about age and experience */}
                {(!age || !experience) && (
                    <>
                        <Typography color="green">✅ Connected</Typography>
                        <AgeExpreience
                            age={age}
                            experience={experience}
                            setAge={setAge}
                            setExperience={setExperience}
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

export default GuestLLMQuestions;
