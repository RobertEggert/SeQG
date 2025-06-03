import { Box, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

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
    const [session, setSession] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [status, setStatus] = useState<STATUS>("pending"); // only for client

    const LOCAL_ADDRESS = import.meta.env.VITE_LOCAL_ADDRESS || "192.168.2.80";
    const BE_PORT = import.meta.env.VITE_BE_PORT || 3001;
    const VITE_PORT = import.meta.env.VITE_VITE_PORT || 5173;

    useEffect(() => {
        fetch(`http://${LOCAL_ADDRESS}:${BE_PORT}/connect/host`)
            .then((res) => res.json())
            .then(({ session, token }) => {
                setSession(session);
                setToken(token);
            });
    }, []);

    useEffect(() => {
        if (session && token) {
            const socket = io(`http://${LOCAL_ADDRESS}:${BE_PORT}`);
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
    }, [BE_PORT, LOCAL_ADDRESS, session, token]);

    if (!session || !token) return null;

    const connectUrl = `http://${LOCAL_ADDRESS}:${VITE_PORT}/connect/${session}?token=${token}`;
    console.log(connectUrl);
    return (
        <Box>
            <Typography fontSize={40}>Private Mode</Typography>
            {status === "connected" ? (
                <Typography color="green">✅ Connected</Typography>
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
        </Box>
    );
};

export default PrivateMode;
