import GameBlock from '../../utils/GameBlock';
import { createElement, renderNestedMarkup, splitMarkupString } from '../../utils/utils';
import './HtmlMarkup.scss';

export default class HtmlMarkup extends GameBlock {
  private markupElement!: HTMLElement;
  constructor(markup: string) {
    super({ markup });
  }

  private renderTextWrapperElement(text: string): HTMLElement {
    const wrapper = createElement({ tag: 'div', textContent: text });
    return wrapper;
  }

  public renderMarkup(): HTMLElement {
    const markup = createElement({
      tag: 'div',
      className: 'parent markup',
      textContent: '<div class="garden">',
      eventHandlers: {
        mouseover: this.controller.handleHover,
        mouseout: this.controller.handleHover,
      },
    });

    if (this.markup) {
      const markupArr = splitMarkupString(this.markup);

      if (this.markup.includes('</')) {
        // check if total markup has nested tags like <tag>...</tag>
        markup.append(...renderNestedMarkup(markupArr, this.renderTextWrapperElement.bind(this)));
      } else {
        markupArr.forEach((el) => {
          markup.append(this.renderTextWrapperElement(el));
        });
      }

      markup.append('</div>');
    }

    this.markupElement = markup;

    return markup;
  }

  public getMarkupElement(): HTMLElement {
    return this.markupElement;
  }
}
