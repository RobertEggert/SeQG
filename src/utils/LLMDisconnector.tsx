const LOCAL_ADDRESS = import.meta.env.VITE_LOCAL_ADDRESS || "NO_IP";
const BE_PORT = import.meta.env.VITE_BE_PORT || 3001;

export const disconnectAllLLM = async (session: string) => {
    try {
        const response = await fetch(`http://${LOCAL_ADDRESS}:${BE_PORT}/disconnect/all`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ session })
        });

        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Disconnect failed:", err);
        return { status: "error" };
    }
};
