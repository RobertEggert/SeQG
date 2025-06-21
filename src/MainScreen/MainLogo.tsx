import { Paper, Button, Box, Fade, Typography } from "@mui/material";
import logoStart from "../img/logoandtext.png";
import logoEnd from "../img/logo.png";
import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import FadedComponent from "../utils/FadedComponent";
import SecurityTipps from "./MainScreenComponents/SecurityTipps";
import { flexAlignColumn } from "../styling/theme";
import { flexAlignColumn } from "../styling/theme";

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
                bottom: "80px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "80%",
                maxWidth: "800px",
                backgroundColor: "rgba(200, 200, 200, 0.95)",
                borderRadius: 3,
                px: 3,
                py: 2,
                boxShadow: 4,
                textAlign: "left",
                zIndex: 3,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  color: "#333",
                  textTransform: "uppercase",
                  mb: 1,
                }}
              >
                Security Tips & News:
              </Typography>

              <SecurityTipps />
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
                py: 1,
              }}
              sxText={{
                zIndex: 4,
                color: "#333",
                fontSize: 20,
                fontWeight: 600,
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
