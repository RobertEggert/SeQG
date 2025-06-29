import React from "react";
import { useDrop } from "react-dnd";
import { Box, Typography } from "@mui/material";
import type { DragItemType } from "./DragItem";

const DropZone = ({
    dropCategory,
    zoneIndex,
    onDrop,
    children
}: {
    dropCategory: string;
    zoneIndex: number;
    onDrop: (item: DragItemType, zone: number) => void;
    children: React.ReactNode;
}) => {
    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: "option",
        drop: (item: DragItemType) => {
            onDrop(item, zoneIndex);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    }));

    return dropRef(
        <div>
            <Box
                sx={{
                    border: "2px dashed black",
                    borderRadius: 2,
                    padding: 2,
                    minHeight: 150,
                    backgroundColor: isOver ? "#e0f7fa" : "#f9f9f9"
                }}
            >
                <Typography variant="h6">{dropCategory}</Typography>
                {children}
            </Box>
        </div>
    );
};

export default DropZone;
