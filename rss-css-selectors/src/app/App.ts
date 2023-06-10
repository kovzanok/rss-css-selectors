import GameBoard from './GameBoard.ts/GameBoard';
import { levels } from '../levels';
import { Level } from '../types';
import CssInput from './CssInput/CssInput';
import HtmlMarkup from './HtmlMarkup/HtmlMarkup';
import Controller from './Controller';
import GameBlock from '../utils/GameBlock';
import Navigation from './Navigation/Navigation';

export default class App {
  private level: Level;
  public levelNum: number;
  constructor() {
    this.levelNum = Number(window.localStorage.getItem('rss-css-selector-lvl'));
    this.level = levels[this.levelNum];
    window.onunload = () => {
      localStorage.setItem('rss-css-selector-lvl', String(this.levelNum));
    };
  }
  start() {
    const gameBoard = new GameBoard(this.level.searchedEl, this.level.markup);
    const cssInput = new CssInput(this.level.searchedSelector);
    const htmlMarkup = new HtmlMarkup(this.level.markup);
    const navigation = new Navigation(this.level.task, this.levelNum);
    const controller = new Controller(gameBoard, htmlMarkup, this);
    App.setControllers([gameBoard, navigation, htmlMarkup, cssInput], controller);

    document.body.append(
      navigation.renderNavigation(),
      gameBoard.renderBlock(),
      cssInput.renderInputForm(),
      htmlMarkup.renderMarkup()
    );

    console.log('start app');
  }

  public restart() {
    document.body.innerHTML = '';
    this.level = levels[this.levelNum];
    this.start();
  }

  private static setControllers(gameBlockArr: GameBlock[], controller: Controller): void {
    gameBlockArr.forEach((gameBlock) => gameBlock.setController(controller));
  }
}
