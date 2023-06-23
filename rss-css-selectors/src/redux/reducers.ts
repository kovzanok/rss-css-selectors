import { levels } from '../levels';
import { LevelProgress, Progress } from '../types';

interface LevelAction {
  type: string;
  payload: number;
}

const levelNum = Number(window.localStorage.getItem('rss-css-selector-lvl'));

const initialtLevelState = {
  levelNum,
  levelInfo: levels[levelNum],
};

export function levelReducer(state = initialtLevelState, action: LevelAction) {
  switch (action.type) {
    case 'currentLevel/changeLevel':
      return {
        levelNum: action.payload,
        levelInfo: levels[action.payload],
      };
    default:
      return state;
  }
}

interface ProgressAction {
  type: string;
  payload: LevelProgress;
}

const initialProgressState: Progress = JSON.parse(
  window.localStorage.getItem('rss-css-selector-progress') || '[]'
);

export function progressReducer(state = initialProgressState, action: ProgressAction) {
  switch (action.type) {
    case 'progress/addLevel':
      return [...state, action.payload];

    case 'progress/changeLevel':
      return state.map((levelProgress) => {
        if (levelProgress.levelNum === action.payload.levelNum) {
          return action.payload;
        }
        return levelProgress;
      });
    case 'progress/reset':
      return [];
    default:
      return state;
  }
}
