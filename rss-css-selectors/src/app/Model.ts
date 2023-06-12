import { findElementIndex, getAllChildElements } from '../utils/utils';
import App from './App';
import Controller from './Controller';
import CssInput from './CssInput/CssInput';
import GameBoard from './GameBoard.ts/GameBoard';
import HtmlMarkup from './HtmlMarkup/HtmlMarkup';

export default class Model {
  private controller!: Controller;
  constructor(
    private gameBoard: GameBoard,
    private htmlMarkup: HtmlMarkup,
    private cssInput: CssInput,
    private app: App
  ) {}

  public hightlightElements(relativeEl: HTMLElement, hoveredElement: HTMLElement): void {
    relativeEl.classList.add('highlighten');
    hoveredElement.classList.add('highlighten');
  }

  public removeHightlight(relativeEl: HTMLElement, hoveredElement: HTMLElement): void {
    relativeEl.classList.remove('highlighten');
    hoveredElement.classList.remove('highlighten');
  }

  public findHoveredRelative(parentElement: HTMLElement, hoveredElement: HTMLElement): HTMLElement {
    const allChildrenArr = getAllChildElements(parentElement);
    const index = findElementIndex(hoveredElement, allChildrenArr);
    let relativeParent;
    if (parentElement.classList.contains('markup')) {
      relativeParent = this.gameBoard.getGameField();
    } else {
      relativeParent = this.htmlMarkup.getMarkupElement();
    }
    const allChildrenRelArr = getAllChildElements(relativeParent);
    const relativeEl = allChildrenRelArr[index];
    return relativeEl;
  }

  public setController(controller: Controller) {
    this.controller = controller;
  }
}
