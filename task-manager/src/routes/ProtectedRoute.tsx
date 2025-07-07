import { useAuth0 } from "@auth0/auth0-react"; // Import a hook to get the user's authentication status from Auth0
import { Navigate } from "react-router-dom";   // Import a component to redirect users to a different page

// Define the structure of the props this component will receive
interface ProtectedRouteProps {
  children: JSX.Element;   
}

// Create the ProtectedRoute component that controls who can access certain pages
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Use Auth0 to get the user's login status, loading state, and any errors
  const { isAuthenticated, isLoading, error } = useAuth0();

  // Print the login status to the console for debugging
  console.log("ProtectedRoute - isAuthenticated:", isAuthenticated);
  console.log("ProtectedRoute - isLoading:", isLoading);

  if (isLoading) return <div>Loading authentication...</div>;

  // If there's an error while checking authentication, log it and show it to the user
  if (error) {
    console.error("Auth0 Error:", error);  
    return <div>Authentication error: {error.message}</div>; 
  }

  // If the user is not logged in, send them to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;  
  }

  // If the user is logged in, allow them to see the protected content
  return children;
};

// Export the ProtectedRoute component so it can be used to protect routes in the app
export default ProtectedRoute;