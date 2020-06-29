import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { dataReducer } from "./dataReducer";
import { authReducer } from "./authReducer";

const dataPersistConfig = {
  key: "data",
  storage,
};

const authPersistConfig = {
  key: "auth",
  storage,
};

const rootReducer = () =>
  combineReducers({
    data: persistReducer(dataPersistConfig, dataReducer),
    auth: persistReducer(authPersistConfig, authReducer),
  });

export default rootReducer;
