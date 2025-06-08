import { useState } from "react";
import type { MODES } from "./MainScreen";
import MainScreenCharacterMode from "./MainScreenCharacterMode";

const MainScreenCharacterModeControl = () => {
    const [mode, setMode] = useState<MODES>("GUEST");
    return <MainScreenCharacterMode setMode={setMode} mode={mode} />;
};

export default MainScreenCharacterModeControl;
