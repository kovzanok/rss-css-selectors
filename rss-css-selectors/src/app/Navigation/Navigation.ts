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

    if (this.progress) {
      const isLevelDone = !!this.progress.find((levelInfo) => levelInfo.levelNum === this.levelNum);
      const wasHelpUsed = !!this.progress.find(
        (levelInfo) => levelInfo.levelNum === this.levelNum && levelInfo.wasHelpUsed
      );
      const levelCount = createElement<HTMLHeadingElement>({
        tag: 'h2',
        textContent: `Level ${this.levelNum + 1} of ${levels.length}`,
        className: isLevelDone ? 'done' : '' + wasHelpUsed ? 'help' : '',
      });
      navigation.append(...buttons, levelCount, ...this.renderTaskFullInfo());
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
        className: control,
        disabled: isDisabled,
        textContent: control,
        eventHandlers: { click: this.controller.handleLevelChange },
      });
      return button;
    });
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
        textContent: this.task.taskDescription,
      });

      const examples = createElement({ tag: 'p', textContent: `Examples:\n${this.task.examples}` });
      return [title, text, description, examples];
    }
    return [];
  }
}
