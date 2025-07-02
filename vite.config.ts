import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local", override: true });
export default defineConfig({
    plugins: [TanStackRouterVite({ target: "react", autoCodeSplitting: true }), react()]
});
