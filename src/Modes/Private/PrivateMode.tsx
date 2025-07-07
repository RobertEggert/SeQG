import { Box, Paper, Typography } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "@tanstack/react-router";
import { flexAlignColumn } from "../../styling/theme";
import PrivateLLMQuestions from "./PrivateLLMQuestions";
import FadedComponent from "../../utils/FadedComponent";
import type { STATUS } from "../../utils/types";
import Background from "../../MainScreen/MainScreenComponents/Background";
import EndSessionButton from "../EndSessionButton";
import { disconnectClientLLM } from "../../utils/LLMDisconnector";

const PrivateMode = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [privateSession, setPrivateSession] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [status, setStatus] = useState<STATUS>("pending");
    const hasFetchedRef = useRef(false);

    const LOCAL_SERVER = import.meta.env.VITE_LOCAL_ADDRESS || "NO_IP";
    const BE_PORT = import.meta.env.VITE_BE_PORT || 3001;
    const VITE_PORT = import.meta.env.VITE_VITE_PORT || 5173;

    useEffect(() => {
        if (hasFetchedRef.current) return;
        hasFetchedRef.current = true;

        const fetchHostData = async () => {
            try {
                const res = await fetch(`http://${LOCAL_SERVER}:${BE_PORT}/connect/host`);
                const data = await res.json();

                if (data.status === "already_connected") {
                    console.warn("Host already connected.");
                    navigate({ to: "/host-mode/prohibited" });
                }

                const { session, token } = data;
                setPrivateSession(session);
                setToken(token);
            } catch (error) {
                console.error("Failed to connect to host:", error);
            }
        };

        fetchHostData();
    }, [BE_PORT, LOCAL_SERVER, navigate]);

    useEffect(() => {
        if (privateSession && token) {
            const socket = io(`http://${LOCAL_SERVER}:${BE_PORT}`);
            socket.on("connect", () => {
                socket.emit("register-private", {
                    token,
                    role: "host",
                    userId: "host-id"
                });
            });

            socket.on("status", (msg) => {
                if (msg === "connected") setStatus("connected");
                else if (msg === "disconnected") navigate({ to: "/" });
            });

            socket.on("client-id", ({ userId }) => {
                setUserId(userId);
            });

            return () => {
                socket.disconnect();
            };
        }
    }, [BE_PORT, LOCAL_SERVER, navigate, privateSession, token]);

    if (!privateSession || !token) return null;

    const connectUrl = `http://${LOCAL_SERVER}:${VITE_PORT}/client-connect/private/${privateSession}?token=${token}`;

    return (
        <Box>
            <Background />
            <Box
                sx={{
                    ...flexAlignColumn,
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100vw",
                    height: "100vh",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        ...flexAlignColumn,
                        marginTop: 10,
                        padding: 10,
                        width: "70%",
                        height: "70%",
                        position: "relative"
                    }}
                >
                    <EndSessionButton
                        onEndSession={() => {
                            disconnectClientLLM(privateSession);
                        }}
                    />
                    {status === "connected" ? (
                        <PrivateLLMQuestions userId={userId} session={privateSession} />
                    ) : (
                        <>
                            {status === "pending" && (
                                <>
                                    <FadedComponent timeout={3000}>
                                        <Box sx={{ marginBottom: 4 }}>
                                            <Typography
                                                variant="h5"
                                                align="center"
                                                sx={{
                                                    fontStyle: "italic",
                                                    color: "text.secondary"
                                                }}
                                            >
                                                Welcome to the private mode!
                                            </Typography>
                                            <Typography variant="body1" align="center" sx={{ color: "text.secondary" }}>
                                                Scan this QR code to log in!
                                            </Typography>
                                        </Box>
                                    </FadedComponent>

                                    <QRCodeSVG value={connectUrl} size={200} />

                                    <Typography
                                        align="center"
                                        sx={{
                                            paddingTop: "22rem",
                                            color: "text.secondary",
                                            fontSize: 16,
                                            userSelect: "none"
                                        }}
                                    >
                                        In this mode, you will get personalised content based on your profile and
                                        performance. <br />
                                        You can close the session whenever you like by closing the tab or pressing the
                                        button on your phone screen.
                                    </Typography>
                                </>
                            )}
                        </>
                    )}
                </Paper>
            </Box>
        </Box>
    );
};

export default PrivateMode;
