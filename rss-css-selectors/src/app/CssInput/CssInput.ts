import GameBlock from '../../utils/GameBlock';
import { createElement } from '../../utils/utils';
import './CssInput.scss';

export default class CssInput extends GameBlock {
  private form!: HTMLFormElement;
  constructor(searchedSelector: string) {
    super({ searchedSelector });
  }

  public renderInputForm(): HTMLFormElement {
    const form = createElement<HTMLFormElement>({
      tag: 'form',
      className: 'css-form',
      eventHandlers: { submit: this.handleSubmit },
    });

    const input = createElement<HTMLInputElement>({
      tag: 'input',
      attributes: {
        placeholder: 'Type your selector',
        autofocus: 'true',
      },
      className: 'css-input',
      eventHandlers: {
        blur: (e) => {
          const input = e.target as HTMLInputElement;
          input.focus();
        },
      },
    });

    const button = createElement<HTMLButtonElement>({
      tag: 'button',
      className: 'css-submit',
      textContent: 'Enter',
    });

    this.form = form;
    form.append(input, button);

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

  public getForm(): HTMLFormElement {
    return this.form;
  }
}
