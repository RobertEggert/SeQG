// src/routes/connect/$session.tsx
import { CircularProgress } from "@mui/material";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import type { STATUS } from "../../../utils/types";
import WelcomeToModeScreen from "../../../Modes/WelcomeToModeScreen";

export const Route = createFileRoute("/client-connect/private/$privateSession")({
    component: () => <PrivateSession />
});

const PrivateSession = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState<STATUS>("pending");
    const { privateSession } = Route.useParams();
    const LOCAL_ADDRESS = import.meta.env.VITE_LOCAL_ADDRESS || "NO_IP";
    const BE_PORT = import.meta.env.VITE_BE_PORT || 3001;

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        const socket: Socket = io(`http://${LOCAL_ADDRESS}:${BE_PORT}`);
        socket.on("connect", () => {
            if (!localStorage.getItem("SeQG-User-Key")) {
                const userId = uuidv4();
                localStorage.setItem("SeQG-User-Key", userId);
            }
            socket.emit("register-private", {
                token,
                role: "client",
                userId: localStorage.getItem("SeQG-User-Key")
            });
        });

        socket.on("status", (msg) => {
            if (msg !== "connected") {
                navigate({ to: `/client-connect/prohibited` });
            }
            setStatus("connected");
        });

        return () => {
            socket.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [BE_PORT, LOCAL_ADDRESS, privateSession]);

    if (status === "pending") {
        return <CircularProgress size={100} sx={{ display: "flex", justifyContent: "center" }} />;
    }

    return <WelcomeToModeScreen session={privateSession} mode="Private" />;
};

export default PrivateSession;
