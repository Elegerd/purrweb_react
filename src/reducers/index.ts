import { combineReducers, Reducer } from "redux";
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

const rootReducer = (): Reducer =>
  combineReducers({
    data: persistReducer<DataState>(dataPersistConfig, dataReducer),
    auth: persistReducer<AuthState>(authPersistConfig, authReducer),
  });

export default rootReducer;
