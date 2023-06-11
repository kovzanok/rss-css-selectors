import GameBlock from '../../utils/GameBlock';
import { splitMarkupString } from '../../utils/utils';

export default class HtmlMarkup extends GameBlock {
  private markupElement!: HTMLDivElement;
  constructor(markup: string) {
    super({ markup });
  }

  public renderMarkup(): HTMLDivElement {
    const div = document.createElement('div');
    div.className = 'parent markup';
    div.textContent = '<div class="garden">';
    if (this.markup) {
      const markupArr = splitMarkupString(this.markup);

      const generateMarkupElement = (el: string): HTMLElement => {
        const wrapper = document.createElement('div');
        wrapper.textContent = el;
        wrapper.onmouseover = this.controller.handleHover;
        wrapper.onmouseout = this.controller.handleHover;
        return wrapper;
      };

      if (this.markup.includes('</')) {
        let markupElement: HTMLElement;
        let isNested = false;
        markupArr.forEach((el) => {
          if (isNested && el.includes('/>')) {
            markupElement.append(generateMarkupElement(el));
            return;
          } else if (isNested && el.includes('</')) {
            isNested = false;
            markupElement.append(el);
            div.append(markupElement);
            return;
          }

          if (!el.includes('</') && !el.includes('/>')) {
            isNested = true;
            markupElement = generateMarkupElement(el);
          } else {
            markupElement = generateMarkupElement(el);
            div.append(markupElement);
          }
        });
      } else {
        markupArr.forEach((el) => {
          const wrapper = document.createElement('div');
          wrapper.textContent = el;
          wrapper.onmouseenter = this.controller.handleHover;
          wrapper.onmouseleave = this.controller.handleHover;
          div.append(wrapper);
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
