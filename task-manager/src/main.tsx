import { StrictMode } from 'react'; // Import StrictMode to help find potential problems in development
import { createRoot } from 'react-dom/client'; // Import createRoot to render the React app into the DOM
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter to enable URL routing in the app
import './index.css'; // Import global CSS styles for the entire app
import App from './App.tsx'; // Import the main App component which is the root of the app
import Auth0ProviderWithNavigate from './auth/AuthProvider'; // Import Auth0 provider to manage user authentication
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS for pre-made UI styling

createRoot(document.getElementById('root')!).render(
  <StrictMode>  
    <BrowserRouter> {/* Wrap the app with BrowserRouter to allow navigation between pages */}
      <Auth0ProviderWithNavigate> {/* Provide Auth0 context to handle user login and authentication */}
        <App /> {/* Render the main App component which contains the whole application */}
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </StrictMode>
);