import { findElementIndex, getAllChildElements, removeElement, shakeElement } from '../utils/utils';
import App from './App';
import GameBoard from './GameBoard.ts/GameBoard';
import HtmlMarkup from './HtmlMarkup/HtmlMarkup';
import { levels } from '../levels';
import CssInput from './CssInput/CssInput';

export default class Controller {
  constructor(
    private gameBoard: GameBoard,
    private htmlMarkup: HtmlMarkup,
    private cssInput: CssInput,
    private app: App
  ) {}

  public handleHover = (e: Event) => {
    const hoveredElement = e.target;
    if (hoveredElement && hoveredElement instanceof HTMLElement) {
      const parentElement = hoveredElement.closest('.parent');
      if (
        parentElement &&
        parentElement instanceof HTMLElement &&
        !hoveredElement.classList.contains('parent')
      ) {
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
        if (e.type === 'mouseover') {
          relativeEl.classList.add('highlighten');
          hoveredElement.classList.add('highlighten');
        } else if (e.type === 'mouseout') {
          relativeEl.classList.remove('highlighten');
          hoveredElement.classList.remove('highlighten');
        }
      }
    }
  };

  public removeGameField(): void {
    const game = this.gameBoard.getGameField();
    removeElement(game, this.nextLevel.bind(this));
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

  private isWin() {
    return this.app.levelNum === levels.length - 1;
  }

  public prevLevel = () => {
    this.app.levelNum -= 1;
    this.app.restart();
  };

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
}
