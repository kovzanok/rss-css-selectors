import GameBoard from './GameBoard.ts/GameBoard';
import { levels } from '../levels';
import { Level, Progress } from '../types';
import CssInput from './CssInput/CssInput';
import HtmlMarkup from './HtmlMarkup/HtmlMarkup';
import Controller from './Controller';
import GameBlock from '../utils/GameBlock';
import Navigation from './Navigation/Navigation';
import './App.scss';
import Model from './Model';
import Popup from './Popup/Popup';

export default class App {
  private level: Level;
  public levelNum: number;
  private gameContainer: HTMLDivElement;
  private menuContainer: HTMLDivElement;
  public progress: Progress;
  constructor() {
    this.levelNum = Number(window.localStorage.getItem('rss-css-selector-lvl'));
    this.level = levels[this.levelNum];
    this.gameContainer = document.querySelector('.game-container') as HTMLDivElement;
    this.menuContainer = document.querySelector('.menu-container') as HTMLDivElement;
    this.progress = App.getProgress();

    window.onunload = () => {
      localStorage.setItem('rss-css-selector-lvl', String(this.levelNum));
      localStorage.setItem('rss-css-selector-progress', JSON.stringify(this.progress));
    };
  }
  start() {
    const main = document.querySelector('.main') as HTMLElement;
    const gameBoard = new GameBoard(
      this.level.searchedEl,
      this.level.markup,
      this.level.searchedSelector
    );
    const cssInput = new CssInput(this.level.searchedSelector);
    const htmlMarkup = new HtmlMarkup(this.level.markup);
    const navigation = new Navigation(this.levelNum, this.progress);
    const popup = new Popup();
    const model = new Model(gameBoard, htmlMarkup, cssInput, this, popup);
    const controller = new Controller();
    controller.setModel(model);
    App.setControllers([gameBoard, navigation, htmlMarkup, cssInput, popup], controller);
    main.onclick = controller.handleMainuClick;
    this.gameContainer.append(
      gameBoard.renderBoardElements(),
      cssInput.renderInputForm(),
      htmlMarkup.renderMarkup()
    );

    this.menuContainer.append(navigation.renderNavigation());

    console.log('start app');
  }

  public restart() {
    this.gameContainer.innerHTML = '';
    this.menuContainer.innerHTML = '';

    this.level = levels[this.levelNum];
    this.start();
  }

  private static setControllers(gameBlockArr: GameBlock[], controller: Controller): void {
    gameBlockArr.forEach((gameBlock) => gameBlock.setController(controller));
  }

  private static getProgress(): Progress {
    const progressString = window.localStorage.getItem('rss-css-selector-progress');

    if (progressString && progressString.length !== 0) {
      return JSON.parse(progressString) as Progress;
    }
    return [];
  }
}
