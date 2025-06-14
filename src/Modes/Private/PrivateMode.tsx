import { Box, Paper, Typography, Fade } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "@tanstack/react-router";
import { colorModes, flexAlignColumn } from "../../styling/theme";
import PrivateLLMQuestions from "./PrivateLLMQuestions";

type STATUS =
    | "pending"
    | "connected"
    | "disconnected"
    | "already_connected"
    // in progress
    | "invalid_token"
    | "invalid_role";

const PrivateMode = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [privateSession, setPrivateSession] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [status, setStatus] = useState<STATUS>("pending"); // only for client
    const [blink, setBlink] = useState(true);

    const LOCAL_SERVER = import.meta.env.VITE_LOCAL_ADDRESS || "192.168.2.80";
    const BE_PORT = import.meta.env.VITE_BE_PORT || 3001;
    const VITE_PORT = import.meta.env.VITE_VITE_PORT || 5173;

    useEffect(() => {
        fetch(`http://${LOCAL_SERVER}:${BE_PORT}/connect/host`)
            .then((res) => res.json())
            .then(({ session, token }) => {
                setPrivateSession(session);
                setToken(token);
            });
    }, [BE_PORT, LOCAL_SERVER]);

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
                console.log("Status:", msg);
                if (msg === "connected") setStatus("connected");
                else if (msg === "disconnected") setStatus("disconnected");
            });

            socket.on("client-id", ({ userId }) => {
                setUserId(userId);
                // You can store this in state, context, etc.
            });

            return () => {
                socket.disconnect();
            };
        }
    }, [BE_PORT, LOCAL_SERVER, privateSession, token]);

    useEffect(() => {
        if (status === "pending") {
            let visible = true;

            const toggleBlink = () => {
                setBlink(visible);
                visible = !visible;

                const nextDelay = visible ? 1000 : 7000;

                setTimeout(toggleBlink, nextDelay);
            };

            toggleBlink();

            return () => setBlink(true);
        } else {
            setBlink(false);
        }
    }, [status]);

    if (!privateSession || !token) return null;

    const connectUrl = `http://${LOCAL_SERVER}:${VITE_PORT}/client-connect/private/${privateSession}?token=${token}`;
    console.log(connectUrl);
    return (
        <Box
            sx={{
                backgroundColor: colorModes.private,
                display: "flex",
                justifyContent: "center",
                width: "100vw",
                height: "100vh"
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    ...flexAlignColumn,
                    marginTop: 10,
                    padding: 10,
                    width: "70%",
                    height: "70%"
                }}
            >
                <Typography fontSize={40}>Private Mode</Typography>
                {status === "connected" ? (
                    <PrivateLLMQuestions userId={userId} />
                ) : (
                    <>
                        {status === "disconnected" && navigate({ to: "/" })}
                        {status === "pending" && (
                            <>
                                <Fade in={blink} timeout={500}>
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
                                        <Typography
                                            variant="body1"
                                            align="center"
                                            sx={{ color: "text.secondary" }}
                                        >
                                            Scan this QR code to log in!
                                        </Typography>
                                    </Box>
                                </Fade>

                                <QRCodeSVG value={connectUrl} size={200} />

                                <Typography
                                    sx={{
                                        position: "absolute",
                                        bottom: 30,
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        color: "text.secondary",
                                        fontSize: 16,
                                        userSelect: "none"
                                    }}
                                >
                                    In this mode, you will get personalised
                                    content based on your profile and
                                    performance
                                    <br />
                                    <br />
                                </Typography>
                                <Typography
                                    sx={{
                                        position: "absolute",
                                        bottom: 10,
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        color: "text.secondary",
                                        fontSize: 16,
                                        userSelect: "none"
                                    }}
                                >
                                    You can close the session whenever you like
                                    by clossing the tab or logging out{" "}
                                </Typography>
                            </>
                        )}
                    </>
                )}
            </Paper>
        </Box>
    );
};

export default PrivateMode;
