import GameBlock from '../../utils/GameBlock';
import { renderNestedMarkup, splitMarkupString } from '../../utils/utils';
import './HtmlMarkup.scss';

export default class HtmlMarkup extends GameBlock {
  private markupElement!: HTMLDivElement;
  constructor(markup: string) {
    super({ markup });
  }

  private renderTextWrapperElement(el: string): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.textContent = el;
    return wrapper;
  }

  public renderMarkup(): HTMLDivElement {
    const div = document.createElement('div');
    div.className = 'parent markup';
    div.textContent = '<div class="garden">';

    if (this.markup) {
      const markupArr = splitMarkupString(this.markup);

      if (this.markup.includes('</')) {
        // check if total markup has nested tags like <tag>...</tag>
        div.append(...renderNestedMarkup(markupArr, this.renderTextWrapperElement.bind(this)));
      } else {
        markupArr.forEach((el) => {
          div.append(this.renderTextWrapperElement(el));
        });
      }

      div.append('</div>');
    }

    this.markupElement = div;
    div.onmouseover = this.controller.handleHover;
    div.onmouseout = this.controller.handleHover;
    return div;
  }

  public getMarkupElement(): HTMLDivElement {
    return this.markupElement;
  }
}
