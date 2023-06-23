import GameBoard from './GameBoard.ts/GameBoard';
import CssInput from './CssInput/CssInput';
import HtmlMarkup from './HtmlMarkup/HtmlMarkup';
import Controller from './Controller';
import GameBlock from '../utils/GameBlock';
import Navigation from './Navigation/Navigation';
import './App.scss';
import Model from './Model/Model';
import Popup from './Popup/Popup';
import store from '../redux/store';

export default class App {
  private gameContainer: HTMLDivElement;
  private menuContainer: HTMLDivElement;
  constructor() {
    this.gameContainer = document.querySelector('.game-container') as HTMLDivElement;
    this.menuContainer = document.querySelector('.menu-container') as HTMLDivElement;

    window.onunload = () => {
      const { level, progress } = store.getState();
      localStorage.setItem('rss-css-selector-lvl', String(level.levelNum));
      localStorage.setItem('rss-css-selector-progress', JSON.stringify(progress));
    };
  }
  start() {
    const main = document.querySelector('.main') as HTMLElement;
    const gameBoard = new GameBoard();
    const cssInput = new CssInput();
    const htmlMarkup = new HtmlMarkup();
    const navigation = new Navigation();
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

    this.start();
  }

  private static setControllers(gameBlockArr: GameBlock[], controller: Controller): void {
    gameBlockArr.forEach((gameBlock) => gameBlock.setController(controller));
  }
}
