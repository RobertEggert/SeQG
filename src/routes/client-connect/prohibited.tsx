import { createFileRoute } from "@tanstack/react-router";
import ClientProhibited from "../../Modes/ProhibitedConnection/ClientProhibited";

export const Route = createFileRoute("/client-connect/prohibited")({
    component: ClientProhibited
});
