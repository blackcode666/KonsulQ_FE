import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };
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
            <div className="flex flex-col min-h-screen">
              <Navbar isDashboard={true} />
              <div className="flex-grow">
                <Dashboard />
              </div>
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
