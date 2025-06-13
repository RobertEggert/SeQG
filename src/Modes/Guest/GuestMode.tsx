import { Box, Paper, Typography } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import GuestLLMQuestions from "./GuestLLMQuestions";
import { useNavigate } from "@tanstack/react-router";
import { colorModes, flexAlignColumn } from "../../styling/theme";

type STATUS =
    | "pending"
    | "connected"
    | "disconnected"
    | "already_connected"
    // in progress
    | "invalid_token"
    | "invalid_role";

const GuestMode = () => {
    const navigate = useNavigate();
    const [session, setSession] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [status, setStatus] = useState<STATUS>("pending"); // only for client

    const LOCAL_SERVER = import.meta.env.VITE_LOCAL_ADDRESS || "192.168.2.80";
    const BE_PORT = import.meta.env.VITE_BE_PORT || 3001;
    const VITE_PORT = import.meta.env.VITE_VITE_PORT || 5173;

    useEffect(() => {
        fetch(`http://${LOCAL_SERVER}:${BE_PORT}/connect/host`)
            .then((res) => res.json())
            .then(({ session, token }) => {
                setSession(session);
                setToken(token);
            });
    }, [BE_PORT, LOCAL_SERVER]);

    useEffect(() => {
        if (session && token) {
            const socket = io(`http://${LOCAL_SERVER}:${BE_PORT}`);
            socket.on("connect", () => {
                socket.emit("register", { token, role: "host" });
            });

            socket.on("status", (msg) => {
                console.log("Status:", msg);
                if (msg === "connected") setStatus("connected");
                else if (msg === "disconnected") setStatus("disconnected");
            });

            return () => {
                socket.disconnect();
            };
        }
    }, [BE_PORT, LOCAL_SERVER, session, token]);

    if (!session || !token) return null;

    const connectUrl = `http://${LOCAL_SERVER}:${VITE_PORT}/client-connect/guest/${session}?token=${token}`;
    console.log(connectUrl);
    return (
        <Box
            sx={{
                backgroundColor: colorModes.guest,
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
                <Typography fontSize={40}>Guest Mode</Typography>
                {status === "connected" ? (
                    <GuestLLMQuestions />
                ) : (
                    <>
                        {status === "disconnected" && navigate({ to: "/" })}
                        {status === "pending" && (
                            <>
                                <Typography>Scan this QR Code:</Typography>
                                <QRCodeSVG value={connectUrl} size={200} />
                            </>
                        )}
                    </>
                )}
            </Paper>
        </Box>
    );
};

export default GuestMode;
