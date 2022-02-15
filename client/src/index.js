import React from "react";
import App from "./components/App";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { store } from "./redux/configureStore";
import { BrowserRouter } from "react-router-dom";

render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <App />
        </div>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
