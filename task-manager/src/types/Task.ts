// Define what properties a Task object should have
export interface Task {
  id: string;  
  title: string;  
  description: string;  
  status: 'pending' | 'in-progress' | 'completed'; 
  createdAt: string;  
}