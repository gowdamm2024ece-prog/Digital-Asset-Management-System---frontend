import { combineReducers } from "redux";
import { userReducer } from "../features/reducers/userReducer";
import { assetReducer } from "../features/reducers/assetReducer";

const rootReducer = combineReducers({
  userState: userReducer,
  assetState: assetReducer,
});

export default rootReducer;