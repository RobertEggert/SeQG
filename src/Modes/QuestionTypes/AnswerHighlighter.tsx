import { Button } from "@mui/material";
/* ***************************
 THIS WILL BE ONLY USED FOR:
SINGLE CHOCIE EVENT
MULTIPLE CHOICE EVENT
THINK EVENT
 *************************** */

type AnswerHighlighterProps = {
    index: number;
    option: string;
    isDisabled: boolean;
    isFeedback: boolean;
    isCorrect: boolean;
    isSelected: boolean;
    handleSelection: (index: number) => void;
};

const AnswerHighlighter = ({
    index,
    option,
    isDisabled,
    isFeedback,
    isCorrect,
    isSelected,
    handleSelection
}: AnswerHighlighterProps) => {
    const handleColor = () => {
        if (!isFeedback) return undefined;
        if (isCorrect) {
            return "rgba(60, 179, 113, 0.4)";
        }
        if (!isCorrect && isSelected) {
            return "rgba(255, 0, 0, 0.4)";
        }
        return undefined;
    };

    const handleContained = () => {
        if (!isFeedback) return isSelected ? "contained" : "outlined";
        return undefined;
    };
    return (
        <Button
            key={index}
            variant={handleContained()}
            color={isSelected ? "primary" : "inherit"}
            disabled={isDisabled}
            onClick={() => handleSelection(index)}
            sx={{
                backgroundColor: handleColor(),
                outline: isSelected && isFeedback ? 2 : undefined,
                outlineColor: "black",
                margin: 2
            }}
        >
            {option}
        </Button>
    );
};

export default AnswerHighlighter;
