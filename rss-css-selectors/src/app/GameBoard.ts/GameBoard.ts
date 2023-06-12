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
      let wrapper = '';
      let isNestedEl = false;

      splitMarkupString(this.markup).forEach((el) => {
        if (isNestedEl) {
          if (el.includes('/>')) {
            // check close tag of markupWrapperElement children
            wrapper += el;
            return;
          } else if (el.includes('</')) {
            // check markupWrapperElement close tag
            isNestedEl = false;
            wrapper += el;
            game.innerHTML += wrapper;
            return;
          }
        }

        if (!el.includes('</') && !el.includes('/>')) {
          // check if tag contains closing slash
          isNestedEl = true;
          wrapper = el;
        } else {
          wrapper = el;
          game.innerHTML += wrapper;
        }
      });
      if (this.searchedSelector) {
        game
          .querySelectorAll(this.searchedSelector)
          .forEach((elem) => elem.classList.add('strobe'));
      }

      game.onmouseover = this.controller.handleHover;
      game.onmouseout = this.controller.handleHover;
    }
    return game;
  }

  public getGameField(): HTMLElement {
    return this.gameField;
  }
}
