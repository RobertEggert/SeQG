// DragPreview.tsx
import { usePreview } from "react-dnd-preview";
import { Box, Paper, Typography } from "@mui/material";

const DragPreview = () => {
    const preview = usePreview<{ index: string; text: string }>();

    if (!preview.display) {
        return null;
    }

    const { item, style } = preview;

    return (
        <Box style={{ ...style, zIndex: 100 }}>
            <Paper
                sx={{
                    padding: 2,
                    margin: 1,
                    backgroundColor: "white",
                    cursor: "grabbing",
                    boxShadow: 3,
                    transform: "scale(1.05)",
                    opacity: 0.9
                }}
                elevation={6}
            >
                <Typography>{item.text}</Typography>
            </Paper>
        </Box>
    );
};

export default DragPreview;
