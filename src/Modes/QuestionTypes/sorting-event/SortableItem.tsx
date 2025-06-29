import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box, Card, Typography } from "@mui/material";
import type { FC } from "react";

type SortingItemProps = {
    id: number;
    option: string;
    isFeedback: boolean;
    handleFeedbackColor: (index: number) => string;
};
const SortableItem: FC<SortingItemProps> = ({ id, option, isFeedback, handleFeedbackColor }: SortingItemProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const smoothMove = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <Card
            elevation={4}
            sx={{
                cursor: "pointer",
                padding: 1.5,
                marginTop: 1,
                ...smoothMove,
                backgroundColor: isFeedback ? handleFeedbackColor(id) : "white"
            }}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
        >
            <Box>
                <Typography>{option}</Typography>
            </Box>
        </Card>
    );
};

export default SortableItem;
