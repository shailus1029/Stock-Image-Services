import { combineReducers } from "redux";
import homeReducer from "./homeReducer.js";
import imageReducer from "./imageReducer.js";

export default combineReducers({
	homeReducer,
	imageReducer
});
