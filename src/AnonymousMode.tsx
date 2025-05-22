import { Box, Typography } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

type STATUS = "pending" | "connected" | "disconnected";

const LOCAL_SERVER = "192.168.2.80";
const VITE_PORT = 5173;

const AnonymousMode = () => {
    const [session, setSession] = useState<string | null>(null);
    const [status, setStatus] = useState<STATUS>("pending");

    if (!session) {
        console.log("Generating new session ID...");
        const id = crypto.randomUUID();
        setSession(id);

        const ws = new WebSocket(`ws://${LOCAL_SERVER}:3001/ws/${id}`);

        if (ws.readyState === WebSocket.OPEN) {
            ws.onopen = () => console.log("WebSocket opened");

            ws.onmessage = (e) => {
                console.log("Received from server:", e.data);
                if (e.data === "connected") {
                    setStatus("connected");
                } else if (e.data === "disconnected") {
                    setStatus("disconnected");
                }
            };

            ws.onclose = () => {
                console.log("WebSocket closed");
            };

            return () => ws.close();
        }
    }

    const connectUrl = `http://${LOCAL_SERVER}:${VITE_PORT}/connect/${session}`;

    return (
        <Box>
            <Typography fontSize={40}>Anonymous Mode</Typography>
            {status === "connected" ? (
                <Typography color="green">✅ Connected</Typography>
            ) : (
                <>
                    {status === "disconnected" && (
                        <Typography color="red">
                            ❌ Disconnected — Scan QR Code again:
                        </Typography>
                    )}
                    {status === "pending" && (
                        <Typography>Scan this QR Code:</Typography>
                    )}
                    <QRCodeSVG value={connectUrl} size={200} />
                </>
            )}
        </Box>
    );
};

export default AnonymousMode;
