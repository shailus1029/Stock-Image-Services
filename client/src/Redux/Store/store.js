import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../Reducers/rootReducer.js";
import { composeWithDevTools } from "redux-devtools-extension";

const composeEnhancers = composeWithDevTools({
	// Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

export default function configureStore(initialState = {}) {
	return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
}
