import { levels } from '../levels';
import {
  findElementIndex,
  getAllChildElements,
  removeSpecialElements,
  shakeElement,
} from '../utils/utils';
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

  public static hightlightElements(relativeEl: HTMLElement, hoveredElement: HTMLElement): void {
    relativeEl.classList.add('highlighten');
    hoveredElement.classList.add('highlighten');
  }

  public static removeHightlight(relativeEl: HTMLElement, hoveredElement: HTMLElement): void {
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

  public checkAnswer(typedSelector: string, taskSelector: string): boolean {
    const gameField = this.gameBoard.getGameField();
    if (typedSelector.length === 0) return false;
    const foundRes = gameField.querySelectorAll(typedSelector);
    const taskRes = gameField.querySelectorAll(taskSelector);
    return (
      Array.from(taskRes).every((el, index) => {
        return el === foundRes[index];
      }) && foundRes.length === taskRes.length
    );
  }

  public handleWrongAnswer(typedSelector: string) {
    const game = this.gameBoard.getGameField();
    if (typedSelector.length !== 0) {
      game.querySelectorAll(typedSelector).forEach((el) => {
        if (el instanceof HTMLElement) {
          shakeElement(el);
        }
      });
    }

    const form = this.cssInput.getForm();
    const htmlMarkup = this.htmlMarkup.getMarkupElement();

    shakeElement(form);
    shakeElement(htmlMarkup);
  }

  public removeGameField(): void {
    const game = this.gameBoard.getGameField();
    removeSpecialElements(
      game,
      this.cssInput.searchedSelector as string,
      this.nextLevel.bind(this)
    );
  }

  public nextLevel = () => {
    if (!this.isWin()) {
      this.app.levelNum += 1;
    } else {
      this.app.levelNum = 0;
      alert('Игра пройдена');
    }
    this.app.restart();
  };

  public prevLevel = () => {
    this.app.levelNum -= 1;
    this.app.restart();
  };
  private isWin() {
    //Change win condition according to user progress
    return this.app.levelNum === levels.length - 1;
  }
}
