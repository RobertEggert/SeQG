import { Fade, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import {
    type SecurityTippsType,
    fetchSecurityTippsFromLLM
} from "../../utils/LLMFetcher";

const SecurityTipps = () => {
    const [tipp, setTipp] = useState<SecurityTippsType | null>(null);

    useEffect(() => {
        if (!tipp?.title || !tipp?.subtitle) fetchSecurityTippsFromLLM(setTipp);
        const timeout = setTimeout(() => {
            setTipp({ title: null, subtitle: null });
        }, 10000);
        return () => clearTimeout(timeout);
    }, [tipp?.subtitle, tipp?.title]);

    return tipp?.title && tipp?.subtitle ? (
        <Fade
            in={tipp.title !== null && tipp.subtitle !== null}
            sx={{
                zIndex: 3,
                color: "grey",
                fontSize: 20,
                position: "relative"
            }}
        >
            <Typography>{tipp.title}</Typography>
            <Typography>{tipp.subtitle}</Typography>
        </Fade>
    ) : null;
};

export default SecurityTipps;
