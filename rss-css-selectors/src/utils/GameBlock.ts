import Controller from '../app/Controller';
import { Level, Progress, Task } from '../types';

type GameBlockType = Partial<Level>;

export default class GameBlock {
  searchedEl: string | undefined;
  markup: string | undefined;
  searchedSelector: string | undefined;
  task: Task | undefined;
  progress?: Progress;
  protected controller!: Controller;
  constructor({ searchedEl, markup, searchedSelector, task }: GameBlockType, progress?: Progress) {
    this.searchedEl = searchedEl;
    this.markup = markup;
    this.searchedSelector = searchedSelector;
    this.task = task;
    this.progress = progress;
  }

  public setController(controller: Controller) {
    this.controller = controller;
  }
}
