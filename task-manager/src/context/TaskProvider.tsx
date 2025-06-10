import { useState, useEffect, useCallback, useMemo } from 'react'; // Import React hooks for state, side effects, and optimization
import type { ReactNode } from 'react'; // Import the type for children components
import type { Task } from '../types/Task'; // Import the Task type definition to use in state and functions
import { TaskContext } from './TaskContext'; // Import the TaskContext so we can provide values to child components
import { loadTasks, saveTasks } from '../utils/storage'; // Import functions to load and save tasks using local storage
import { Toast, ToastContainer } from 'react-bootstrap'; // Import Bootstrap UI components for displaying toast error messages
import { useAuth0 } from '@auth0/auth0-react'; // Import Auth0 hook to access the user's authentication info

// Define the structure of the props this component will receive
interface TaskProviderProps {
  children: ReactNode;   
}

// Create the TaskProvider component that gives all children access to task data and functions
export const TaskProvider = ({ children }: TaskProviderProps) => {
  const { user } = useAuth0(); // Get the logged-in user object from Auth0
  const email = user?.email;  
 // State for tasks, error message, and error visibility
  const [tasks, setTasks] = useState<Task[]>([]);  
  const [error, setError] = useState<string | null>(null);  
  const [showError, setShowError] = useState(false);  

  // Load tasks from local storage when the component mounts or the user email changes
  useEffect(() => {
    if (!email) return;  

    try {// Load tasks from localStorage using the user's email as the key, then update the state
      const loadedTasks = loadTasks(`tasks_${email}`);  
      setTasks(loadedTasks);  
    } catch (err) {
      console.error('Error loading tasks:', err);  
      setError('Failed to load tasks.');  
      setShowError(true);  
    }
  }, [email]); // This effect runs again only if the email changes

  // Save tasks to local storage whenever tasks or email changes
  useEffect(() => {
    if (!email) return;   

    try {
      saveTasks(`tasks_${email}`, tasks); // Save tasks using the user's email as the key
    } catch (err) {
      console.error('Error saving tasks:', err);  
      setError('Failed to save tasks.');  
      setShowError(true);  
    }
  }, [tasks, email]); // Runs whenever tasks or email changes

  // Function to add a new task to the state
  const addTask = useCallback((task: Task) => {
    setTasks(prev => [...prev, task]); // Add the new task to the existing list
  }, []);  

  // Function to update a task by its ID
  const updateTask = useCallback((id: string, updatedFields: Partial<Task>) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, ...updatedFields } : task // If the ID matches, merge the updated fields
      )
    );
  }, []);  

  // Function to delete a task by its ID
  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id)); // Remove the task that matches the ID
  }, []);  

 // Save this value and only update it when tasks or task functions change
  const contextValue = useMemo(
    () => ({ tasks, addTask, updateTask, deleteTask }),  
    [tasks, addTask, updateTask, deleteTask] // Recalculate only if any of these change
  );

  // Return the provider to share the task context, and include a toast for showing errors
  return (
    <>
      <TaskContext.Provider value={contextValue}>
        {children} {/* Render any child components wrapped inside this provider */}
      </TaskContext.Provider>

      {/* Toast message for showing errors (at the top right corner) */}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1050 }}>
        <Toast
          onClose={() => setShowError(false)}  
          show={showError}  
          delay={5000}  
          autohide  
          bg="danger"  
        >
          <Toast.Header>
            <strong className="me-auto">Error</strong>  
          </Toast.Header>
          <Toast.Body className="text-white">{error}</Toast.Body>  
        </Toast>
      </ToastContainer>
    </>
  );
};

export default TaskProvider; // Export the component so it can be used to wrap parts of your app