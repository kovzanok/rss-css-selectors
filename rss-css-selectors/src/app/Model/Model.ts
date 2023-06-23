import { levels } from '../../levels';
import {
  findElementIndex,
  getAllChildElements,
  removeSpecialElements,
  shakeElement,
} from '../../utils/utils';
import App from '../App';
import CssInput from '../CssInput/CssInput';
import GameBoard from '../GameBoard.ts/GameBoard';
import HtmlMarkup from '../HtmlMarkup/HtmlMarkup';
import Popup from '../Popup/Popup';
import store from '../../redux/store';
import { LevelProgress } from '../../types';

export default class Model {
  private popupElement!: HTMLDivElement;
  constructor(
    private gameBoard: GameBoard,
    private htmlMarkup: HtmlMarkup,
    private cssInput: CssInput,
    private app: App,
    private popup: Popup
  ) {}

  public static separateElementAndMarkup(
    relativeEl: HTMLElement,
    hoveredElement: HTMLElement
  ): HTMLElement[] {
    if (hoveredElement.textContent?.length === 0) {
      return [hoveredElement, relativeEl];
    } else {
      return [relativeEl, hoveredElement];
    }
  }

  public static displayHelper(elementToGetHelperText: HTMLElement): void {
    const rectParams = elementToGetHelperText.getBoundingClientRect();
    GameBoard.helperElement.style.display = 'block';
    GameBoard.helperElement.style.left = rectParams.left + 20 + 'px';
    GameBoard.helperElement.style.top = rectParams.top - 60 + 'px';
  }

  public static hideHepler(): void {
    GameBoard.helperElement.style.display = 'none';
  }

  public static getElementMarkup(element: HTMLElement): string {
    const text = element.textContent as string;
    const firstAngleBracket = text.indexOf('<');
    const secondAngleBracket = text.indexOf('>');
    const elementInfo = text
      .slice(firstAngleBracket + 1, secondAngleBracket)
      .replace('/', '')
      .trim();
    const isAnyAttributes = elementInfo.includes(' ');
    const tagName = elementInfo.slice(
      0,
      isAnyAttributes ? elementInfo.indexOf(' ') : elementInfo.length
    );
    return `<${elementInfo}></${tagName}>`;
  }

  public static hightlightElements(relativeEl: HTMLElement, hoveredElement: HTMLElement): void {
    relativeEl.classList.add('highlighten');
    hoveredElement.classList.add('highlighten');
  }

  public static removeHightlight(relativeEl: HTMLElement, hoveredElement: HTMLElement): void {
    relativeEl.classList.remove('highlighten');
    hoveredElement.classList.remove('highlighten');
  }

  public findHoveredRelative(parentElement: HTMLElement, hoveredElement: HTMLElement): HTMLElement {
    const allChildrenArr = getAllChildElements(parentElement);
    const index = findElementIndex(hoveredElement, allChildrenArr);
    let relativeParent;
    if (parentElement.classList.contains('markup')) {
      relativeParent = this.gameBoard.getGameField();
    } else {
      relativeParent = this.htmlMarkup.getMarkupElement();
    }
    const allChildrenRelArr = getAllChildElements(relativeParent);
    const relativeEl = allChildrenRelArr[index];
    return relativeEl;
  }

  public checkAnswer(typedSelector: string): boolean {
    if (typedSelector.length === 0) return false;
    const gameField = this.gameBoard.getGameField();
    const foundRes = gameField.querySelectorAll(typedSelector);
    const taskRes = gameField.querySelectorAll(this.cssInput.searchedSelector as string);
    return (
      Array.from(taskRes).every((el, index) => {
        return el === foundRes[index];
      }) && foundRes.length === taskRes.length
    );
  }

  public handleWrongAnswer(typedSelector: string) {
    const game = this.gameBoard.getGameField();
    if (typedSelector.length !== 0) {
      game.querySelectorAll(typedSelector).forEach((el) => {
        if (el instanceof HTMLElement) {
          shakeElement(el);
        }
      });
    }

    const form = this.cssInput.getForm();
    const htmlMarkup = this.htmlMarkup.getMarkupElement();

    shakeElement(form);
    shakeElement(htmlMarkup);
  }

  private findFirstNotcompletedLevel() {
    const progress = store.getState().progress;
    const completedLevelNums = progress
      .map((levelInfo) => levelInfo.levelNum)
      .sort((a, b) => a - b);
    const allLevelNums = new Array(levels.length).fill(0).map((_, index) => index);
    const notcompletedLevelNums = allLevelNums.filter(
      (num, index) => num !== completedLevelNums[index]
    );
    return notcompletedLevelNums[0];
  }

  public removeGameField(): void {
    const game = this.gameBoard.getGameField();
    const { levelNum } = store.getState().level;
    if (this.isWin()) {
      removeSpecialElements(
        game,
        this.cssInput.searchedSelector as string,
        (() => {
          this.popupElement = this.popup.renderPopup();
          document.body.append(this.popupElement);

          this.goToLevel(levelNum);
        }).bind(this)
      );
    } else if (this.isLastLevel()) {
      const num = this.findFirstNotcompletedLevel();
      removeSpecialElements(
        game,
        this.cssInput.searchedSelector as string,
        (() => this.goToLevel(num)).bind(this)
      );
    } else {
      removeSpecialElements(
        game,
        this.cssInput.searchedSelector as string,
        this.nextLevel.bind(this)
      );
    }
  }

  public goToLevel(levelNum: number) {
    store.dispatch({ type: 'currentLevel/changeLevel', payload: levelNum });
    this.app.restart();
  }

  public enterCorrenctAnswer() {
    const form = this.cssInput.getForm();
    const input = form.querySelector('input') as HTMLInputElement;
    input.value = '';
    this.fillInputValue(input, 0, this.cssInput.searchedSelector as string);
    this.saveProgress({ wasHelpUsed: true });
  }

  private fillInputValue(input: HTMLInputElement, index: number, text: string) {
    const inputEvent = new Event('input');
    input.dispatchEvent(inputEvent);
    if (index < text.length) {
      input.value += text[index++];
      setTimeout(() => this.fillInputValue(input, index, text), 200);
    }
  }

  public saveProgress({
    isDone = false,
    wasHelpUsed = false,
  }: {
    isDone?: boolean;
    wasHelpUsed?: boolean;
  }) {
    const progress = store.getState().progress;
    const { levelNum } = store.getState().level;
    const savedLevel = { ...progress.find((level) => level.levelNum === levelNum) };
    if (Object.keys(savedLevel).length === 3) {
      if (isDone) savedLevel.isDone = isDone;
      if (wasHelpUsed) savedLevel.wasHelpUsed = wasHelpUsed;
      store.dispatch({ type: 'progress/changeLevel', payload: savedLevel as LevelProgress });
    } else {
      store.dispatch({
        type: 'progress/addLevel',
        payload: {
          levelNum: levelNum,
          isDone: isDone,
          wasHelpUsed: wasHelpUsed,
        },
      });
    }
  }

  public resetProgress() {
    store.dispatch({ type: 'currentLevel/changeLevel', payload: 0 });
    store.dispatch({
      type: 'progress/reset',
      payload: { levelNum: 0, wasHelpUsed: false, isDone: false },
    });
    this.app.restart();
  }

  public nextLevel = () => {
    const { levelNum } = store.getState().level;
    store.dispatch({ type: 'currentLevel/changeLevel', payload: levelNum + 1 });
    this.app.restart();
  };

  private isLastLevel(): boolean {
    const { levelNum } = store.getState().level;
    return levelNum === levels.length - 1;
  }

  private isWin(): boolean {
    const progress = store.getState().progress;
    return progress.length === levels.length;
  }

  public toggleMenu = (e: Event): void => {
    const target = e.target;

    if (target && target instanceof HTMLElement) {
      if (target.id === 'burger') {
        const main = target.parentElement as HTMLElement;
        const menu = main.querySelector('#menu') as HTMLElement;
        menu.classList.toggle('active');
        document.body.classList.toggle('lock');
      } else if (
        target.classList.contains('level-item') ||
        target.classList.contains('menu') ||
        target.classList.contains('reset-button')
      ) {
        const menu = document.getElementById('menu') as HTMLElement;
        menu.classList.remove('active');
        document.body.classList.remove('lock');
      }
    }
  };

  public changeClassName(input: HTMLInputElement) {
    const form = input.form as HTMLFormElement;
    if (input.value.length === 0) {
      form.classList.add('blink');
    } else {
      form.classList.remove('blink');
    }
  }

  public closePopup() {
    this.popupElement.remove();
  }
}
