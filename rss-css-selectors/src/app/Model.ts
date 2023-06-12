import App from './App';
import Controller from './Controller';
import CssInput from './CssInput/CssInput';
import GameBoard from './GameBoard.ts/GameBoard';
import HtmlMarkup from './HtmlMarkup/HtmlMarkup';
export default class Model {
  private controller!: Controller;
  constructor(
    private gameBoard: GameBoard,
    private htmlMarkup: HtmlMarkup,
    private cssInput: CssInput,
    private app: App
  ) {}

  public setController(controller: Controller) {
    this.controller = controller;
  }
}
