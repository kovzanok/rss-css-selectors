export interface Level {
  searchedEl: string;
  markup: string;
  searchedSelector: string;
  task: Task;
}

export interface Task {
  taskName: string;
  taskText: string;
  taskDescription: string;
  examples: string;
}


