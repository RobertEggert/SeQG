// src/routes/connect/$session.tsx
import { CircularProgress } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import Prohibited from "../../Modes/Prohibited";
import { v4 as uuidv4 } from "uuid";
import PrivateLLMPrecondition from "../../Modes/Private/PrivateLLMPrecondition";

export const Route = createFileRoute("/connect/$privateSession")({
    component: () => <PrivateSession />
});

const DisplayCorrectBehavior = ({ isError }: { isError: boolean }) => {
    return isError ? <Prohibited /> : <PrivateLLMPrecondition />;
};

const PrivateSession = () => {
    const [isError, setIsError] = useState<boolean | null>(null);
    const { privateSession } = Route.useParams();
    const LOCAL_ADDRESS = import.meta.env.VITE_LOCAL_ADDRESS || "192.168.2.80";
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
            console.log(localStorage.getItem("SeQG-User-Key"));
            socket.emit("register-private", {
                token,
                role: "client",
                userId: localStorage.getItem("SeQG-User-Key")
            });
        });

        socket.on("status", (msg) => {
            console.log(msg);
            if (msg === "already_connected" || msg === "invalid_role") {
                setIsError(true);
            } else {
                setIsError(false);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [BE_PORT, LOCAL_ADDRESS, privateSession]);

    return isError === null ? (
        <CircularProgress
            size={100}
            sx={{ display: "flex", justifyContent: "center" }}
        />
    ) : (
        <DisplayCorrectBehavior isError={isError} />
    );
};

export default PrivateSession;
