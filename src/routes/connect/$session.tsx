// src/routes/connect/$session.tsx
import { Box } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

export const Route = createFileRoute("/connect/$session")({
    component: () => <SessionConnector />
});

const SessionConnector = () => {
    const [isError, setIsError] = useState<boolean>(false);
    const { session } = Route.useParams();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        fetch("http://192.168.2.80:3001/connect", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ session, token })
        });

        const socket: Socket = io("http://192.168.2.80:3001");
        socket.on("connect", () => {
            socket.emit("register", { token, role: "client" });
        });

        socket.on("status", (msg) => {
            if (msg === "already_connected") {
                setIsError(true);
            }
        });

        const handleBeforeUnload = () => {
            navigator.sendBeacon(
                "http://192.168.2.80:3001/disconnect",
                JSON.stringify({ session, token, role: "client" })
            );
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            socket.disconnect();
        };
    }, [session]);

    return !isError ? (
        <Box>
            <h1>Client! Welcome to the Anonymous mode</h1>
        </Box>
    ) : (
        <Box>
            <h1>Joining session prohibited!</h1>
        </Box>
    );
};

export default SessionConnector;
