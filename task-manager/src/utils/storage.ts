import type { Task } from '../types/Task'; // Import the Task type definition for type safety

// Function to load tasks from localStorage safely using a unique key.
export const loadTasks = (key: string): Task[] => {
  if (typeof window === 'undefined') {  // Check if running outside a browser environment (no localStorage)
    console.warn('localStorage is not available in this environment.');
    return [];   
  }

  try {
    const stored = window.localStorage.getItem(key); // Retrieve saved data as a string by the key
    if (!stored) return [];  
    const parsed: unknown = JSON.parse(stored); // Convert the JSON string back to JavaScript data

    // Check if parsed data is an array and all items are valid Task objects
    if (!Array.isArray(parsed) || !parsed.every(validateTask)) {
      console.error('Invalid tasks data structure in localStorage.');
      return [];   
    }

    return parsed as Task[]; // Return the valid tasks array with proper typing
  } catch (error) {
    console.error('Failed to parse tasks from localStorage:', error);  
    return [];  
  }
};

// Function to save tasks to localStorage using a unique key.
export const saveTasks = (key: string, tasks: Task[]): void => {
  if (typeof window === 'undefined') { // Check if running outside browser (localStorage not available)
    console.warn('localStorage is not available in this environment.');
    return;   
  }

  try {
    // Convert tasks array to JSON string and store it in localStorage under the key
    window.localStorage.setItem(key, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks to localStorage:', error);  
  }
};

// Function to check if a given object is a valid Task
const validateTask = (task: unknown): task is Task => {
  if (typeof task !== 'object' || task === null) return false;  // Ensure task is an object and not null

  const t = task as Partial<Task>; // Treat task as a partial Task to check properties
  return (
    typeof t.id === 'string' &&  
    typeof t.title === 'string' &&  
    typeof t.description === 'string' &&  
    typeof t.status === 'string'  
  );
};