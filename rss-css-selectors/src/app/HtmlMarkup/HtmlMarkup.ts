import GameBlock from '../../utils/GameBlock';
import { splitMarkupString } from '../../utils/utils';

export default class HtmlMarkup extends GameBlock {
  private markupElement!: HTMLDivElement;
  constructor(markup: string) {
    super({ markup });
  }

  public renderMarkup(): HTMLDivElement {
    const div = document.createElement('div');
    div.className = 'markup';
    div.textContent = '<div class="garden">';
    if (this.markup) {
      const markupArr = splitMarkupString(this.markup);
      const elArr = markupArr.map((el) => {
        const wrapper = document.createElement('div');
        wrapper.textContent = el;
        wrapper.onmouseenter = this.controller.handleHover;
        wrapper.onmouseleave = this.controller.handleHover;
        return wrapper;
      });
      div.append(...elArr, '</div>');
    }

    this.markupElement = div;
    return div;
  }

  public getMarkupElement(): HTMLDivElement {
    return this.markupElement;
  }
}
