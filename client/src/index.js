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
              "url(https://oir.mobi/uploads/posts/2021-03/1616430148_40-p-zadnii-fon-dlya-saita-46.jpg)",
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
