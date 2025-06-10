import { Button, Container, Row, Col, Spinner, Alert } from 'react-bootstrap'; // Import UI components from React Bootstrap
import { useAuth0 } from '@auth0/auth0-react';// Import the Auth0 hook to handle login and authentication state

// Define the LoginPage component
const LoginPage: React.FC = () => {
  // Get login function, loading state, and error from Auth0
  const { loginWithRedirect, isLoading, error } = useAuth0();

  // If there is an error with login/authentication, show the error message
  if (error) {
    return (
      <div className="bg-info min-vh-100 d-flex align-items-center justify-content-center">
        <Container className="text-center">
          <Row className="justify-content-center">
            <Col xs={12} md={6}>
              <Alert variant="danger">
                <h4>Authentication Error</h4> 
                <p>{error.message}</p>  
              </Alert>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  // If there is no error, show the login screen
  return (
    <div className="bg-info min-vh-100 d-flex align-items-center justify-content-center">
      <Container className="text-center">
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <h1>Welcome to Task Manager</h1>  
            <p>Please log in to continue.</p> 

            {/* Button to start login process */}
            <Button
              variant="primary"  
              onClick={() => loginWithRedirect()}  
              disabled={isLoading}  
            >
              {/* If loading is true, show spinner and loading text */}
              {isLoading ? (
                <>
                  <Spinner
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"  
                  />
                  Loading...  
                </>
              ) : (
                'Log In'  
              )}
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

// Export the component for use in other parts of the app
export default LoginPage;