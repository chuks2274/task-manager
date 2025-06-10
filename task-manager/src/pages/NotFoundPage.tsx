import { Button, Container, Row, Col, Alert } from 'react-bootstrap'; // Import UI components from React Bootstrap for layout and styling
import { useNavigate } from 'react-router-dom'; // Import hook to navigate programmatically between pages
import { useAuth0 } from '@auth0/auth0-react'; // Import Auth0 hook to check authentication and perform login

// Define the NotFoundPage functional component
const NotFoundPage: React.FC = () => {

  const navigate = useNavigate();

  // Get authentication info and login function from Auth0
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  // Function to handle the "Go Back" button click
  const handleBack = async () => {
    if (isLoading) return;  

    try {
      if (isAuthenticated) {
        // If user is logged in, navigate to the homepage/dashboard
        navigate('/');
      } else {
        // If not logged in, trigger the login process
        await loginWithRedirect({
          appState: { returnTo: '/' }, 
          // After login, redirect back to the homepage
        });
      }
    } catch (error) {
      console.error('Navigation or login error:', error);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6} className="text-center">
          <Alert variant="danger" aria-live="assertive" role="alert">
            <h1 className="display-4 fw-bold">404 - Not Found</h1>
            <p className="lead">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </Alert>

          {/* Button that triggers handleBack when clicked */}
          <Button
            variant="primary"  
            onClick={handleBack} 
            className="mt-3"  
            disabled={isLoading} 
          >
            {isLoading ? 'Checking authentication...' : 'Go Back to Dashboard'}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

// Export the component for use in other parts of the app
export default NotFoundPage;