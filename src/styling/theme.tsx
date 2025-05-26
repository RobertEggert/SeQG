export type COLORMODES =
    | "rgba(173, 216, 230, 0.95)"
    | "rgba(120, 144, 156, 0.95)"
    | "rgba(81, 45, 168, 0.95)"; // light blue, grey, purple

export const colorModes = {
    start: "rgba(173, 216, 230, 0.95)" as COLORMODES,
    anonymous: "rgba(120, 144, 156, 0.95)" as COLORMODES,
    private: "rgba(81, 45, 168, 0.95)" as COLORMODES
};
