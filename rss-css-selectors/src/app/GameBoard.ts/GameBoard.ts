import GameBlock from '../../utils/GameBlock';
import { splitMarkupString } from '../../utils/utils';
import './GameBoard.scss';

export default class GameBoard extends GameBlock {
  private gameField!: HTMLDivElement;
  constructor(searchedEl: string, markup: string, searchedSelector: string) {
    super({ searchedEl, markup, searchedSelector });
  }

  public renderBoardElements(): HTMLDivElement {
    const board = document.createElement('div');
    board.className = 'board';

    const title = this.renderTaskTitle();
    this.gameField = this.renderGame();

    board.append(title, this.gameField);
    return board;
  }

  private renderTaskTitle(): HTMLHeadingElement {
    const title = document.createElement('h1');
    title.className = 'board__title';

    if (this.searchedEl) {
      title.textContent = `Select the ${this.searchedEl}`;
    }

    return title;
  }

  private renderGame(): HTMLDivElement {
    const game = document.createElement('div');
    game.className = 'parent board__field';

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

  public getGameField(): HTMLDivElement {
    return this.gameField;
  }
}
