/* eslint-disable react/prop-types */
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function ProtectedRoute({ children, allowProfileCreation }) {
  const token = Cookies.get('authToken');
  const location = useLocation();

  // Restrict access to profile creation page
  if (location.pathname === '/profile-creation' && !allowProfileCreation) {
    return <Navigate to="/app/home" replace />;
  }

  if (!token) {
    // Redirect to login if no token is found
    return <Navigate to="/login" replace />;
  }

  return children; // Render the protected component if authenticated
}
