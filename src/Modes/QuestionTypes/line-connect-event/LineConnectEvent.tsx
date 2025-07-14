import { useCallback, useEffect } from "react";
import {
    ReactFlow,
    Controls,
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
import QuestionBubble from "../../LLMInteraction/QuestionBubble";

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
    const [edges, setEdges, onEdgesChange] = useEdgesState<CustomEdge>([]);
    const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode>([]);

    const halfPoint = Math.ceil(questionData.option_s.length / 2);
    const isDisabled =
        explanationState.e_data !== null || explanationState.e_fetch || answerCorrect === true || edges.length === 0;

    // initialize
    useEffect(() => {
        setNodes([
            ...questionData.option_s.slice(0, halfPoint).map((option, index) => ({
                id: `${index}`,
                type: "paperNode",
                position: { x: 50, y: 100 + index * 100 },
                data: { label: option, pos: "left", isCorrect: undefined }
            })),
            ...questionData.option_s.slice(halfPoint).map((option, index) => ({
                id: `${index + halfPoint}`,
                type: "paperNode",
                position: { x: 350, y: 100 + index * 100 },
                data: { label: option, pos: "right", isCorrect: undefined }
            }))
        ]);
    }, [questionData.option_s, halfPoint, setNodes]);

    // Handle new connections
    const onConnect = useCallback(
        (params: Connection) => {
            const sourceIndex = parseInt(params.source ?? "", 10);
            const targetIndex = parseInt(params.target ?? "", 10);

            if (isNaN(sourceIndex) || isNaN(targetIndex)) return;

            const sourceIsLeft = sourceIndex < halfPoint;
            const targetIsLeft = targetIndex < halfPoint;

            const isSameColumn = sourceIsLeft === targetIsLeft;

            if (!isSameColumn && params.source && params.target) {
                setEdges((eds) => {
                    const newEdges = eds.filter(
                        (e) =>
                            !(
                                (e.source === params.source && e.target === params.target) ||
                                (e.source === params.target && e.target === params.source)
                            )
                    );

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
        [halfPoint, setEdges]
    );

    const handleFeedback = (correctConnections: [string, string][]) => {
        console.log("The correct answers would be: ", correctConnections);
        // check if the edges on the nodes are correct ==> this means you can automatically make two nodes at a time red or give them no color
        // you would later reset the nodes but only the "isCorrect" boolean ofcourse, this will automatically change the color in the PaperNode component
    };

    const handleSubmit = () => {
        const correctAnswer_s = questionData.correctAnswer_s;
        const correctConnections: [string, string][] = [];
        // make pairs for correct connections (maybe let this llm do later?)
        // we assume an even length from the llm
        for (let i = 0; i < correctAnswer_s.length; i += 2) {
            const a = correctAnswer_s[i].toString();
            const b = correctAnswer_s[i + 1].toString();
            correctConnections.push([a, b]);
        }
        const isCorrect = edges.every((edge) =>
            correctConnections.some(
                ([a, b]) => (a === edge.source && b === edge.target) || (a === edge.target && b === edge.source)
            )
        );
        handleFeedback(correctConnections);
        submitAnswer(userId, isCorrect, questionData, setAnswerCorrect, setExplanationState, handleNextQuestion);
    };

    const handleRevert = () => setEdges([]);

    return (
        <>
            <Typography variant="h6">
                <QuestionBubble question={questionData?.question ?? ""} mode={userId ? "PRIVATE" : "GUEST"} />
            </Typography>

            {/* React Flow container */}
            <Box
                sx={{
                    position: "relative",
                    top: -100,
                    height: 400,
                    width: "100%",
                    minWidth: 1000 // or larger depending on your layout
                }}
            >
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    nodesDraggable={false}
                    panOnDrag={false}
                    panOnScroll={false}
                    autoPanOnConnect={false}
                    preventScrolling={false}
                    zoomOnScroll={false}
                    zoomOnPinch={false}
                    zoomOnDoubleClick={false}
                    minZoom={1}
                    maxZoom={1}
                    fitView
                    connectionRadius={30}
                    onlyRenderVisibleElements={false}
                >
                    <Controls showZoom={false} showFitView={false} showInteractive={false} />
                </ReactFlow>
            </Box>

            <Box sx={{ position: "relative", ...flexAlignRow, gap: 2, top: -100 }}>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={isDisabled || Math.floor(nodes.length / 2) !== edges.length}
                >
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
