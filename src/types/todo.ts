export interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: "Low" | "Medium" | "High";
  userId: string;
  createdAt: string;
  updatedAt?: string;
  dueDate?: string; 
}

export interface TodoState {
  todos: Todo[];
  loading: boolean;
}

export interface TodoInput {
  title: string;
  description ?: string;
  priority : "Low" | "Medium" |"High";
  dueDate?: string;
}

