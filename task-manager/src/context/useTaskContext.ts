import { useContext } from "react"; // Import the useContext hook from React to access context values
import { TaskContext, type TaskContextType } from "./TaskContext"; // Import the TaskContext and its type definition

// This custom hook allows components to access task-related data and functions from the TaskContext
const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext); // Get the current value stored in TaskContext

  if (context === undefined) {  
    throw new Error(
      "[useTaskContext] Hook must be used within a <TaskProvider />" 
    );
  }

  return context; // If the context is valid, return it so the component can use it
};

export default useTaskContext; // Export this custom hook to be used in other parts of the app