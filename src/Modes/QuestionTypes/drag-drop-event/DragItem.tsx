import { Box, Paper, Typography } from "@mui/material";
import { useRef, useEffect } from "react";
import { useDrag } from "react-dnd";

export type DragItemType = {
    index: number;
    text: string;
};

const DragItem = ({
    text,
    index,
    isFeedback,
    handleFeedbackColor
}: {
    text: string;
    index: number;
    isFeedback: boolean;
    handleFeedbackColor: (index: number) => string;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "option",
        item: { index, text },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }));

    useEffect(() => {
        drag(ref);
    }, [drag]);

    return (
        <Box ref={ref}>
            <Paper
                sx={{
                    padding: 2,
                    margin: 1,
                    backgroundColor: isFeedback ? handleFeedbackColor(index) : isDragging ? "grey" : "white",
                    cursor: "move",
                    opacity: isDragging ? 0.5 : 1,
                    transform: isDragging ? "scale(1.05)" : "scale(1)",
                    transition: "transform 0.2s, opacity 0.2s"
                }}
                elevation={isDragging ? 6 : 3}
            >
                <Typography sx={{ userSelect: "none" }}>{text}</Typography>
            </Paper>
        </Box>
    );
};

export default DragItem;
