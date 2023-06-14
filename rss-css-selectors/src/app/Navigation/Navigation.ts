import { Progress } from '../../types';
import GameBlock from '../../utils/GameBlock';
import { levels } from '../../levels';
import { createElement } from '../../utils/utils';
import './Navigation.scss';

export default class Navigation extends GameBlock {
  constructor(private levelNum: number, progress: Progress) {
    super({}, progress);
  }

  public renderNavigation(): HTMLDivElement {
    const navigation = createElement<HTMLDivElement>({ tag: 'div', className: 'navigation' });

    const title = createElement<HTMLHeadingElement>({
      tag: 'h2',
      textContent: 'Levels',
      className: 'nav-title',
    });

    const levelList = this.renderLevelList();

    const resetProgressButton = createElement({
      tag: 'button',
      className: 'reset-button',
      textContent: 'Reset progress',
      eventHandlers: { click: this.controller.handleReset },
    });

    navigation.append(title, levelList, resetProgressButton);
    return navigation;
  }

  public renderLevelList(): HTMLOListElement {
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
        textContent: level.levelName,
        attributes: { id: String(index) },
      });

      return item;
    });

    list.append(...levelItems);
    return list;
  }
}
