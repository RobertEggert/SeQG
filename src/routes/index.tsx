import { createFileRoute } from "@tanstack/react-router";
import Index from "../Index";

export const Route = createFileRoute("/")({
    component: Index
});
