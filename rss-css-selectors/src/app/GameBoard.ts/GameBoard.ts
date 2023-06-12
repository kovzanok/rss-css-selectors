import GameBlock from '../../utils/GameBlock';
import { createElement, renderNestedElements, splitMarkupString } from '../../utils/utils';
import './GameBoard.scss';

export default class GameBoard extends GameBlock {
  private gameField!: HTMLElement;
  constructor(searchedEl: string, markup: string, searchedSelector: string) {
    super({ searchedEl, markup, searchedSelector });
  }

  public renderBoardElements(): HTMLElement {
    const board = createElement({ tag: 'div', className: 'board' });

    if (this.searchedEl) {
      const title = createElement({
        tag: 'h1',
        className: 'board__title',
        textContent: `Select the ${this.searchedEl}`,
      });
      this.gameField = this.renderGame();

      board.append(title, this.gameField);
    }

    return board;
  }

  private renderGame(): HTMLElement {
    const game = createElement({
      tag: 'div',
      className: 'parent board__field',
      eventHandlers: {
        mouseover: this.controller.handleHover,
        mouseout: this.controller.handleHover,
      },
    });

    if (this.markup) {
      const markupArr = splitMarkupString(this.markup);
      renderNestedElements(markupArr, game);
    }
    if (this.searchedSelector) {
      game.querySelectorAll(this.searchedSelector).forEach((elem) => elem.classList.add('strobe'));
    }
    return game;
  }

  public getGameField(): HTMLElement {
    return this.gameField;
  }
}
