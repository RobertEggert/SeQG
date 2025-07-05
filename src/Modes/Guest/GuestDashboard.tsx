import { Box, Typography, Paper, CircularProgress, Button, Modal } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js";
import { disconnectClientLLM } from "../../utils/LLMDisconnector";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

type StatsType = {
    [topic: string]: {
    correct: number;
    total: number;
    };
};

type GuestDashboardProps = {
    stats: StatsType;
    age: string;
    experience: number;
    session: string;
};

const MAX_TOPICS_PER_CHART = 8;

const GuestDashboard = ({ stats, age, experience, session }: GuestDashboardProps) => {
    const [feedback, setFeedback] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [countdown, setCountdown] = useState(10);

    const navigate = useNavigate();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const countdownRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                
                const res = await fetch("http://localhost:3002/api/guest-feedback", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ stats, age, experience })
                });

                const raw = await res.text();
                const start = raw.indexOf("{");
                const end = raw.lastIndexOf("}") + 1;
                const clean = raw.slice(start, end);
                const data = JSON.parse(clean);

                setFeedback(data.feedback);
            } catch (error) {
                console.error("Error fetching guest feedback:", error);
                setFeedback("We couldn't load your feedback at the moment.");
            } finally {
                setLoading(false);
            }
        };

        fetchFeedback();
    }, [stats, age, experience]);

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            setShowModal(true);
            let counter = 10;
            setCountdown(counter);
            countdownRef.current = setInterval(() => {
                counter--;
                setCountdown(counter);
                if (counter <= 0) navigate({ to: "/" });
            }, 1000);
        }, 60000);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (countdownRef.current) clearInterval(countdownRef.current);
        };
    }, [navigate]);

    const handleReturn = () => {
        disconnectClientLLM(session);
        navigate({ to: "/" });
    };

    const handleStay = () => {
        setShowModal(false);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (countdownRef.current) clearInterval(countdownRef.current);
    };

    const chunkedTopics = Object.entries(stats).reduce<StatsType[]>((acc, [topic, data], idx) => {
        const chunkIndex = Math.floor(idx / MAX_TOPICS_PER_CHART);
        if (!acc[chunkIndex]) acc[chunkIndex] = {};
        acc[chunkIndex][topic] = data;
        return acc;
    }, []);

    const renderRadarChart = (subset: StatsType, index: number) => {
        const labels = Object.keys(subset);
        const values = labels.map((topic) =>
            subset[topic].total > 0 ? (subset[topic].correct / subset[topic].total) * 100 : 0
        );

        const data = {
            labels,
            datasets: [
                {
                    label: "Performance (%)",
                    data: values,
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 2
                }
            ]
        };

        return (
            <Box key={index} sx={{ width: "100%", maxWidth: 600, height: 250, my: 2 }}>
                <Radar
                    data={data}
                    options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: { r: { min: 0, max: 100 } }
                    }}
                />
            </Box>
        );
    };

    return (
    <Box
        sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        overflowY: "auto",
        padding: 4
        }}
    >
        <Typography variant="h4" gutterBottom>
            🧠 Your Cybersecurity Awareness Summary
        </Typography>

        {chunkedTopics.map((chunk, index) => renderRadarChart(chunk, index))}

        <Paper
            elevation={3}
            sx={{
                p: 3,
                mt: 4,
                width: "100%",
                maxWidth: 800,
                backgroundColor: "#f7f9fc"
            }}
        >

        <Typography variant="h6" gutterBottom>
            🎯 Personalized Feedback
        </Typography>

        {loading ? (
            <>
            <Typography variant="body2" sx={{ mb: 2 }}>
                Generating personalized recommendations based on your performance...
            </Typography>
            <CircularProgress/>
            </>
        ) : (
            <Typography sx={{ whiteSpace: "pre-line" }}>{feedback}</Typography>
        )}
        </Paper>

        <Box sx={{ mt: 4 }}>
            <Button variant="contained" color="primary" size="large" onClick={handleReturn}>
                Return to Main Screen
            </Button>
        </Box>

        <Modal open={showModal}>
            <Paper
                elevation={5}
                sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                padding: 4,
                textAlign: "center"
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Are you still viewing your results?
                </Typography>

                <Typography variant="body2" gutterBottom>
                    Returning to main screen in {countdown} seconds...
                </Typography>

                <Button variant="contained" color="secondary" onClick={handleStay}>
                    I'm still here!
                </Button>
            </Paper>
        </Modal>
    </Box>
    );
};

export default GuestDashboard;
  