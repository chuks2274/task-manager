import { useParams, Link, useNavigate } from 'react-router-dom'; // Import React Router hooks for URL params, links, and navigation
import useTaskContext from '../context/useTaskContext'; // Import custom hook to access tasks from the app's global context
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Alert,
} from 'react-bootstrap'; // Import React Bootstrap components for layout and styling

// Define the TaskDetailsPage functional component
const TaskDetailsPage: React.FC = () => {
  
  const { id } = useParams<{ id: string }>();  // Extract the 'id' parameter from the URL path
  const { tasks } = useTaskContext(); 
  const navigate = useNavigate(); 
  const task = tasks.find((t) => t.id === id); // Find the task whose id matches the URL id

  // If task is not found, show an error message with a button to go back
  if (!task) {
    return (
      <div className="bg-info min-vh-100 py-5">
        <Container className="mt-5" style={{ maxWidth: '600px' }}>
          <Alert variant="danger">
            <h4>Task Not Found</h4>  
            <p>The task you are looking for does not exist.</p> 
            <Button variant="secondary" onClick={() => navigate('/')}>
              Go Back to Dashboard
            </Button>
          </Alert>
        </Container>
      </div>
    );
  }

  // If task is found, show the details page with task info
  return (
    <div className="bg-info min-vh-100 py-5 ">
      <Container className="mt-4" style={{ maxWidth: '700px' }}>
        <h2 className="mb-4 text-center">Task Details</h2>  
        <Card className="task-card">
          <Card.Body>
            <Card.Title className="mb-3">{task.title}</Card.Title>
            <Card.Text>
              <strong>Description:</strong><br />
              {task.description || 'No description provided.'}
            </Card.Text>

            {/* Task status with label */}
            <Card.Text>
              <strong>Status:</strong>{' '}
              <span className="text-capitalize">{task.status}</span>
            </Card.Text>

            {/* Row with buttons for editing and going back */}
            <Row className="mt-4">
              <Col xs="auto">
                {/* Link to edit the task */}
                <Link to={`/edit/${task.id}`}>
                  <Button variant="primary">Edit Task</Button>
                </Link>
              </Col>

              <Col xs="auto">
                {/* Button to navigate back to the dashboard */}
                <Button variant="secondary" onClick={() => navigate('/')}>
                  Back to Dashboard
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

// Export the component for use in other parts of the app
export default TaskDetailsPage;