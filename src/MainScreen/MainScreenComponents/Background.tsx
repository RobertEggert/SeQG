import { useRef } from "react";
import videoBackground from "../../img/background.mp4";

const Background = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    return (
        <video
            ref={videoRef}
            autoPlay
            loop
            style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover"
            }}
            src={videoBackground}
        />
    );
};

export default Background;
