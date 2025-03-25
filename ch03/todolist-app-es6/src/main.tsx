import React from "react";
import ReactDOM from "react-dom/client";
import AppContainer from "./AppContainer.js";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

// !는 root가 있을수도,없을수도 있다.
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>
);
