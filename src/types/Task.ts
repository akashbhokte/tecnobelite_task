export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
}

export interface Tasks {
  tasks: Task[];
}
