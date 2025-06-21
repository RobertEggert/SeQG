import { Fade, Typography, Box } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import {
  type SecurityTippsType,
  fetchSecurityTippsFromLLM,
} from "../../utils/LLMFetcher";
import { fallbackTips } from "../../utils/LLMFetcher"; 

const SecurityTipps = () => {
  const initialTip = useMemo(() => {
    return fallbackTips[Math.floor(Math.random() * fallbackTips.length)];// or fallbackTips[0];
  }, []);

  const [currentTip, setCurrentTip] = useState<SecurityTippsType>(initialTip);
  const [nextTip, setNextTip] = useState<SecurityTippsType | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    fetchSecurityTippsFromLLM().then(tip => {
      if (tip) setCurrentTip(tip);
    });

    const interval = setInterval(() => {
      fetchSecurityTippsFromLLM().then(tip => {
        if (tip) setNextTip(tip);
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (nextTip?.title && nextTip?.subtitle) {
      setVisible(false);
      const timeout = setTimeout(() => {
        setCurrentTip(nextTip);
        setVisible(true);
        setNextTip(null);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [nextTip]);

  if (!currentTip?.title || !currentTip?.subtitle) return null;

  return (
    <Fade in={visible} timeout={500}>
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: "1.1rem",
            mb: 1,
            color: "#111",
          }}
        >
          {currentTip.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "1rem",
            lineHeight: 1.5,
            color: "#333",
          }}
        >
          {currentTip.subtitle}
        </Typography>
      </Box>
    </Fade>
  );
};

export default SecurityTipps;