import { createContext } from "react";
import { AppState, Action } from "./types";

const AppContext = createContext<[AppState, React.Dispatch<Action>] | [null, null]>([null, null]);

export default AppContext;
