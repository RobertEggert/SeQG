export type COLORMODES = "rgba(173, 216, 230, 0.95)" | "rgba(120, 144, 156, 0.95)" | "rgba(81, 45, 168, 0.95)"; // light blue, grey, purple

export const colorModes = {
    start: "rgba(173, 216, 230, 0.95)" as COLORMODES,
    guest: "rgba(120, 144, 156, 0.95)" as COLORMODES,
    private: "rgba(81, 45, 168, 0.95)" as COLORMODES
};

export const flexAlignColumn = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
};

export const flexAlignRow = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
};

export const flexAllCenter = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
};

export const flexColumnCenterOfScreen = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh" // full viewport height
};
