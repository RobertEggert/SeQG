import { createFileRoute } from "@tanstack/react-router";
import GuestMode from "../../Modes/Guest/GuestMode";

export const Route = createFileRoute("/frontend-mode/guest")({
    component: GuestMode
});
