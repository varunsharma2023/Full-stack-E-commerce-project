import { createStore } from "redux";
import { rootReducer } from "./combineReducer"; // Assuming the correct file path

export const store = createStore(rootReducer);
