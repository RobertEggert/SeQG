import React from "react";
import { useEffect, useRef } from "react";

const Matrix = React.memo(() => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const width = window.innerWidth;
        const height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const fontSize = 14;
        const columns = Math.floor(width / fontSize);
        const drops = Array(columns).fill(1);
        const chars = "アァイイウエカキクケコサシスセソタチツテトナニヌネノ0123456789";

        function draw() {
            if (!ctx) return;
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = "#0F0";
            ctx.font = `${fontSize}px monospace`;

            drops.forEach((y, x) => {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, x * fontSize, y * fontSize);
                if (y * fontSize > height && Math.random() > 0.975) {
                    drops[x] = 0;
                }
                drops[x]++;
            });
        }

        const intervalId = setInterval(draw, 75); // Adjust speed here

        return () => clearInterval(intervalId);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: -1,
                width: "100vw",
                height: "100vh"
            }}
        />
    );
});

export default Matrix;
