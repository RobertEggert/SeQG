import { createFileRoute } from "@tanstack/react-router";
import HostProhibited from "../../Modes/ProhibitedConnection/HostProhibited";

export const Route = createFileRoute("/host-mode/prohibited")({
    component: HostProhibited
});
