import { createContext } from 'react'; // Import the function used to create a context from React
import type { Task } from '../types/Task'; // Import the Task type (a definition of what a task looks like)

// Define what the context will hold — its structure and types
export interface TaskContextType {
  tasks: Task[];  
  addTask: (task: Task) => void;  
  updateTask: (id: string, updatedFields: Partial<Task>) => void;  
  deleteTask: (id: string) => void;  
}

// Create the context using the TaskContextType structure defined above
// The default value is set to undefined to make sure a provider is used
export const TaskContext = createContext<TaskContextType | undefined>(undefined);