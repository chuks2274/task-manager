import { useState, useContext } from 'react'; // Import React hooks for state and context
import { Link } from 'react-router-dom'; // Import Link to navigate between pages without reload
import {
  Container, Row, Col, Button, Alert, Spinner, ListGroup, Form,
} from 'react-bootstrap'; // Import Bootstrap components for layout and UI
import { useAuth0 } from '@auth0/auth0-react'; // Import Auth0 hook for authentication
import { TaskContext } from '../context/TaskContext'; // Import custom TaskContext to share task data
import type { Task } from '../types/Task'; // Import the Task type for TypeScript

// Function to shorten long descriptions for display
const getShortDescription = (desc: string) =>
  desc.length > 80 ? desc.slice(0, 80) + '...' : desc;

// Define the Dashboard component
const Dashboard: React.FC = () => {
  const context = useContext(TaskContext); // Get task context value
  if (!context) throw new Error('TaskContext is undefined');  

  // Destructure tasks and functions from context
  const { tasks, deleteTask, updateTask } = context;

 // State to track deleting task, delete confirmation, errors, hidden tasks, status filter, and current page number
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hiddenTaskIds, setHiddenTaskIds] = useState<Set<string>>(new Set());
  const [selectedStatus, setSelectedStatus] = useState<'all' | Task['status']>('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Number of tasks shown per page
  const tasksPerPage = 5;

  // Auth0 hooks for authentication state and actions
  const { isAuthenticated, isLoading, loginWithRedirect, logout, user } = useAuth0();

  const [isLoginLoading, setIsLoginLoading] = useState(false);

  if (isLoading || isLoginLoading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" role="status" />
        <div className="mt-3">
          <strong>Loading...</strong>
        </div>
      </Container>
    );
  }

  // If user is not logged in, show login prompt and button
  if (!isAuthenticated) {
    // Function to start login and show loading spinner
    const handleLogin = async () => {
      setIsLoginLoading(true);
      await loginWithRedirect();
    };

    return (
      <Container className="mt-4 text-center">
        <h2>Please log in to access your tasks.</h2>
        <Button onClick={handleLogin}>
          {isLoginLoading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Redirecting...
            </>
          ) : (
            'Log In'
          )}
        </Button>
      </Container>
    );
  }

  // Sort tasks by newest first using createdAt date
  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Filter tasks by status if a filter is selected, else show all
  const filteredTasks =
    selectedStatus === 'all'
      ? sortedTasks
      : sortedTasks.filter((task) => task.status === selectedStatus);

  // Filter out tasks that are hidden after deletion
  const visibleTasksAll = filteredTasks.filter((task) => !hiddenTaskIds.has(task.id));

  // Calculate total number of pages for pagination
  const totalPages = Math.ceil(visibleTasksAll.length / tasksPerPage);

  // Get only the tasks for the current page
  const visibleTasks = visibleTasksAll.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  // If current page is beyond total pages (e.g. after filtering), reset to page 1
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(1);
  }

  // Function to delete a task after confirmation
  const handleDelete = async (taskId: string) => {
    setError(null);  
    setDeletingId(taskId);  
    try {
      setTimeout(async () => {
        await deleteTask(taskId);
        // Add task ID to hidden set to remove from UI
        setHiddenTaskIds((prev) => new Set(prev).add(taskId));
        setConfirmDeleteId(null);  
        setDeletingId(null);  
      }, 500);
    } catch (err) {
      console.error('Failed to delete task:', err);  
      setError('Failed to delete the task. Please try again.');  
      setDeletingId(null);  
    }
  };

  // Function to update task status when changed in the dropdown
  const handleStatusChange = (taskId: string, newStatus: string) => {
    updateTask(taskId, { status: newStatus as Task['status'] });
  };

  // Render dashboard UI
  return (
    <div className="bg-info min-vh-100 py-5">  
      <Container className="mt-4">  
        <Row className="justify-content-between align-items-center mb-3">  
          <Col xs={12} md={6}>  
            <h2>Task Dashboard</h2>
            <p className="lead">
              Welcome, <strong>{user?.name || user?.email || 'User'}</strong>!
            </p>
          </Col>
          <Col
            xs={12}
            md={6}
            className="text-md-end d-flex flex-column flex-md-row align-items-center justify-content-md-end gap-2"
          >
            {/* Dropdown to filter tasks by status */}
            <Form.Select
              aria-label="Filter tasks by status"
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value as Task['status'] | 'all');  
                setCurrentPage(1);  
              }}
              style={{ maxWidth: 180 }}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </Form.Select>

            {/* Show clear filter button only if a filter is active */}
            {selectedStatus !== 'all' && (
              <Button
                variant="danger"
                onClick={() => {
                  setSelectedStatus('all');  
                  setCurrentPage(1);  
                }}
              >
                Clear Filter
              </Button>
            )}

            {/* Logout button */}
            <Button
              variant="outline-secondary"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })  
              }
            >
              Log Out
            </Button>

            {/* Link button to create new task page */}
            <Link to="/create">
              <Button variant="success">+ Create Task</Button>
            </Link>
          </Col>
        </Row>

        {/* Show error alert if there is an error */}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* If no tasks to show, display info alert */}
        {visibleTasks.length === 0 ? (
          <Alert variant="info">No tasks available. Start by creating one.</Alert>
        ) : (
          <>
            <ListGroup>
              {/* List each visible task */}
              {visibleTasks.map((task: Task) => (
                <ListGroup.Item
                  key={task.id}
                  className="d-flex justify-content-between align-items-start task-card"
                >
                  {/* Left side: task info */}
                  <div className="me-3 flex-grow-1">
                    <small className="text-muted">
                      ID: {task.id} | Created: {new Date(task.createdAt).toLocaleString()}
                    </small>
                    <h5>{task.title}</h5>
                    <p className="mb-2">{getShortDescription(task.description)}</p>
                    <Form.Label>Status:</Form.Label>
                    {/* Dropdown to change task status */}
                    <Form.Select
                      size="sm"
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      style={{ maxWidth: 180 }}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </Form.Select>
                  </div>

                  {/* Right side: buttons for viewing and deleting */}
                  <div className="d-flex flex-column align-items-end">
                    <Link to={`/task/${task.id}`}>
                      <Button variant="primary" size="sm" className="mb-2">
                        View
                      </Button>
                    </Link>

                    {/* If not confirming delete, show delete button */}
                    {!confirmDeleteId || confirmDeleteId !== task.id ? (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => setConfirmDeleteId(task.id)}  
                        disabled={deletingId === task.id}  
                      >
                        {deletingId === task.id ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-1" />
                            Deleting...
                          </>
                        ) : (
                          'Delete'
                        )}
                      </Button>
                    ) : (
                      // Show confirmation UI for deletion
                      <>
                        <div className="text-danger mb-2 small text-end">
                          Confirm deletion?
                        </div>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(task.id)}  
                          disabled={deletingId === task.id}
                          className="mb-2"
                        >
                          {deletingId === task.id ? (
                            <>
                              <Spinner animation="border" size="sm" className="me-1" />
                              Deleting...
                            </>
                          ) : (
                            'Yes, Delete'
                          )}
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setConfirmDeleteId(null)} // Cancel delete confirmation
                          disabled={deletingId === task.id}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>

            {/* Pagination buttons */}
            <div className="mt-3 d-flex justify-content-center gap-2">
              {/* Create a button for each page */}
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)} // Go to selected page
                  disabled={currentPage === i + 1} // Disable button for current page
                  variant={currentPage === i + 1 ? 'primary' : 'outline-primary'}
                  size="sm"
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default Dashboard; // Export Dashboard component for use in the app