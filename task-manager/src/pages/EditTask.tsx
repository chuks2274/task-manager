import { useState, useEffect } from 'react'; // Import React hooks to handle component state and side effects
import { useParams, useNavigate } from 'react-router-dom'; // Import hooks to get URL parameters and navigate programmatically
import useTaskContext from '../context/useTaskContext'; // Import custom hook to access tasks and update function from context
import {
  Container,
  Form,
  Button, 
  Alert,
  Spinner,
} from 'react-bootstrap'; // Import React Bootstrap components for UI styling and layout

// Define the EditTask functional component
const EditTask: React.FC = () => {
  
  const { id } = useParams<{ id: string }>(); // Extract task id from the URL parameters
  const { tasks, updateTask } = useTaskContext(); 
  const navigate = useNavigate(); 
  const task = tasks.find((t) => t.id === id);  // Find the task in the list that matches the URL id
  

  // State for form inputs, errors, and loading status
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Use effect to fill form fields when the task changes or loads
  useEffect(() => {
    if (task) {
      setTitle(task.title);            
      setDescription(task.description); 
 
    } else {
      setError('Task not found.');     
    }
  }, [task]); // Run this effect whenever the task changes

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 

    if (!task) {
      setError('Cannot update. Task not found.');
      return;
    }

    // Check if title or description are empty after trimming spaces
    if (!title.trim() || !description.trim()) {
      setError('Both title and description are required.');
      return;
    }

    setError(null);     
    setLoading(true);   

    try {
      // Call the updateTask function from context with new data
      updateTask(id!, { 
        title: title.trim(),
        description: description.trim(),
      });
      setTimeout(() => {
        setLoading(false);  
        navigate('/');      
      }, 300);
    } catch (err) {
      // Handle any errors during update
      console.error('Failed to update task:', err);
      setError('Failed to update task. Please try again.');
      setLoading(false);   
    }
  };

  // If the task does not exist, show an error alert and Back button
  if (!task) {
    return (
      <div className="bg-info min-vh-100 py-5">
        <Container className="mt-4" style={{ maxWidth: '600px' }}>
          <Alert variant="danger">
            {error || 'Task not found.'}
            <div className="mt-3 text-center">
              <Button variant="outline-primary" onClick={() => navigate('/')}>
                Back to Dashboard
              </Button>
            </div>
          </Alert>
        </Container>
      </div>
    );
  }

  // Render the edit task form if task exists
  return (
    <div className="bg-info min-vh-100 py-5 ">
      <Container className="mt-4" style={{ maxWidth: '600px' }}>
        <h2 className="mb-4 text-center">Edit Task</h2>

        {/* Show error alert if error state is set */}
        {error && (
          <Alert variant="danger">
            {error}
            <div className="mt-3 text-center">
              <Button variant="outline-primary" onClick={() => navigate('/')}>
                Back to Dashboard
              </Button>
            </div>
          </Alert>
        )}

        {/* Task editing form */}
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3" controlId="editTaskTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Enter task title"
              required
              isInvalid={!!error && !title.trim()}  
              disabled={loading} 
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="editTaskDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Enter task description"
              required
              isInvalid={!!error && !description.trim()} 
              disabled={loading} 
              className="no-resize" 
            />
          </Form.Group>

          {/* Submit button that shows loading spinner when loading */}
          <div className="d-grid">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Updating...
                </>
              ) : (
                'Update Task'
              )}
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

// Export the component for use in other parts of the app
export default EditTask;