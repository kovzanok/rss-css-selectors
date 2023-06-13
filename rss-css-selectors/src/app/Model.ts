import { levels } from '../levels';
import {
  findElementIndex,
  getAllChildElements,
  removeSpecialElements,
  shakeElement,
} from '../utils/utils';
import App from './App';
import CssInput from './CssInput/CssInput';
import GameBoard from './GameBoard.ts/GameBoard';
import HtmlMarkup from './HtmlMarkup/HtmlMarkup';

export default class Model {
  constructor(
    private gameBoard: GameBoard,
    private htmlMarkup: HtmlMarkup,
    private cssInput: CssInput,
    private app: App
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
    const completedLevelNums = this.app.progress
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
    if (this.isWin() && this.isLastLevel()) {
      removeSpecialElements(
        game,
        this.cssInput.searchedSelector as string,
        (() => {
          alert('Победа');
          this.goToLevel(0);
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
    this.app.levelNum = levelNum;
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
    const savedLevel = this.app.progress.find((level) => level.levelNum === this.app.levelNum);
    if (savedLevel) {
      if (isDone) savedLevel.isDone = isDone;
      if (wasHelpUsed) savedLevel.wasHelpUsed = wasHelpUsed;
    } else {
      this.app.progress.push({
        levelNum: this.app.levelNum,
        isDone: isDone,
        wasHelpUsed: wasHelpUsed,
      });
    }
  }

  public resetProgress() {
    this.app.progress = [];
    this.app.levelNum = 0;
    this.app.restart();
  }

  public nextLevel = () => {
    this.app.levelNum += 1;
    this.app.restart();
  };

  public prevLevel = () => {
    this.app.levelNum -= 1;
    this.app.restart();
  };

  private isLastLevel(): boolean {
    return this.app.levelNum === levels.length - 1;
  }

  private isWin(): boolean {
    return this.app.progress.length === levels.length;
  }
}
