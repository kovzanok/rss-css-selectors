export interface Level {
  searchedEl: string;
  markup: string;
  searchedSelector: string;
  levelName: string;
}

export type Progress = LevelProgress[];

export type LevelProgress = {
  levelNum: number;
  isDone: boolean;
  wasHelpUsed: boolean;
};

type EventHandlersType = {
  [key in keyof HTMLElementEventMap]?: (e: Event) => void;
};

type AttributeObjType = {
  [attribute: string]: string;
};

export type ElementCreationParams = {
  tag: string;
  innerHTML?: string;
  disabled?: boolean;
  attributes?: AttributeObjType;
  className?: string;
  textContent?: string;
  eventHandlers?: EventHandlersType;
};
