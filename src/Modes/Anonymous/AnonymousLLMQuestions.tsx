import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import AgeExpreience from "../AgeExperience";
import {
    type LLM_API_Explanation_Type,
    type LLM_API_Question_Type
} from "../../utils/LLMFetcher";
import ExplainAnswer from "../ExplainAnswer";
import GetQuestion from "../GetQuestion";

const AnonymousLLMQuestions = () => {
    const [age, setAge] = useState<string | null>(null);
    const [experience, setExperience] = useState<number | null>(null);

    const [q_fetch, setQFetch] = useState(false);
    const [e_fetch, setEFetch] = useState(false);
    const [q_data, setQData] = useState<LLM_API_Question_Type | null>(null);
    const [e_data, setEData] = useState<LLM_API_Explanation_Type | null>(null);

    console.log(q_data);

    const handleNextQButtonClick = () => {
        setQFetch(true);
        setQData(null);
        setEData(null);
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
                <GetQuestion
                    setQData={setQData}
                    setQFetch={setQFetch}
                    setEData={setEData}
                    setEFetch={setEFetch}
                    q_fetch={q_fetch}
                    q_data={q_data}
                    e_fetch={e_fetch}
                    e_data={e_data}
                    age={age}
                    experience={experience}
                />
                {/* Explanation if wrongfully answered */}
                <ExplainAnswer
                    setEData={setEData}
                    setEFetch={setEFetch}
                    e_fetch={e_fetch}
                    e_data={e_data}
                    q_data={q_data}
                    age={age}
                    experience={experience}
                />
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
                    disabled={q_data === null || e_fetch}
                    onClick={handleNextQButtonClick}
                >
                    {!age || !experience
                        ? "Tell age and experience first"
                        : "Next question"}
                </Button>
            </Box>
        </>
    );
};

export default AnonymousLLMQuestions;
