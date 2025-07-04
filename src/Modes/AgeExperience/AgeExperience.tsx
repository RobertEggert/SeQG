import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Rating,
    Select,
    Typography,
    type IconContainerProps,
    type SelectChangeEvent
} from "@mui/material";
import { type Dispatch, type SetStateAction, type SyntheticEvent } from "react";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import { flexAlignRow } from "../../styling/theme";
import ConfirmDialog from "./ConfirmDialog";
import type { QuestionStateType } from "../../utils/LLMFetcher";

type AgeExprienceType = {
    setIsProfileSubmitted: Dispatch<SetStateAction<boolean>>;
    setQuestionState: Dispatch<SetStateAction<QuestionStateType>>;
    setAge: React.Dispatch<React.SetStateAction<string | null>>;
    setExperience: React.Dispatch<React.SetStateAction<number | null>>;
    age: string | null;
    experience: number | null;
    isPriv: boolean;
    userId?: string;
};

const customIcons: {
    [lvl: number]: { icon: React.ReactElement };
} = {
    1: { icon: <SentimentVeryDissatisfiedIcon color="error" /> },
    2: { icon: <SentimentDissatisfiedIcon color="error" /> },
    3: { icon: <SentimentSatisfiedIcon color="warning" /> },
    4: { icon: <SentimentSatisfiedAltIcon color="success" /> },
    5: { icon: <SentimentVerySatisfiedIcon color="success" /> }
};

const IconContainer = ({ value, ...other }: IconContainerProps) => {
    return <span {...other}>{customIcons[value].icon}</span>;
};

const AgeExperience = ({
    setIsProfileSubmitted,
    setQuestionState,
    setAge,
    setExperience,
    age,
    experience,
    isPriv,
    userId
}: AgeExprienceType) => {
    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    const handleExperienceChange = (_: SyntheticEvent, newValue: number | null) => {
        if (newValue !== null) setExperience(newValue);
    };

    return (
        <>
            {/* Age Selector */}
            <Box
                sx={{
                    ...flexAlignRow,
                    gap: 2
                }}
            >
                <Typography>What is your age?</Typography>
                <FormControl sx={{ m: 2, minWidth: 220 }}>
                    <InputLabel id="age-select-label">Age</InputLabel>
                    <Select
                        labelId="age-select-label"
                        id="age-select"
                        value={age ?? ""}
                        label="Age"
                        onChange={(e) => handleChange(e as SelectChangeEvent<string>)}
                    >
                        <MenuItem value="Do not wish to answer">Do not wish to answer</MenuItem>
                        <MenuItem value="< 18">{"< 18"}</MenuItem>
                        <MenuItem value="18 <= 27">{"18 <= 27"}</MenuItem>
                        <MenuItem value="30 +">{"30 +"}</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Experience Selector */}
            <Box
                sx={{
                    ...flexAlignRow,
                    gap: 2
                }}
            >
                <Typography>What is your Cybersecurity Experience:</Typography>
                <Rating
                    name="experience-rating"
                    defaultValue={2}
                    max={5}
                    value={experience}
                    onChange={handleExperienceChange}
                    IconContainerComponent={IconContainer}
                    highlightSelectedOnly
                />
            </Box>
            {/* Confirmation Dialog */}
            <ConfirmDialog
                setIsProfileSubmitted={setIsProfileSubmitted}
                setQuestionState={setQuestionState}
                age={age}
                experience={experience}
                isPriv={isPriv}
                userId={userId}
            />
        </>
    );
};

export default AgeExperience;
