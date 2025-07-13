import { Box, Typography, Card, CardContent, CircularProgress, Button, Modal, Chip, Paper } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js";
import { disconnectClientLLM } from "../../utils/LLMDisconnector";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

type StatsType = {
    [topic: string]: { correct: number; total: number };
};

type GuestDashboardProps = {
    stats: StatsType;
    age: string;
    experience: number;
    session: string;
};

const MAX_TOPICS_PER_CHART = 8;

const Dashboard = ({ stats, age, experience, session }: GuestDashboardProps) => {
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [countdown, setCountdown] = useState(10);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const countdownRef = useRef<NodeJS.Timeout | null>(null);
    const sessionStart = useRef(Date.now());
    const totalCorrect = Object.values(stats).reduce((sum, s) => sum + s.correct, 0);
    const totalQuestions = Object.values(stats).reduce((sum, s) => sum + s.total, 0);
    const sessionDuration = Math.round((Date.now() - sessionStart.current) / 60000);

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
                setFeedback("We couldn't load your feedback at the moment. Error: " + error);
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
                if (counter <= 0) disconnectClientLLM(session);
                navigate({ to: "/" });
            }, 1000);
        }, 60000);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (countdownRef.current) clearInterval(countdownRef.current);
        };
    }, [navigate, session]);

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
        const labels = Object.keys(subset).map((t) => t.charAt(0).toUpperCase() + t.slice(1));
        const values = labels.map((l) =>
            subset[l.toLowerCase()]?.total > 0
                ? (subset[l.toLowerCase()].correct / subset[l.toLowerCase()].total) * 100
                : 0
        );
        return (
            <Card key={index} sx={{ p: 2 }}>
                <CardContent>
                    <Typography variant="h6" align="center">
                        Performance by Topic
                    </Typography>
                    <Box sx={{ height: 250, position: "relative" }}>
                        <Radar
                            data={{
                                labels,
                                datasets: [
                                    {
                                        label: "Performance",
                                        data: values,
                                        backgroundColor: "rgba(54,162,235,0.2)",
                                        borderColor: "rgba(54,162,235,1)",
                                        borderWidth: 2
                                    }
                                ]
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: { r: { min: 0, max: 100 } }
                            }}
                        />
                    </Box>
                </CardContent>
            </Card>
        );
    };

    return (
        <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>
                🔒 SeQG - Your Cybersecurity Assessment Results
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3,1fr)" }, gap: 2, mb: 3 }}>
                <Card>
                    <CardContent sx={{ textAlign: "center" }}>
                        <Typography variant="h3">{Math.round((totalCorrect / totalQuestions) * 100)}%</Typography>
                        <Typography variant="h6">Overall Score</Typography>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent sx={{ textAlign: "center" }}>
                        <Typography variant="h3">{sessionDuration}</Typography>
                        <Typography variant="h6">Minutes</Typography>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent sx={{ textAlign: "center" }}>
                        <Chip label={experience} color="info" />
                        <Typography variant="h6">Experience</Typography>
                        <Typography variant="body2">Age: {age}</Typography>
                    </CardContent>
                </Card>
            </Box>

            {chunkedTopics.map((chunk, i) => renderRadarChart(chunk, i))}

            <Card sx={{ my: 3 }}>
                <CardContent>
                    <Typography variant="h6">🎯 Personalized Feedback</Typography>
                    {loading ? (
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 2 }}>
                            <CircularProgress />
                            <Typography>Generating feedback...</Typography>
                        </Box>
                    ) : (
                        <Typography>{feedback}</Typography>
                    )}
                </CardContent>
            </Card>

            <Button variant="contained" onClick={handleReturn}>
                Return to Main Screen
            </Button>

            <Modal open={showModal}>
                <Paper
                    sx={{
                        p: 3,
                        textAlign: "center",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)"
                    }}
                >
                    <Typography variant="h6">Are you still viewing?</Typography>
                    <Typography>Returning in {countdown} sec...</Typography>
                    <Button variant="contained" onClick={handleStay}>
                        I'm still here!
                    </Button>
                </Paper>
            </Modal>
        </Box>
    );
};

export default Dashboard;
