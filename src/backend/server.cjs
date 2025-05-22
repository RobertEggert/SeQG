const express = require("express");
const cors = require("cors");
const WebSocket = require("ws");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const sessions = new Map(); // sessionId => WebSocket

app.post("/connect", (req, res) => {
    const { session } = req.body;
    const ws = sessions.get(session);

    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send("connected");
        console.log("Session connected:", session);
    }

    res.sendStatus(200);
});

const server = app.listen(PORT, () => {
    console.log(`Server running on http://192.168.2.80:${PORT}`);
});

const wss = new WebSocket.Server({ noServer: true });

server.on("upgrade", (req, socket, head) => {
    const session = req.url.split("/").pop();

    wss.handleUpgrade(req, socket, head, (ws) => {
        console.log("WebSocket opened for session:", session);
        sessions.set(session, ws);

        ws.on("close", () => {
            console.log("WebSocket closed for session:", session);
            sessions.delete(session);
        });
    });
});
