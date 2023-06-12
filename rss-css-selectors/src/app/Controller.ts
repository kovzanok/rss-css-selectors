import { removeElement, shakeElement } from '../utils/utils';
import App from './App';
import GameBoard from './GameBoard.ts/GameBoard';
import HtmlMarkup from './HtmlMarkup/HtmlMarkup';
import { levels } from '../levels';
import CssInput from './CssInput/CssInput';
import Model from './Model';

export default class Controller {
  private model!: Model;
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
        const relativeEl = this.model.findHoveredRelative(parentElement, hoveredElement);
        if (e.type === 'mouseover') {
          this.model.hightlightElements(relativeEl, hoveredElement);
        } else if (e.type === 'mouseout') {
          this.model.removeHightlight(relativeEl, hoveredElement);
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

  public setModel(model: Model) {
    this.model = model;
  }
}
