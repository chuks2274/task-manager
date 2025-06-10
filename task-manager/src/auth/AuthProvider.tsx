import { Auth0Provider } from "@auth0/auth0-react"; // Import the Auth0 provider component to handle login/logout/auth features
import { useNavigate } from "react-router-dom"; // Import a function that lets us change pages (routes) in the app

 // Define the structure of the props this component will receive
interface Props {
  children: React.ReactNode;  
}

 // Define the type for optional state used when redirecting after login
type AppState = {
  returnTo?: string;  
};

// Define the component that sets up Auth0 and handles page navigation after login
const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const navigate = useNavigate();  

  // Auth0 settings
  const domain = 'dev-4ntshdy8gakpgkyl.us.auth0.com';  
  const clientId = 'MnRtF5WMUwkYuQ5xYod2aZqADkihTe0p';  
  const redirectUri = 'http://localhost:5173/callback';  

  // Return the Auth0Provider component that wraps the app with Auth0 features
  return (
    <Auth0Provider
      domain={domain}  
      clientId={clientId}  
      authorizationParams={{
        redirect_uri: redirectUri,  
      }}
      onRedirectCallback={(appState: AppState | undefined) => {
        // This function runs after login redirection
        // If a return path is given, navigate to it. If not, go to the homepage ("/")
        navigate(appState?.returnTo || "/");
      }}
      cacheLocation="localstorage" // Store authentication tokens in localStorage instead of memory.
      useRefreshTokens={true} // Allow silent session renewal using refresh tokens
    >
      {children} {/* Render whatever child components are wrapped by this provider */}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate; // Export this component so it can be used to wrap the app in main.tsx or App.tsx