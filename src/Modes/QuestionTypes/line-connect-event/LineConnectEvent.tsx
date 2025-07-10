import { useCallback, useEffect } from "react";
import {
    ReactFlow,
    Controls,
    Background,
    type Connection,
    useEdgesState,
    useNodesState,
    type Edge,
    type Node
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Box, Button, Typography } from "@mui/material";
import type { QuestionTypeProps } from "../../LLMInteraction/QuestionTypeRecognizer";
import submitAnswer from "../../LLMInteraction/AnswerHandeling";
import DeleteIcon from "@mui/icons-material/Delete";
import { flexAlignRow } from "../../../styling/theme";
import PaperNode from "./PaperNode";

type CustomNode = Node;
type CustomEdge = Edge;

const nodeTypes = {
    paperNode: PaperNode
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
    const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode>([]);

    const halfPoint = Math.ceil(questionData.option_s.length / 2);
    const isDisabled =
        explanationState.e_data !== null || explanationState.e_fetch || answerCorrect === true || edges.length === 0;

    // initialize
    useEffect(() => {
        setNodes([
            ...questionData.option_s.slice(0, halfPoint).map((option, index) => ({
                id: `left-${index}`,
                type: "paperNode",
                position: { x: 50, y: 100 + index * 100 },
                data: { label: option, pos: "left", isCorrect: undefined }
            })),
            ...questionData.option_s.slice(halfPoint).map((option, index) => ({
                id: `right-${index}`,
                type: "paperNode",
                position: { x: 350, y: 100 + index * 100 },
                data: { label: option, pos: "right", isCorrect: undefined }
            }))
        ]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questionData.option_s, halfPoint]);

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

    const handleFeedback = () => {
        const checkIsCorrect = () => {
            return false;
        };
        // check if the edges on the nodes are correct ==> this means you can automatically make two nodes at a time red or give them no color
    };

    const handleSubmit = () => {
        // Validate connections
        const isCorrect = false;
        handleFeedback();
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
                    nodesDraggable={false}
                    panOnDrag={false}
                    zoomOnScroll={false}
                    zoomOnPinch={false}
                    zoomOnDoubleClick={false}
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
