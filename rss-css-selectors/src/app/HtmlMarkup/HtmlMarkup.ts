import GameBlock from '../../utils/GameBlock';
import { splitMarkupString } from '../../utils/utils';

export default class HtmlMarkup extends GameBlock {
  private markupElement!: HTMLDivElement;
  constructor(markup: string) {
    super({ markup });
  }

  private renderMarkupElement(el: string): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.textContent = el;
    wrapper.onmouseover = this.controller.handleHover;
    wrapper.onmouseout = this.controller.handleHover;
    return wrapper;
  }

  public renderMarkup(): HTMLDivElement {
    const div = document.createElement('div');
    div.className = 'parent markup';
    div.textContent = '<div class="garden">';
    if (this.markup) {
      const markupArr = splitMarkupString(this.markup);

      if (this.markup.includes('</')) {
        let markupElement: HTMLElement;
        let isNested = false;
        markupArr.forEach((el) => {
          if (isNested && el.includes('/>')) {
            markupElement.append(this.renderMarkupElement(el));
            return;
          } else if (isNested && el.includes('</')) {
            isNested = false;
            markupElement.append(el);
            div.append(markupElement);
            return;
          }

          if (!el.includes('</') && !el.includes('/>')) {
            isNested = true;
            markupElement = this.renderMarkupElement(el);
          } else {
            markupElement = this.renderMarkupElement(el);
            div.append(markupElement);
          }
        });
      } else {
        markupArr.forEach((el) => {
          div.append(this.renderMarkupElement(el));
        });
      }

      div.append('</div>');
    }

    this.markupElement = div;
    return div;
  }

  public getMarkupElement(): HTMLDivElement {
    return this.markupElement;
  }
}
