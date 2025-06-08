import { Fade, Box, Typography, type SxProps, type Theme } from "@mui/material";
import { useState, useEffect, type ReactNode } from "react";

type FadedComponentProps = {
    sxText?: SxProps<Theme>;
    sxBox?: SxProps<Theme>;
    externalFade?: boolean;
    unmountOnExit?: boolean;
    mountOnEnter?: boolean;
    timeout?: number;
    fadeTime?: number;
    children: ReactNode;
};

const FadedComponent = ({
    sxText,
    sxBox,
    externalFade,
    unmountOnExit,
    mountOnEnter,
    timeout,
    fadeTime,
    children
}: FadedComponentProps) => {
    const [showFade, setShowFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowFade((prev) => !prev);
        }, fadeTime ?? 1300); // toggle every second

        return () => clearInterval(interval);
    }, [fadeTime, showFade]);

    return (
        <Fade
            unmountOnExit={unmountOnExit}
            mountOnEnter={mountOnEnter}
            in={externalFade !== undefined ? !externalFade : showFade}
            timeout={timeout ?? 500}
            style={{ zIndex: 2 }}
        >
            <Box
                sx={{
                    ...sxBox
                }}
            >
                <Typography variant="subtitle1" sx={{ ...sxText }}>
                    {children}
                </Typography>
            </Box>
        </Fade>
    );
};

export default FadedComponent;
