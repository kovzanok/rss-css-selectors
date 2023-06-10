import { findElementIndex } from '../utils/utils';
import App from './App';
import GameBoard from './GameBoard.ts/GameBoard';
import HtmlMarkup from './HtmlMarkup/HtmlMarkup';
import { levels } from '../levels';

export default class Controller {
  constructor(private gameBoard: GameBoard, private htmlMarkup: HtmlMarkup, private app: App) {}

  public handleHover = (e: Event) => {
    const hoveredElement = e.target;

    if (hoveredElement && hoveredElement instanceof HTMLElement) {
      const parentElement = hoveredElement.parentElement;
      if (parentElement) {
        const index = findElementIndex(hoveredElement, parentElement.children);
        let relativeParent;
        if (parentElement.classList.contains('markup')) {
          relativeParent = this.gameBoard.getGameField();
        } else {
          relativeParent = this.htmlMarkup.getMarkupElement();
        }
        const relativeEl = relativeParent.children[index];
        if (e.type === 'mouseenter') {
          relativeEl.classList.add('highlighten');
          hoveredElement.classList.add('highlighten');
        } else if (e.type === 'mouseleave') {
          relativeEl.classList.remove('highlighten');
          hoveredElement.classList.remove('highlighten');
        }
      }
    }
  };

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
}
