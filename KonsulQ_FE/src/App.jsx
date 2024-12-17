import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <>
              <Navbar isDashboard={false} />
              <Home />
              <Footer />
            </>
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar isDashboard={true} />
              <Dashboard />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
