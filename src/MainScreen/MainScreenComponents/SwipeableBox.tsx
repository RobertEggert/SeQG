import { Box } from "@mui/material";
import { useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { flexAlignColumn } from "../../styling/theme";

const SwipeableBox = <SetterType,>({
    toBeSet,
    setter,
    children
}: {
    toBeSet: SetterType;
    setter: Dispatch<SetStateAction<SetterType>>;
    children: ReactNode;
}) => {
    const [swipeX, setSwipeX] = useState(0);
    const [isSwiped, setIsSwiped] = useState(false);

    const swipeThreshold = 50;

    const touchStart = (e: React.TouchEvent) => {
        setSwipeX(e.changedTouches[0].clientX); // start pf swipe
    };

    const touchMove = (e: React.TouchEvent) => {
        const swipeDistance = Math.abs(swipeX - e.changedTouches[0].clientX);
        if (swipeDistance > swipeThreshold) {
            setIsSwiped(true);
        }
    };

    const touchEnd = () => {
        if (!isSwiped) return;
        setter(toBeSet);
        setSwipeX(0);
        setIsSwiped(false);
    };

    return (
        <Box
            onTouchStart={touchStart}
            onTouchMove={touchMove}
            onTouchEnd={touchEnd}
            sx={{
                ...flexAlignColumn,
                gap: 2,
                width: "100rem"
            }}
        >
            {children}
        </Box>
    );
};

export default SwipeableBox;
