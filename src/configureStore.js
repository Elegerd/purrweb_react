import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import createRootReducer from "./reducers";

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers =
    (typeof window !== "undefined" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
  return {
    ...createStore(createRootReducer(), enhancer),
    runSaga: sagaMiddleware.run,
  };
}
