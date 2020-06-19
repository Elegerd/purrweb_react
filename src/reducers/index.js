import { combineReducers } from "redux";
import { mainReducer } from "./mainReducer.js";

const rootReducer = () =>
  combineReducers({
    main: mainReducer,
  });

export default rootReducer;
