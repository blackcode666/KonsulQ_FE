import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");

// Cegah pemanggilan ganda
if (!rootElement._reactRootContainer) {
  console.log("Creating root for the first time...");
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.log("Using existing root...");
  rootElement._reactRootContainer.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
