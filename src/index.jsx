import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import store, { history } from "./store/store.js";
import { AppContainer } from "react-hot-loader";
import * as actions from "./actions/actions";

import App from "./App";
import "./style.scss";
import "./styles/fonts.scss";

const root = document.getElementById("root");


render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppContainer>
        <App />
      </AppContainer>
    </ConnectedRouter>
  </Provider>,
  root
);

if (module.hot) module.hot.accept(App, () => render(App));
