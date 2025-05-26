import type { MODES } from "../MainScreen/MainScreen";

export const doWidthCalc = (mode: MODES, current: MODES) => {
    if (!mode) {
        return "80vh";
    }
    if (current === mode) {
        return "110vh";
    }
    if (current !== mode) {
        return "50vh";
    }
    return "80vh";
};

export const doHeightCalc = (mode: MODES, current: MODES) => {
    if (!mode) {
        return "85vh";
    }
    if (current === mode) {
        return "95vh";
    }
    return "85vh";
};
