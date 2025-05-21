import { createFileRoute } from "@tanstack/react-router";
import AnonymousMode from "../../AnonymousMode";

export const Route = createFileRoute("/_modes/anonymous")({
    component: AnonymousMode
});
