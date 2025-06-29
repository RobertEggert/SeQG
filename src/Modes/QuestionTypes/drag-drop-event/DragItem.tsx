import { Paper, Typography } from "@mui/material";
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
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: "option",
        item: { index, text },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }));

    return dragRef(
        <div>
            <Paper
                sx={{
                    padding: 2,
                    margin: 1,
                    backgroundColor: isFeedback ? handleFeedbackColor(index) : isDragging ? "grey" : "white",
                    cursor: "move"
                }}
                elevation={3}
            >
                <Typography>{text}</Typography>
            </Paper>
        </div>
    );
};

export default DragItem;
