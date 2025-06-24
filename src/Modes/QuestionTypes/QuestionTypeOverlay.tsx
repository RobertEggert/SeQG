import { useEffect, useState, type ReactNode } from "react";
import { Backdrop, Card, Fade, Typography } from "@mui/material";

const QuestionTypeOverlay = ({ children, questionType }: { children: ReactNode; questionType: string }) => {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                setOpen(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [open]);

    return (
        <>
            <Backdrop
                color="red"
                open={open}
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    flexDirection: "column"
                }}
            >
                <Typography variant="h5">{questionType}</Typography>
            </Backdrop>
            <Fade in={!open} timeout={500}>
                <Card variant="outlined" sx={{ padding: 1, marginBottom: 2 }}>
                    <Typography>{questionType.toUpperCase()}</Typography>
                </Card>
            </Fade>
            {children}
        </>
    );
};

export default QuestionTypeOverlay;
