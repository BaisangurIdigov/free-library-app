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
        <div
          style={{
            backgroundImage:
              "url(https://p4.wallpaperbetter.com/wallpaper/388/965/236/paper-cardboard-texture-parchment-the-texture-of-the-paper-hd-wallpaper-preview.jpg)",
            height: 4000,
          }}
        >
          <App />
        </div>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
