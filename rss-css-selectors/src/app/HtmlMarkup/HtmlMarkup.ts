import GameBlock from '../../utils/GameBlock';
import { createElement, renderNestedMarkup, splitMarkupString } from '../../utils/utils';
import './HtmlMarkup.scss';

export default class HtmlMarkup extends GameBlock {
  private markupElement!: HTMLDivElement;
  constructor(markup: string) {
    super({ markup });
  }

  private renderTextWrapperElement(text: string): HTMLDivElement {
    const wrapper = createElement<HTMLDivElement>({ tag: 'div', textContent: text });
    return wrapper;
  }

  public renderMarkup(): HTMLDivElement {
    const markup = createElement<HTMLDivElement>({
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

  public getMarkupElement(): HTMLDivElement {
    return this.markupElement;
  }
}
