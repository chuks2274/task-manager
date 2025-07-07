import { Routes, Route } from "react-router-dom"; //Import routing components to handle URL paths
import { Container, Spinner } from "react-bootstrap"; // Import Bootstrap container and spinner for layout and loading
import { useAuth0 } from "@auth0/auth0-react"; // Import hook to check Auth0 login and loading state
import Dashboard from "../pages/Dashboard"; // Import Dashboard page component
import CreateTask from "../pages/CreateTask"; // Import page to create a new task
import EditTask from "../pages/EditTask";  // Import page to edit an existing task
import TaskDetailsPage from "../pages/TaskDetailsPage"; // Import page to view task details
import NotFoundPage from "../pages/NotFoundPage"; // Import 404 error page component
import ProtectedRoute from "./ProtectedRoute";  // Import ProtectedRoute component that restricts access to pages for logged-in users only
import LoginPage from "../pages/LoginPage"; // Import login page component

// Component defining app routes and showing a spinner while Auth0 loads
const AppRoutes = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <Spinner
          animation="border"
          role="status"
          variant="primary"
          aria-live="polite"
          aria-label="Loading"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }
  // Once loading finishes, render all app routes
  return (
    <Routes>
    {/* Home route - shows Dashboard, protected by authentication */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
     {/* Route to create a new task, protected */}
      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <CreateTask />
          </ProtectedRoute>
        }
      />
    {/* Route to edit a task by id, protected */}
      <Route
        path="/edit/:id"
        element={
          <ProtectedRoute>
            <EditTask />
          </ProtectedRoute>
        }
      />
    {/* Route to view task details by id, protected */}
      <Route
        path="/task/:id"
        element={
          <ProtectedRoute>
            <TaskDetailsPage />
          </ProtectedRoute>
        }
      />
    {/* Public login page route */}
      <Route path="/login" element={<LoginPage />} />

       {/* Catch-all route for unknown URLs - shows 404 page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
// Export AppRoutes as the default export so it can be used (imported) in other files
export default AppRoutes;