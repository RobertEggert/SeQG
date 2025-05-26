import { createFileRoute } from "@tanstack/react-router";
import PrivateMode from "../../Modes/Private/PrivateMode";

export const Route = createFileRoute("/mode/private")({
    component: PrivateMode
});
