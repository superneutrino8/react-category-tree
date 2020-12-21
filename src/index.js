import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/rootReducer";
import * as serviceWorker from "./serviceWorker";

import "./styles.css";

import App from "./components/App";
const rootElement = document.getElementById("root");

const store = createStore(rootReducer);

store.subscribe(() => {
  localStorage.setItem("state", JSON.stringify(store.getState()));
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
