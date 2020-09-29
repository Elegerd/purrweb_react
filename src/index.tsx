import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./configureStore";

const { store, persistor } = configureStore();

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

render(<AppWrapper />, document.getElementById("app"));
