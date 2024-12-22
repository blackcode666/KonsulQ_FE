import React from "react";
import ReactDOM from "react-dom/client"; // Untuk React 18 ke atas
import { BrowserRouter as Router } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "animate.css";
import { AuthProvider } from "./context/AuthContext";

import Routing from "./router/Routing"; // Import file Routing.jsx

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routing />
      </Router>
    </AuthProvider>
  );
}

// Gunakan ReactDOM.createRoot untuk React 18 ke atas
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
