// src/routes/connect/$session.tsx
import { CircularProgress } from "@mui/material";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import type { STATUS } from "../../../utils/types";
import WelcomeToModeScreen from "../../../Modes/WelcomeToModeScreen";

export const Route = createFileRoute("/client-connect/guest/$session")({
    component: () => <GuestSession />
});

const GuestSession = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState<STATUS>("pending");
    const { session } = Route.useParams();
    const LOCAL_ADDRESS = import.meta.env.VITE_LOCAL_ADDRESS || "NO_IP";
    const BE_PORT = import.meta.env.VITE_BE_PORT || 3001;

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        const socket: Socket = io(`http://${LOCAL_ADDRESS}:${BE_PORT}`);
        socket.on("connect", () => {
            socket.emit("register", { token, role: "client" });
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
    }, [BE_PORT, LOCAL_ADDRESS, session]);

    if (status === "pending") {
        return <CircularProgress size={100} sx={{ display: "flex", justifyContent: "center" }} />;
    }

    return <WelcomeToModeScreen session={session} mode="Guest" />;
};

export default GuestSession;
