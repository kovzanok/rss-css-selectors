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
      eventHandlers: { submit: this.controller.handleSubmit },
    });

    const input = createElement<HTMLInputElement>({
      tag: 'input',
      attributes: {
        placeholder: 'Type your selector',
      },
      className: 'css-input',
      eventHandlers: {
        blur: (e) => {
          const input = e.target as HTMLInputElement;
          input.focus();
        },
      },
    });
    input.autofocus = true;

    const button = createElement<HTMLButtonElement>({
      tag: 'button',
      className: 'css-submit',
      textContent: 'Enter',
    });

    this.form = form;
    form.append(input, button);

    return form;
  }

  public getForm(): HTMLFormElement {
    return this.form;
  }
}
