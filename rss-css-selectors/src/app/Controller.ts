import GameBoard from './GameBoard.ts/GameBoard';
import Model from './Model/Model';

export default class Controller {
  private model!: Model;

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
        const [elementToGetHelperText, elementToGetMarkUp] = Model.separateElementAndMarkup(
          relativeEl,
          hoveredElement
        );
        const markup = Model.getElementMarkup(elementToGetMarkUp);
        GameBoard.helperElement.textContent = markup;
        if (e.type === 'mouseover') {
          Model.hightlightElements(relativeEl, hoveredElement);
          Model.displayHelper(elementToGetHelperText);
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
      if (input) {
        if (this.model.checkAnswer(input.value)) {
          this.model.saveProgress({ isDone: true });
          this.model.removeGameField();
        } else {
          this.model.handleWrongAnswer(input.value);
        }
      }
    }
  };

  public handleGoToLevel = (e: Event) => {
    const target = e.target;
    if (target instanceof HTMLLIElement) {
      this.model.goToLevel(Number(target.id));
    }
  };

  public handleReset = () => {
    this.model.resetProgress();
  };

  public handleHelp = () => {
    this.model.enterCorrenctAnswer();
  };

  public handleMainuClick = (e: Event): void => {
    this.model.toggleMenu(e);
  };

  public setModel(model: Model) {
    this.model = model;
  }

  public handleInput = (e: Event) => {
    const target = e.target;
    if (target instanceof HTMLInputElement) {
      Model.changeClassName(target);
    }
  };

  public handlePopupClose = () => {
    this.model.closePopup();
  };
}
