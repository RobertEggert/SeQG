import { useCallback, useEffect } from "react";
import {
    ReactFlow,
    Controls,
    Background,
    type Connection,
    useEdgesState,
    useNodesState,
    type Edge,
    type Node,
    Position,
    Handle
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Box, Button, Paper, Typography } from "@mui/material";
import type { QuestionTypeProps } from "../LLMInteraction/QuestionTypeRecognizer";
import submitAnswer from "../LLMInteraction/AnswerHandeling";
import DeleteIcon from "@mui/icons-material/Delete";
import { flexAlignRow } from "../../styling/theme";

type CustomNode = Node;
type CustomEdge = Edge;

const CardNode = ({ data }: { data: { label: string; pos: string } }) => {
    const isSource = data.pos === "left";
    return (
        <Paper sx={{ padding: 1, position: "relative", width: 150, minHeight: 20 }} elevation={4}>
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
                />
            )}
        </Paper>
    );
};

const nodeTypes = {
    cardNode: CardNode
};

const LineConnectEvent = ({
    handleNextQuestion,
    setExplanationState,
    setAnswerCorrect,
    questionData,
    explanationState,
    answerCorrect,
    userId
}: QuestionTypeProps) => {
    // Initialize edges state with CustomEdge type
    const [edges, setEdges, onEdgesChange] = useEdgesState<CustomEdge>([]);
    const halfPoint = Math.ceil(questionData.option_s.length / 2);
    const isDisabled =
        explanationState.e_data !== null || explanationState.e_fetch || answerCorrect === true || edges.length === 0;
    const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode>([]);
    // const [isFeedback, setIsFeedback] = useState(false);

    // Initialize nodes only once when component mounts
    useEffect(() => {
        setNodes([
            ...questionData.option_s.slice(0, halfPoint).map((option, index) => ({
                id: `left-${index}`,
                type: "cardNode",
                position: { x: 50, y: 100 + index * 100 },
                data: { label: option, pos: "left" }
            })),
            ...questionData.option_s.slice(halfPoint).map((option, index) => ({
                id: `right-${index}`,
                type: "cardNode",
                position: { x: 350, y: 100 + index * 100 },
                data: { label: option, pos: "right" }
            }))
        ]);
        console.log(nodes);
    }, [questionData.option_s, halfPoint, setNodes]);

    // Handle new connections
    const onConnect = useCallback(
        (params: Connection) => {
            // Prevent connections within the same column
            const isSameColumn = params.source?.startsWith("left") === params.target?.startsWith("left");

            if (!isSameColumn && params.source && params.target) {
                setEdges((eds) => {
                    // Remove existing connections for these nodes
                    const newEdges = eds.filter(
                        (e) =>
                            !(
                                (e.source === params.source && e.target === params.target) ||
                                (e.source === params.target && e.target === params.source)
                            )
                    );

                    // Create the new edge
                    const newEdge = {
                        id: `${params.source}-${params.target}`,
                        source: params.source,
                        target: params.target,
                        type: "smoothstep",
                        animated: true,
                        style: { stroke: "#1976d2", strokeWidth: 2 }
                    };

                    return [...newEdges, newEdge];
                });
            }
        },
        [setEdges]
    );

    const handleSubmit = () => {
        // Validate connections
        const isCorrect = true;
        // setIsFeedback(true);
        submitAnswer(userId, isCorrect, questionData, setAnswerCorrect, setExplanationState, handleNextQuestion);
    };

    const handleRevert = () => setEdges([]);

    return (
        <>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                {questionData?.question}
            </Typography>

            {/* React Flow container */}
            <Box sx={{ height: 500, width: "100%", position: "relative" }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    panOnDrag={false}
                    zoomOnScroll={false}
                    zoomOnPinch={false}
                    zoomOnDoubleClick={false}
                    nodesDraggable={false}
                    fitView
                    connectionRadius={30}
                    onlyRenderVisibleElements={false}
                >
                    <Background />
                    <Controls showInteractive={false} />
                </ReactFlow>
            </Box>

            <Box sx={{ ...flexAlignRow, gap: 2, marginTop: 2 }}>
                <Button variant="contained" onClick={handleSubmit} disabled={isDisabled}>
                    Submit Answer
                </Button>
                <Button startIcon={<DeleteIcon />} variant="contained" onClick={handleRevert} disabled={isDisabled}>
                    Revert Answers
                </Button>
            </Box>
        </>
    );
};

export default LineConnectEvent;
