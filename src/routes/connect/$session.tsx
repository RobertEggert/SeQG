// src/routes/connect/$session.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/connect/$session")({
    component: () => <SessionConnector />
});

const SessionConnector = () => {
    const { session } = Route.useParams();

    useEffect(() => {
        fetch("http://192.168.2.80:3001/connect", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ session })
        });
    }, [session]);

    return (
        <div>
            User connected with session: <b>{session}</b>
        </div>
    );
};

export default SessionConnector;
