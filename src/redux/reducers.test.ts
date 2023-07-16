import { levels } from '../levels';
import { initialtLevelState, levelReducer } from './reducers';

describe('level reducer', () => {
  test('should return initial state if nothing is provided', () => {
    expect(levelReducer(undefined, { type: 'test', payload: 0 })).toEqual(initialtLevelState);
  });
  test('should return corrent level', () => {
    expect(levelReducer(undefined, { type: 'currentLevel/changeLevel', payload: 2 })).toEqual({
      levelNum: 2,
      levelInfo: levels[2],
    });
  });
});
