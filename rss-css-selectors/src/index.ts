import App from './app/App';
import './style/animation.scss';
import './style/placeholders.scss';
import './style/index.scss';
import store from './redux/store';

console.log('Initial state: ', store.getState());

store.subscribe(() => {
  console.log('State: ', store.getState());
});
const app = new App();
app.start();
