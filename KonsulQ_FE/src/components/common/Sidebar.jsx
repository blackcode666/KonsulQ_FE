import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-full bg-gray-800 text-white p-6">
      <h2 className="text-2xl font-semibold mb-8">Dashboard</h2>
      <ul>
        <li className="mb-4">
          <Link to="/appointments" className="hover:text-gray-400">Appointments</Link>
        </li>
        <li className="mb-4">
          <Link to="/consultations" className="hover:text-gray-400">Consultations</Link>
        </li>
        <li className="mb-4">
          <Link to="/doctors" className="hover:text-gray-400">Doctors</Link>
        </li>
        <li className="mb-4">
          <Link to="/messages" className="hover:text-gray-400">Messages</Link>
        </li>
        <li className="mb-4">
          <Link to="/users" className="hover:text-gray-400">Users</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
