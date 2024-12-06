/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const PassengerPrivateRoute = ({ children }) => {
  const isPassenger = localStorage.getItem("isPassenger") === "true"; // Check passenger role

  return isPassenger ? children : <Navigate to="/" />; // Redirect to AuthPage if not passenger
};

export default PassengerPrivateRoute;
