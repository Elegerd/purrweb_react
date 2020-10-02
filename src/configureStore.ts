import { applyMiddleware, createStore, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, Persistor } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import createRootReducer from "reducers/index";
import rootSaga from "sagas/index";

export default function configureStore(): {
  store: Store;
  persistor: Persistor;
} {
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = composeWithDevTools(applyMiddleware(sagaMiddleware));
  const store = createStore(createRootReducer(), enhancer);
  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);
  return {
    store,
    persistor,
  };
}
