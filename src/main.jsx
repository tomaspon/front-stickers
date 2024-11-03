import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import App from "./App";
import { UserProvider } from "./components/utils/UserProvider"; // Ajusta la ruta según donde esté tu archivo

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </UserProvider>
);
