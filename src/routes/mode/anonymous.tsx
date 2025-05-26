import { createFileRoute } from "@tanstack/react-router";
import AnonymousMode from "../../Modes/Anonymous/AnonymousMode";

export const Route = createFileRoute("/mode/anonymous")({
    component: AnonymousMode
});
