import App from './App';
import GameBoard from './GameBoard.ts/GameBoard';
import HtmlMarkup from './HtmlMarkup/HtmlMarkup';
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
        const markup =
          hoveredElement.textContent?.length === 0
            ? Model.getElementMarkup(relativeEl)
            : Model.getElementMarkup(hoveredElement);
        GameBoard.helperElement.textContent = markup;
        if (e.type === 'mouseover') {
          Model.hightlightElements(relativeEl, hoveredElement);
          Model.displayHelper(relativeEl, hoveredElement);
        } else if (e.type === 'mouseout') {
          Model.hideHepler();
          Model.removeHightlight(relativeEl, hoveredElement);
        }
      }
    }
  };

  public handleSubmit = (e: Event) => {
    e.preventDefault();
    const form = e.target;
    if (form instanceof HTMLFormElement) {
      const input = form.querySelector('input');
      if (input && this.cssInput.searchedSelector) {
        if (this.model.checkAnswer(input.value, this.cssInput.searchedSelector)) {
          this.model.saveProgress();
          this.model.removeGameField();
        } else {
          this.model.handleWrongAnswer(input.value);
        }
      }
    }
  };

  public handleLevelChange = (e: Event) => {
    const button = e.target;
    if (button instanceof HTMLButtonElement) {
      if (button.classList.contains('prev-lvl')) {
        this.model.prevLevel();
      } else {
        this.model.nextLevel();
      }
    }
  };

  public setModel(model: Model) {
    this.model = model;
  }
}
