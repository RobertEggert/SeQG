import { Paper, Typography } from "@mui/material";
import { Handle, Position, useNodeConnections } from "@xyflow/react";

const PaperNode = ({ data }: { data: { label: string; pos: string; isCorrect?: boolean } }) => {
    const connections = useNodeConnections({});

    const isSource = data.pos === "left";
    const isWrongColor = data.isCorrect === false ? "rgba(255, 0, 0, 0.4)" : undefined;

    return (
        <Paper
            sx={{
                padding: 1,
                position: "relative",
                width: 150,
                minHeight: 20,
                backgroundColor: isWrongColor
            }}
            elevation={4}
        >
            <Typography align="center" fontSize={10}>
                {data.label}
            </Typography>
            {isSource && (
                <Handle
                    type="source"
                    position={Position.Right}
                    style={{
                        background: "#1976d2",
                        border: "2px solid #fff"
                    }}
                    isConnectable={connections.length < 1}
                />
            )}
            {!isSource && (
                <Handle
                    type="target"
                    position={Position.Left}
                    style={{
                        background: "#1976d2",
                        border: "2px solid #fff"
                    }}
                    isConnectable={connections.length < 1}
                />
            )}
        </Paper>
    );
};

export default PaperNode;
