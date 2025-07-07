import { Box, Paper, Typography } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import GuestLLMQuestions from "./GuestLLMQuestions";
import { useNavigate } from "@tanstack/react-router";
import { flexAlignColumn } from "../../styling/theme";
import FadedComponent from "../../utils/FadedComponent";
import type { STATUS } from "../../utils/types";
import Background from "../../MainScreen/MainScreenComponents/Background";
import EndSessionButton from "../EndSessionButton";
import logoStart from "../../img/logoandtext.png"; // <-- IMPORTA AQUÍ EL LOGO
import { disconnectClientLLM } from "../../utils/LLMDisconnector";

const GuestMode = () => {
    const navigate = useNavigate();
    const [session, setSession] = useState<string | null>(null);
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
                    return;
                }

                const { session, token } = data;
                setSession(session);
                setToken(token);
            } catch (error) {
                console.error("Failed to connect to host:", error);
            }
        };

        fetchHostData();
    }, [BE_PORT, LOCAL_SERVER, navigate]);

    useEffect(() => {
        if (session && token) {
            const socket = io(`http://${LOCAL_SERVER}:${BE_PORT}`);
            socket.on("connect", () => {
                socket.emit("register", { token, role: "host" });
            });

            socket.on("status", (msg) => {
                if (msg === "connected") setStatus("connected");
                else if (msg === "disconnected") navigate({ to: "/" });
            });

            return () => {
                socket.disconnect();
            };
        }
    }, [BE_PORT, LOCAL_SERVER, navigate, session, token]);

    if (!session || !token) return null;

    const connectUrl = `http://${LOCAL_SERVER}:${VITE_PORT}/client-connect/guest/${session}?token=${token}`;
    console.log(connectUrl);

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
                            disconnectClientLLM(session);
                        }}
                    />
                    {status === "connected" ? (
                        <GuestLLMQuestions session={session} />
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
                                                Welcome to the guest mode!
                                            </Typography>
                                            <Typography variant="body1" align="center" sx={{ color: "text.secondary" }}>
                                                By scanning this QR code, you will start a session (no personal
                                                information is saved)
                                            </Typography>
                                        </Box>
                                    </FadedComponent>

                                    <Typography>Scan this Guest QR Code:</Typography>
                                    <QRCodeSVG value={connectUrl} size={200} />

                                    {/* LOGO ENTRE EL QR Y EL TEXTO FINAL */}
                                    <Box sx={{ marginTop: 3, marginBottom: 3 }}>
                                        <img src={logoStart} alt="Main Logo" style={{ width: 180 }} />
                                    </Box>

                                    <Typography
                                        align="center"
                                        sx={{
                                            color: "text.secondary",
                                            fontSize: 25,
                                            userSelect: "none"
                                        }}
                                    >
                                        In this mode, your experience will be based on your self assessment. <br />
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

export default GuestMode;
