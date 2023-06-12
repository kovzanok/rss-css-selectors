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

type EventHandlersType = {
  [key in keyof HTMLElementEventMap]?: (e: Event) => void;
};

export type ElementCreationParams = {
  tag: string;
  className: string;
  textContent?: string;
  eventHandlers?: EventHandlersType;
};
