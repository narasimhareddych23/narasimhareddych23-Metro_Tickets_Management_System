/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const AdminPrivateRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // Check admin role

  return isAdmin ? children : <Navigate to="/" />; // Redirect to AuthPage if not admin
};

export default AdminPrivateRoute;
