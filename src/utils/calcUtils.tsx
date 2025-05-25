import type { MODES } from "../MainScreen";

const doWidthCalc = (mode: MODES, current: MODES) => {
    if (!mode) {
        return "100vh";
    }
    if (current === mode) {
        return "130vh";
    }
    if (current !== mode) {
        return "70vh";
    }
    return "100vh";
};

export default doWidthCalc;
