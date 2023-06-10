import { Task } from '../../types';
import GameBlock from '../../utils/GameBlock';
import { levels } from '../../levels';

export default class Navigation extends GameBlock {
  constructor(task: Task, private levelNum: number) {
    super({ task });
  }

  renderNavigation(): HTMLDivElement {
    const navigation = document.createElement('div');

    const buttons = this.renderControls();

    const levelCount = document.createElement('h2');
    levelCount.textContent = `Level ${this.levelNum + 1} of ${levels.length}`;

    if (this.task) {
      const title = document.createElement('h3');
      title.textContent = this.task.taskName;

      const text = document.createElement('p');
      text.textContent = this.task.taskText;

      const description = document.createElement('p');
      description.textContent = this.task.taskDescription;

      const examples = document.createElement('p');
      examples.textContent = `Examples:\n${this.task.examples}`;

      navigation.append(...buttons, levelCount, title, text, description, examples);
    }

    return navigation;
  }

  renderControls() {
    const controls = ['prev-lvl', 'next-lvl'];
    return controls.map((control: string): HTMLButtonElement => {
      const button = document.createElement('button');
      button.className = control;
      button.textContent = control;
      button.disabled =
        (control === 'prev-lvl' && this.levelNum === 0) ||
        (control === 'next-lvl' && this.levelNum === levels.length - 1);
      button.onclick =
        control === 'prev-lvl' ? this.controller.prevLevel : this.controller.nextLevel;

      return button;
    });
  }
}
