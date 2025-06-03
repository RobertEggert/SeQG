// src/routes/connect/$session.tsx
import { CircularProgress } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import Prohibited from "../../Modes/Prohibited";
import AnonymousLLMPrecondition from "../../Modes/Anonymous/AnonymousLLMPrecondition";

export const Route = createFileRoute("/connect/$session")({
    component: () => <AnonymousSession />
});

const DisplayCorrectBehavior = ({ isError }: { isError: boolean }) => {
    return isError ? <Prohibited /> : <AnonymousLLMPrecondition />;
};

const AnonymousSession = () => {
    const [isError, setIsError] = useState<boolean | null>(null);
    const { session } = Route.useParams();
    const LOCAL_ADDRESS = import.meta.env.LOCAL_ADDRESS || "192.168.2.80";
    const BE_PORT = import.meta.env.BE_PORT || 3001;

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        const socket: Socket = io(`http://${LOCAL_ADDRESS}:${BE_PORT}`);
        socket.on("connect", () => {
            socket.emit("register", { token, role: "client" });
        });

        socket.on("status", (msg) => {
            if (msg === "already_connected" || msg === "invalid_role") {
                setIsError(true);
            } else {
                setIsError(false);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [BE_PORT, LOCAL_ADDRESS, session]);

    return isError === null ? (
        <CircularProgress
            size={100}
            sx={{ display: "flex", justifyContent: "center" }}
        />
    ) : (
        <DisplayCorrectBehavior isError={isError} />
    );
};

export default AnonymousSession;
