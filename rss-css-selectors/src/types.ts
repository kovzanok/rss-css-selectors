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

type AttributeObjType = {
  [attribute: string]: string;
};

export type ElementCreationParams = {
  tag: string;
  disabled?:boolean;
  attributes?: AttributeObjType;
  className?: string;
  textContent?: string;
  eventHandlers?: EventHandlersType;
};
