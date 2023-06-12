import GameBlock from '../../utils/GameBlock';
import './CssInput.scss';

export default class CssInput extends GameBlock {
  private form!: HTMLFormElement;
  constructor(searchedSelector: string) {
    super({ searchedSelector });
  }

  public renderInputForm(): HTMLFormElement {
    const form = document.createElement('form');
    const input = document.createElement('input');
    const button = document.createElement('button');
    button.textContent = 'Enter';
    button.className = 'css-submit';

    form.onsubmit = this.handleSubmit;
    this.form = form;
    form.append(input);

    return form;
  }

  private handleSubmit = (e: Event) => {
    e.preventDefault();
    const form = e.target;
    if (form instanceof HTMLFormElement) {
      const input = form.querySelector('input');
      if (input && this.searchedSelector) {
        if (this.controller.checkAnswer(input.value, this.searchedSelector)) {
          this.controller.removeGameField();
        } else {
          this.controller.handleWrongAnswer(input.value);
        }
      }
    }
  };

  public getForm() {
    return this.form;
  }
}
