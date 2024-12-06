// /* eslint-disable react/prop-types */

// import { Navigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// const ProtectedRoute = ({ children, role }) => {
//   const { user, role: userRole, loading } = useAuth();

//   if (loading) return <div>Loading...</div>;

//   if (!user || userRole !== role) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// export default ProtectedRoute;
/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user, role: userRole, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    // If the user is not authenticated, navigate to the login page
    return <Navigate to="/" />;
  }

  if (userRole !== role) {
    // If the user does not have the required role, navigate to the appropriate route
    return <Navigate to={`/${role}/dashboard`} />;
  }

  // If the user is authenticated and has the correct role, render the child components
  return children;
};

export default ProtectedRoute;
