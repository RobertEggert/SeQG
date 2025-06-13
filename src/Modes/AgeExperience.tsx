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
import { flexAlignRow } from "../styling/theme";

type AgeExprienceType = {
    age: string | null;
    experience: number | null;
    setAge: Dispatch<SetStateAction<string | null>>;
    setExperience: Dispatch<SetStateAction<number | null>>;
};

const customIcons: {
    [index: number]: {
        icon: React.ReactElement;
        label: string;
    };
} = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon color="error" />,
        label: "Very Dissatisfied"
    },
    2: {
        icon: <SentimentDissatisfiedIcon color="error" />,
        label: "Dissatisfied"
    },
    3: { icon: <SentimentSatisfiedIcon color="warning" />, label: "Neutral" },
    4: {
        icon: <SentimentSatisfiedAltIcon color="success" />,
        label: "Satisfied"
    },
    5: {
        icon: <SentimentVerySatisfiedIcon color="success" />,
        label: "Very Satisfied"
    }
};

const IconContainer = ({ value, ...other }: IconContainerProps) => {
    return <span {...other}>{customIcons[value].icon}</span>;
};

const AgeExpreience = ({
    age,
    experience,
    setAge,
    setExperience
}: AgeExprienceType) => {
    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    const handleExperienceChange = (
        _: SyntheticEvent,
        newValue: number | null
    ) => {
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
                        value={age !== null ? age : ""}
                        label="Age"
                        onChange={(e) =>
                            handleChange(e as SelectChangeEvent<string>)
                        }
                    >
                        <MenuItem value="">Do not wish to answer</MenuItem>
                        <MenuItem value="< 18">{"< 18"}</MenuItem>
                        <MenuItem value="18 <= 27">{"18 <= 27"}</MenuItem>
                        <MenuItem value="30 +">{"30 +"}</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Experience Selector */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center"
                }}
            >
                <Typography>What is your Cybersecurity Experience:</Typography>
                <Rating
                    name="experience-rating"
                    defaultValue={2}
                    max={5}
                    value={experience}
                    onChange={handleExperienceChange}
                    getLabelText={(value: number) => customIcons[value].label}
                    IconContainerComponent={IconContainer}
                    highlightSelectedOnly
                />
            </Box>
        </>
    );
};

export default AgeExpreience;
