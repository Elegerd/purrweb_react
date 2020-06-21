import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore } from "redux-persist";
import createRootReducer from "@reducers";
import rootSaga from "@sagas";

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers =
    (typeof window !== "undefined" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
  const store = createStore(createRootReducer(), enhancer);
  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);
  return {
    store,
    persistor,
  };
}
