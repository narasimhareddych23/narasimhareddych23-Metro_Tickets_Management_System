import { assets } from "@/assets/assets";
import { auth } from "@/utils/firebase";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const handleLogoutClick = async () => {
    await signOut(auth); // Sign out the user
    localStorage.clear(); // Clear any session data if stored locally
    sessionStorage.clear();
  };
  return (
    <nav className="bg-white shadow-2xl p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/passenger-dashboard"
          className="text-xl font-bold text-teal-600"
        >
          Metro Tickets
        </Link>
        <div className="space-x-4 flex gap-2 items-center">
          <Link to="/passenger-dashboard/profile">
            <img className="w-11 block md:hidden" src={assets.profile} />
            <p className="hidden md:block text-gray-600 hover:text-teal-500">
              Profile
            </p>
          </Link>
          <Link
            to="/"
            onClick={handleLogoutClick}
            className="text-gray-600 hover:text-teal-500"
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};
