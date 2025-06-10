import { useState } from 'react'; // Import useState hook to manage local state
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook to programmatically navigate between pages
import useTaskContext from '../context/useTaskContext'; // Import custom hook to access task-related functions and data
import type { Task } from '../types/Task'; // Import Task type definition for type safety
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator to create unique IDs for new tasks
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap'; // Import Bootstrap UI components for the form

// Define the CreateTask component
const CreateTask: React.FC = () => {
  const { tasks, addTask } = useTaskContext(); // Get the tasks and the function to add a new task from context
  const navigate = useNavigate(); 

// State for title, description, error message, and loading status
  const [title, setTitle] = useState('');  
  const [description, setDescription] = useState('');  
  const [error, setError] = useState<string | null>(null);  
  const [loading, setLoading] = useState(false);  

  // Function to check if the form fields are valid
  const isValidForm = () => {
    return title.trim().length > 0 && description.trim().length > 0;  
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();  
    setError(null);  

    if (!isValidForm()) {
      setError('Title and Description are required.');  
      return;
    }

    // Check if the task already exists (case-insensitive comparison)
    const duplicate = tasks.find(
      (task) =>
        task.title.trim().toLowerCase() === title.trim().toLowerCase() &&
        task.description.trim().toLowerCase() === description.trim().toLowerCase()
    );
    if (duplicate) {
      setError('A task with the same title and description already exists.');  
      return;
    }

    try {
      setLoading(true);  

      // Create a new task object
      const newTask: Task = {
        id: uuidv4(),  
        title: title.trim(),  
        description: description.trim(),  
        status: 'pending',  
        createdAt: new Date().toISOString(),  
      };

      await addTask(newTask); // Add the task using the context function
      setTimeout(() => navigate('/'), 500);  
    } catch (err) {
      console.error('Failed to add task:', err);  
      setError('Something went wrong. Please try again.');  
      setLoading(false);  
    }
  };

  // Render the form UI
  return (
    <div className="bg-info min-vh-100 py-5">  
      <Container className="mt-4" style={{ maxWidth: '600px' }}>  
        <h2 className="mb-4 text-center">Create Task</h2>  

        {/* Display an error alert if an error exists */}
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

        {/* The task creation form */}
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3" controlId="taskTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}  
              isInvalid={!!error && title.trim() === ''}  
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="taskDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}  
              isInvalid={!!error && description.trim() === ''}  
              required
              className="no-resize"  
            />
          </Form.Group>

          <div className="d-grid">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />  
                  Adding...
                </>
              ) : (
                'Add Task'  
              )}
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default CreateTask; // Export the component for use in other parts of the app