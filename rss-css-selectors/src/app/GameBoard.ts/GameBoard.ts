import GameBlock from '../../utils/GameBlock';
import { createElement, renderNestedElements, splitMarkupString } from '../../utils/utils';
import './GameBoard.scss';

export default class GameBoard extends GameBlock {
  private gameField!: HTMLDivElement;
  constructor(searchedEl: string, markup: string, searchedSelector: string) {
    super({ searchedEl, markup, searchedSelector });
  }

  public renderBoardElements(): HTMLDivElement {
    const board = createElement<HTMLDivElement>({ tag: 'div', className: 'board' });

    if (this.searchedEl) {
      const title = createElement<HTMLHeadingElement>({
        tag: 'h1',
        className: 'board__title',
        textContent: `Select the ${this.searchedEl}`,
      });
      this.gameField = this.renderGame();

      board.append(title, this.gameField);
    }

    return board;
  }

  private renderGame(): HTMLDivElement {
    const game = createElement<HTMLDivElement>({
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

  public getGameField(): HTMLDivElement {
    return this.gameField;
  }
}
