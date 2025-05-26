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

const LOCAL_SERVER = "192.168.2.80";
const VITE_PORT = 5173;

const PrivateMode = () => {
    const navigate = useNavigate();
    const [session, setSession] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [status, setStatus] = useState<STATUS>("pending"); // only for client

    useEffect(() => {
        fetch(`http://${LOCAL_SERVER}:3001/connect/host`)
            .then((res) => res.json())
            .then(({ session, token }) => {
                setSession(session);
                setToken(token);
            });
    }, []);

    useEffect(() => {
        if (session && token) {
            const socket = io(`http://${LOCAL_SERVER}:3001`);
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
