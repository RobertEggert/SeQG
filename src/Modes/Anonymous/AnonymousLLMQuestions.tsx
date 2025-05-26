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
import { useState } from "react";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";

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

const AnonymousLLMQuestions = () => {
    const [age, setAge] = useState("");

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    return (
        <>
            <Typography color="green">✅ Connected</Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center"
                }}
            >
                <Typography>What is your age? </Typography>
                <FormControl sx={{ m: 2, minWidth: 220 }}>
                    <InputLabel id="demo-simple-select-helper-label">
                        Age
                    </InputLabel>
                    <Select
                        sx={{ flex: "display", alignItems: "center" }}
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={age}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value="Do not wish to answer">
                            Do not wish to answer
                        </MenuItem>
                        <MenuItem value={10}>{"< 18"}</MenuItem>
                        <MenuItem value={20}>{"18 <= 27"}</MenuItem>
                        <MenuItem value={30}>{"30 +"}</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center"
                }}
            >
                <Typography>
                    What is your current experience in Cybersecurity?{" "}
                </Typography>
                <Rating
                    name="highlight-selected-only"
                    defaultValue={2}
                    getLabelText={(value: number) => customIcons[value].label}
                    IconContainerComponent={IconContainer}
                    highlightSelectedOnly
                />
            </Box>
        </>
    );
};

export default AnonymousLLMQuestions;
