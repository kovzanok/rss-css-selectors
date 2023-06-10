import Controller from '../app/Controller';
import { Level, Task } from '../types';

type GameBlockType = Partial<Level>;

export default class GameBlock {
  searchedEl: string | undefined;
  markup: string | undefined;
  searchedSelector: string | undefined;
  task: Task | undefined;
  protected controller!: Controller;
  constructor({ searchedEl, markup, searchedSelector, task }: GameBlockType) {
    this.searchedEl = searchedEl;
    this.markup = markup;
    this.searchedSelector = searchedSelector;
    this.task = task;
  }

  public setController(controller: Controller) {
    this.controller = controller;
  }
}
