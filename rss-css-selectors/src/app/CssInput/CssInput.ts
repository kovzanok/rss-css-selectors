import GameBlock from '../../utils/GameBlock';

export default class CssInput extends GameBlock {
  constructor(searchedSelector: string) {
    super({ searchedSelector });
  }

  public renderInputForm(): HTMLFormElement {
    const form = document.createElement('form');
    const input = document.createElement('input');

    form.onsubmit = this.handleSubmit;

    form.append(input);
    return form;
  }

  private handleSubmit = (e: Event) => {
    e.preventDefault();
    const form = e.target;
    if (form instanceof HTMLFormElement) {
      const input = form.querySelector('input');
      if (input && input.value === this.searchedSelector) {
        this.controller.nextLevel();
      }
    }
  };
}
