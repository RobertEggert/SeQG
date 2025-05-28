import { Box, Paper, Typography } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import AnonymousLLMQuestions from "./AnonymousLLMQuestions";
import { useNavigate } from "@tanstack/react-router";
import { colorModes } from "../../styling/theme";
import dotenv from "dotenv";

dotenv.config();

type STATUS =
    | "pending"
    | "connected"
    | "disconnected"
    | "already_connected"
    // in progress
    | "invalid_token"
    | "invalid_role";

const LOCAL_SERVER = process.env.LOCAL_ADDRESS || "192.168.2.80";
const BE_PORT = process.env.BE_PORT || 3001;
const VITE_PORT = process.env.VITE_PORT || 5173;

const AnonymousMode = () => {
    const navigate = useNavigate();
    const [session, setSession] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [status, setStatus] = useState<STATUS>("pending"); // only for client

    useEffect(() => {
        fetch(`http://${LOCAL_SERVER}:${BE_PORT}/connect/host`)
            .then((res) => res.json())
            .then(({ session, token }) => {
                setSession(session);
                setToken(token);
            });
    }, []);

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
    }, [session, token]);

    if (!session || !token) return null;

    const connectUrl = `http://${LOCAL_SERVER}:${VITE_PORT}/connect/${session}?token=${token}`;
    console.log(connectUrl);
    return (
        <Box
            sx={{
                backgroundColor: colorModes.anonymous,
                display: "flex",
                justifyContent: "center",
                width: "100vw",
                height: "100vh"
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: 10,
                    padding: 10,
                    width: "70%",
                    height: "70%"
                }}
            >
                <Typography fontSize={40}>Anonymous Mode</Typography>
                {status === "connected" ? (
                    <AnonymousLLMQuestions />
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

export default AnonymousMode;
