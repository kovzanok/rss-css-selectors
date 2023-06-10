import GameBlock from '../../utils/GameBlock';
import { getElementAttribute, splitMarkupString } from '../../utils/utils';

export default class GameBoard extends GameBlock {
  private gameField!: HTMLDivElement;
  constructor(searchedEl: string, markup: string) {
    super({ searchedEl, markup });
  }

  public renderBlock(): HTMLDivElement {
    const gameBoard = document.createElement('div');
    gameBoard.className = 'board';

    const title = this.renderTaskTitle();
    this.gameField = this.renderGame();
    gameBoard.append(title, this.gameField);
    return gameBoard;
  }

  private renderTaskTitle(): HTMLHeadingElement {
    const title = document.createElement('h1');
    if (this.searchedEl) {
      title.textContent = `Select the ${this.searchedEl}`;
    }

    return title;
  }

  private renderGame(): HTMLDivElement {
    const game = document.createElement('div');
    if (this.markup) {
      const markupArr = splitMarkupString(this.markup);

      game.append(...markupArr.map((elMarkup) => this.renderGameElement(elMarkup)));
    }
    return game;
  }

  private renderGameElement(elementMarkup: string): HTMLElement {
    const tagName = elementMarkup.slice(1, elementMarkup.indexOf(' '));

    const element = document.createElement(tagName);
    if (elementMarkup.includes('class')) {
      element.className = getElementAttribute(elementMarkup, 'class');
    }

    if (elementMarkup.includes('id')) {
      element.id = getElementAttribute(elementMarkup, 'id');
    }

    element.onmouseenter = this.controller.handleHover;
    element.onmouseleave = this.controller.handleHover;
    return element;
  }

  public getGameField(): HTMLDivElement {
    return this.gameField;
  }
}
