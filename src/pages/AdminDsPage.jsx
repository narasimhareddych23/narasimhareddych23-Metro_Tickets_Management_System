/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";

const AdminDsPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Metro Admin Panel</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FunctionCard
            title="Manage Routes & Tickets"
            description="Manage Routes Tickets etc."
            navigateTo="/admin-dashboard/tickets-routes"
          />
          <FunctionCard
            title="Manage Passengers"
            description="Manage passenger details and their associated ticket history."
            navigateTo="/admin-dashboard/passenger"
          />
          <FunctionCard
            title="View Ticket Booking History"
            description="View the booking history of all tickets."
            navigateTo="/admin-dashboard/tickets"
          />
          <FunctionCard
            title="Search Tickets"
            description="Search for passengers, tickets, or metro routes."
            navigateTo="/admin-dashboard/search"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("role");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to={"/admin-dashboard"}>
        <h2 className="text-xl font-semibold">Admin Panel</h2>
      </Link>
      <ul className="flex space-x-4">
        <Link to="/admin-dashboard">
          <li className="cursor-pointer hover:underline">Dashboard</li>
        </Link>
        <li onClick={handleLogout} className="cursor-pointer hover:underline">
          Logout
        </li>
      </ul>
    </nav>
  );
};

const FunctionCard = ({ title, description, navigateTo }) => {
  const navigate = useNavigate();

  const handleGoClick = () => {
    navigate(navigateTo); // Navigate dynamically based on the prop
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="mb-4">{description}</p>
      <button
        onClick={handleGoClick}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Go
      </button>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white/45 text-center p-4 text-xs">
      <p>&copy; 2024 Metro Ticket Bookings. All rights reserved.</p>
    </footer>
  );
};

export default AdminDsPage;
