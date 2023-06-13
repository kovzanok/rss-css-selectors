import { Progress, Task } from '../../types';
import GameBlock from '../../utils/GameBlock';
import { levels } from '../../levels';
import { createElement } from '../../utils/utils';
import './Navigation.scss';

export default class Navigation extends GameBlock {
  constructor(task: Task, private levelNum: number, progress: Progress) {
    super({ task }, progress);
  }

  public renderNavigation(): HTMLDivElement {
    const navigation = createElement<HTMLDivElement>({ tag: 'div', className: 'navigation' });

    const buttons = this.renderControls();

    const titleWrapper = createElement<HTMLDivElement>({ tag: 'div', className: 'title-wrapper' });
    if (this.progress) {
      const isLevelDone = !!this.progress.find(
        (levelInfo) => levelInfo.levelNum === this.levelNum && levelInfo.isDone
      );
      const wasHelpUsed = !!this.progress.find(
        (levelInfo) => levelInfo.levelNum === this.levelNum && levelInfo.wasHelpUsed
      );

      const className = [isLevelDone ? 'done' : '', wasHelpUsed ? 'help' : '', 'level-title'];

      const levelCount = createElement<HTMLHeadingElement>({
        tag: 'h2',
        textContent: `Level ${this.levelNum + 1} of ${levels.length}`,
        className: className.join(' '),
      });

      const levelList = this.renderLevelList();

      const resetProgressButton = createElement({
        tag: 'button',
        textContent: 'Reset progress',
        eventHandlers: { click: this.controller.handleReset },
      });

      titleWrapper.append(...buttons, levelCount);

      navigation.append(titleWrapper, ...this.renderTaskFullInfo(), levelList, resetProgressButton);
    }

    return navigation;
  }

  private renderControls(): HTMLButtonElement[] {
    const controls = ['prev-lvl', 'next-lvl'];
    return controls.map((control: string): HTMLButtonElement => {
      const isDisabled =
        (control === 'prev-lvl' && this.levelNum === 0) ||
        (control === 'next-lvl' && this.levelNum === levels.length - 1);
      const button = createElement<HTMLButtonElement>({
        tag: 'button',
        className: `${control} lvl-control`,
        disabled: isDisabled,
        eventHandlers: { click: this.controller.handleLevelChange },
      });
      return button;
    });
  }

  private renderLevelList(): HTMLOListElement {
    const list = createElement<HTMLOListElement>({
      tag: 'ol',
      className: 'level-list',
      eventHandlers: { click: this.controller.handleGoToLevel },
    });

    const levelItems = levels.map((level, index) => {
      const isLevelDone = !!(this.progress as Progress).find(
        (levelInfo) => levelInfo.levelNum === index && levelInfo.isDone
      );
      const wasHelpUsed = !!(this.progress as Progress).find(
        (levelInfo) => levelInfo.levelNum === index && levelInfo.wasHelpUsed
      );

      const className = [
        isLevelDone ? 'done' : '',
        wasHelpUsed ? 'help' : '',
        this.levelNum === index ? 'current-level' : '',
        'level-item',
      ];

      const item = createElement<HTMLLIElement>({
        tag: 'li',
        className: className.join(' ').trim(),
        textContent: level.task.taskText,
        attributes: { id: String(index) },
      });

      return item;
    });

    list.append(...levelItems);
    return list;
  }

  private renderTaskFullInfo(): HTMLElement[] {
    if (this.task) {
      const title = createElement<HTMLHeadingElement>({
        tag: 'h3',
        textContent: this.task.taskName,
      });

      const text = createElement<HTMLParagraphElement>({
        tag: 'p',
        textContent: this.task.taskText,
      });

      const description = createElement<HTMLParagraphElement>({
        tag: 'p',
        innerHTML: this.task.taskDescription,
      });

      const examples = createElement({
        tag: 'p',
        className: 'examples',
        textContent: `Examples`,
      });

      const examplesArr = this.task.examples.map((exampleHtml) => {
        const example = createElement({ tag: 'div', className: 'example', innerHTML: exampleHtml });
        return example;
      });

      examples.append(...examplesArr);
      return [title, text, description, examples];
    }
    return [];
  }
}
