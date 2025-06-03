// src/server.ts
import express, { type Request, type Response } from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

type ROLES = "host" | "client";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

app.use(cors());
app.use(express.json());

const JWL_SECRET = process.env.VITE_JWL_SECRET || "VERI SICRET";
const LOCAL_ADDRESS = process.env.VITE_LOCAL_ADDRESS || "192.168.2.80";
const BE_PORT = process.env.VITE_BE_PORT || 3001;

// Map<sessionId, { host?: socketId, client?: socketId }>
const activeSessions = new Map<string, { host?: string; client?: string }>();

app.get("/connect/host", (_: Request, res: Response) => {
    const session = randomUUID();
    const token = jwt.sign({ session }, JWL_SECRET, { expiresIn: "1h" });
    res.json({ session, token });
});

io.on("connection", (socket: Socket) => {
    console.log("Someone tries connecting:", socket.id);

    socket.on("register", ({ token, role }: { token: string; role: ROLES }) => {
        try {
            const payload = jwt.verify(token, JWL_SECRET) as {
                session: string;
            };
            const session = payload.session;

            if (!["host", "client"].includes(role)) {
                socket.emit("status", "invalid_role");
                setTimeout(() => socket.disconnect(), 100);
                return;
            }

            const sessionEntry = activeSessions.get(session) || {};

            if (sessionEntry[role]) {
                socket.emit("status", "already_connected");
                setTimeout(() => socket.disconnect(), 100);
                console.log(
                    `Role ${role} already connected for session ${session}`
                );
                return;
            }

            sessionEntry[role] = socket.id;
            activeSessions.set(session, sessionEntry);

            console.log(
                `Socket ${socket.id} registered to session ${session} as a ${role}`
            );

            if (sessionEntry.host && sessionEntry.client) {
                io.to(sessionEntry.host).emit("status", "connected");
                io.to(sessionEntry.client).emit("status", "connected");
            }

            socket.on("disconnect", () => {
                console.log(
                    `Socket ${socket.id} disconnected session: ${session} as a ${role}`
                );
                const entry = activeSessions.get(session);
                if (entry && entry[role] === socket.id) {
                    delete entry[role];
                    if (!entry.host && !entry.client) {
                        activeSessions.delete(session);
                    } else {
                        activeSessions.set(session, entry);
                    }
                    const otherRole: ROLES =
                        role === "host" ? "client" : "host";
                    if (entry[otherRole]) {
                        io.to(entry[otherRole]!).emit("status", "disconnected");
                    }
                }
            });
        } catch {
            socket.emit("status", "invalid_token");
            setTimeout(() => socket.disconnect(), 100);
        }
    });
});

server.listen(BE_PORT, () => {
    console.log(`Server is running on http://${LOCAL_ADDRESS}:${BE_PORT}`);
});
