import { createFileRoute } from "@tanstack/react-router";
import PrivateMode from "../../PrivateMode";

export const Route = createFileRoute("/_modes/private")({
    component: PrivateMode
});
