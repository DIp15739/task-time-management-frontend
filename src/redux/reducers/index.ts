import { combineReducers } from "redux";

import CommonReducer, { CommonIF } from "./CommonReducer";

export interface ReducerStateIF {
  commonData: CommonIF;
}
export default combineReducers({
  commonData: CommonReducer,
});
