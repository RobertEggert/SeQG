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

const SortableItem: FC<SortingItemProps> = ({ id, option, isFeedback, handleFeedbackColor }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    return (
        <Card
            elevation={4}
            sx={{
                cursor: "pointer",
                touchAction: "none",
                padding: 1.5,
                marginTop: 1,
                transform: transform ? CSS.Translate.toString(transform) : undefined,
                transition,
                width: "100%", // Ensures consistent width
                backgroundColor: isFeedback ? handleFeedbackColor(id) : "white",
                backfaceVisibility: "hidden",
                willChange: "transform"
            }}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
        >
            <Box>
                <Typography
                    sx={{
                        display: "inline-block",
                        width: "100%",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                    }}
                >
                    {option}
                </Typography>
            </Box>
        </Card>
    );
};

export default SortableItem;
