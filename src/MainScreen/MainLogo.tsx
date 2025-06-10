import { Paper, Button, Box, Fade } from "@mui/material";
import logoStart from "../img/logoandtext.jpg";
import logoEnd from "../img/logo.png";
import {
    useEffect,
    useRef,
    useState,
    type Dispatch,
    type SetStateAction
} from "react";
import FadedComponent from "../utils/FadedComponent";

type MainLogoProps = {
    isPressed: boolean;
    setIsPressed: Dispatch<SetStateAction<boolean>>;
};

const MainLogo = ({ isPressed, setIsPressed }: MainLogoProps) => {
    const [showAltLogo, setShowAltLogo] = useState(false);
    const resetRef = useRef<NodeJS.Timeout | null>(null);

    const TIME_UNTIL_TIMEOUT = 30_000;

    const resetTime = () => {
        if (resetRef.current) clearTimeout(resetRef.current);
        resetRef.current = setTimeout(() => {
            setShowAltLogo(false);
            setIsPressed(false);
        }, TIME_UNTIL_TIMEOUT);
    };

    const handleClick = () => {
        setShowAltLogo(true);
        setTimeout(() => {
            setIsPressed(true);
        }, 100); // Delay before transform
    };

    useEffect(() => {
        if (!resetRef.current) return;

        document.addEventListener("touchstart", resetTime);
        resetTime();

        return () => {
            document.removeEventListener("touchstart", resetTime);
            if (resetRef.current) clearTimeout(resetRef.current);
        };
    }, [isPressed]);

    return (
        <Box
            sx={{
                position: "absolute",
                top: "10%",
                left: "50%",
                transform: "translateX(-50%)",
                transition: "all 0.7s ease",
                zIndex: 2,
                transformOrigin: "top center",
                ...(isPressed && {
                    transform: "translateX(-50%) scale(0.2)",
                    top: "2%"
                })
            }}
        >
            <Paper
                elevation={isPressed ? 0 : undefined}
                sx={{ borderRadius: 10, overflow: "hidden" }}
            >
                <Button
                    disableRipple
                    disabled={isPressed}
                    onClick={!isPressed ? handleClick : undefined}
                    sx={{
                        borderRadius: 10,
                        padding: 0,
                        minWidth: 0,
                        width: isPressed ? "40vw" : "70vw",
                        height: "70vh",
                        position: "relative", // Needed for absolute children
                        overflow: "hidden",
                        transition: "width 0.7s ease"
                    }}
                >
                    <Fade in={!showAltLogo} timeout={600}>
                        <Box
                            sx={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                backgroundImage: `url(${logoStart})`,
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                borderRadius: 10,
                                zIndex: 1
                            }}
                        />
                    </Fade>

                    <Fade in={showAltLogo} timeout={600}>
                        <Box
                            sx={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                backgroundImage: `url(${logoEnd})`,
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                borderRadius: 10,
                                zIndex: 2
                            }}
                        />
                    </Fade>

                    {!isPressed && (
                        <FadedComponent
                            sxBox={{
                                position: "absolute",
                                bottom: 32,
                                width: "100%",
                                textAlign: "center"
                            }}
                            sxText={{
                                zIndex: 3,
                                color: "grey",
                                fontSize: 20,
                                position: "relative"
                            }}
                        >
                            Press to start
                        </FadedComponent>
                    )}
                </Button>
            </Paper>
        </Box>
    );
};

export default MainLogo;
