import GameBlock from '../../utils/GameBlock';
import { createElement } from '../../utils/utils';
import './Popup.scss';

export default class Popup extends GameBlock {
  constructor() {
    super({});
  }
  renderPopup(): HTMLDivElement {
    const modal = createElement<HTMLDivElement>({ tag: 'div', className: 'popup' });
    const modalBody = createElement({
      tag: 'div',
      className: 'popup__body',
      textContent: 'Victory!',
    });

    const backButton = createElement<HTMLButtonElement>({
      tag: 'button',
      className: 'popup__button',
      textContent: 'Back to game',
      eventHandlers: { click: this.controller.handlePopupClose },
    });

    modalBody.append(backButton);
    modal.append(modalBody);
    return modal;
  }
}
