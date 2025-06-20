import { createFileRoute } from "@tanstack/react-router";
import GuestMode from "../../Modes/Guest/GuestMode";

export const Route = createFileRoute("/host-mode/guest")({
    component: GuestMode
});
