import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./Reducer/combineReducer";
import { composeWithDevTools } from "redux-devtools-extension";
const middleware = [thunk];
const production = process.env.NODE_ENV === "production";

const Store = createStore(rootReducer, composeWithDevTools(production ? middleware : applyMiddleware(...middleware)));
export default Store;
