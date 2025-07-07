import { Container } from "react-bootstrap"; // Import the Container layout component from React Bootstrap
import Auth0ProviderWithNavigate from "./auth/AuthProvider"; // Import the custom Auth0 provider that adds navigation support 
import TaskProvider from "./context/TaskProvider"; // Import the task context provider (shares task data across the app)
import AppRoutes from "./routes/AppRoutes"; // Import the main routing component (defines which pages show at which URL)

// Main App component
const App = () => {

  return (

    // Wrap the app with Auth0Provider so all components can use Auth0 login features
    <Auth0ProviderWithNavigate>

      {/* Wrap the app with TaskProvider so all components can share task data */}
      <TaskProvider>

        <Container fluid className="p-3">

          {/* Load the app routes (which page to show based on the URL) */}
          <AppRoutes />

        </Container>
      </TaskProvider>
    </Auth0ProviderWithNavigate>
  );
};

// Export the App component so it can be used in other files (like index.tsx)
export default App;