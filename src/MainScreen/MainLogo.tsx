import { Paper, Button, Box, Fade, Typography, Divider } from "@mui/material";
import logoStart from "../img/logoandtext.png";
import logoEnd from "../img/logo.png";
import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import FadedComponent from "../utils/FadedComponent";
import { flexAlignColumn } from "../styling/theme";
import SecurityTips from "./MainScreenComponents/SecurityTips";

type MainLogoProps = {
    isPressed: boolean;
    setIsPressed: Dispatch<SetStateAction<boolean>>;
};

const MainLogo = ({ isPressed, setIsPressed }: MainLogoProps) => {
    const resetRef = useRef<NodeJS.Timeout | null>(null);

    const TIME_UNTIL_TIMEOUT = 30_000;

    const handleClick = () => {
        setIsPressed(true);
    };

    useEffect(() => {
        if (!resetRef.current) return;

        const resetTime = () => {
            if (resetRef.current) clearTimeout(resetRef.current);
            resetRef.current = setTimeout(() => {
                setIsPressed(false);
            }, TIME_UNTIL_TIMEOUT);
        };

        document.addEventListener("touchstart", resetTime);
        resetTime();

        return () => {
            document.removeEventListener("touchstart", resetTime);
            if (resetRef.current) clearTimeout(resetRef.current);
        };
    }, [isPressed, setIsPressed]);

    return (
        <Paper
            elevation={isPressed ? 0 : 10}
            sx={{
                zIndex: 1,
                borderRadius: 3,
                width: isPressed ? "10vh" : "140vh",
                height: isPressed ? "10vh" : "80vh",
                marginTop: isPressed ? "2%" : "5%",
                transition: "all 1s ease"
            }}
        >
            <Button
                disableRipple
                disabled={isPressed}
                onClick={!isPressed ? handleClick : undefined}
                sx={{
                    zIndex: 1,
                    ...flexAlignColumn,
                    borderRadius: 3,
                    width: "100%",
                    height: "100%"
                }}
            >
                <Fade in={!isPressed} timeout={500}>
                    <Box
                        sx={{
                            zIndex: 1,
                            borderRadius: 3,
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backgroundImage: `url(${logoStart})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "contain"
                        }}
                    />
                </Fade>
                <Fade in={isPressed} timeout={500}>
                    <Box
                        sx={{
                            zIndex: 1,
                            borderRadius: 3,
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backgroundImage: `url(${logoEnd})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "contain"
                        }}
                    />
                </Fade>

                {!isPressed && (
                    <Box
                        sx={{
                            position: "absolute",
                            backgroundColor: "rgba(200, 200, 200, 0.95)",
                            borderRadius: 3,
                            boxShadow: 4,
                            textAlign: "center",
                            zIndex: 3,
                            padding: 2,
                            width: "100%",
                            minHeight: 100,
                            maxHeight: 130,
                            maxWidth: 1000,
                            bottom: 80
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: "bold",
                                color: "grey.800"
                            }}
                        >
                            Security Tips & News
                        </Typography>
                        <Divider />
                        <SecurityTips />
                    </Box>
                )}

                {!isPressed && (
                    <FadedComponent
                        sxBox={{
                            position: "absolute",
                            bottom: 16,
                            width: "100%",
                            textAlign: "center",
                            backgroundColor: "rgba(255, 255, 255, 0.6)",
                            paddingBottom: 1
                        }}
                        sxText={{
                            zIndex: 4,
                            color: "#333",
                            fontSize: 20,
                            fontWeight: 600
                        }}
                    >
                        Press to start
                    </FadedComponent>
                )}
            </Button>
        </Paper>
    );
};

export default MainLogo;
