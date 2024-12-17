  import React from "react";
  import Sidebar from "../components/common/Sidebar";
  import { Link } from "react-router-dom";

  const Dashboard = () => {
    return (
      <div className="flex">
        {/* Sidebar */}
        <div className="bg-gray-800 text-white fixed h-fullfixed inset-y-0 left-0 bg-gray-800 text-white w-64 h-full transform transition-transform duration-300 ease-in-out ">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="ml-64 p-6 w-full">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Appointments", desc: "You have 8 upcoming appointments.", link: "/appointments" },
              { title: "Consultations", desc: "You have 3 ongoing consultations.", link: "/consultations" },
              { title: "Doctors", desc: "View all registered doctors.", link: "/doctors" },
              { title: "Messages", desc: "You have 5 new messages.", link: "/messages" },
              { title: "Users", desc: "Manage all users.", link: "/users" },
            ].map((card, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
                <p className="mt-2 text-gray-600">{card.desc}</p>
                <Link to={card.link} className="text-blue-600 mt-4 inline-block">
                  View All
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  export default Dashboard;
