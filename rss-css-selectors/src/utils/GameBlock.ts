import Controller from '../app/Controller';
import { Level, Progress } from '../types';

type GameBlockType = Partial<Level>;

export default class GameBlock {
  searchedEl: string | undefined;
  markup: string | undefined;
  searchedSelector: string | undefined;
  progress?: Progress;
  protected controller!: Controller;
  constructor({ searchedEl, markup, searchedSelector }: GameBlockType, progress?: Progress) {
    this.searchedEl = searchedEl;
    this.markup = markup;
    this.searchedSelector = searchedSelector;
    this.progress = progress;
  }

  public setController(controller: Controller) {
    this.controller = controller;
  }
}
