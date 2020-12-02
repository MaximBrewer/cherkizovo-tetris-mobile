import _ from 'lodash';
import AppConstants from '../constants/app-constants';
import BoardStore from './board-store';
import EventEmitter from '../modules/event-emitter';
import GameStore from '../stores/game-store';

const { events } = AppConstants;

let points = 0;
let linesCleared = 0;

const ScoreStore = _.extend(
  {
    clearPoints() {
      points = 0;
      linesCleared = 0;
      this.emitChange();
    },
    getPoints() {
      return points;
    },

    getLinesCleared() {
      return linesCleared;
    },

    addPoints(additional) {
      points += additional;
      this.emitChange();
    }
  },
  EventEmitter
);

const pointsPerLine = 3000;
BoardStore.on(events.LINE_CLEARED, (additionalLines) => {
  linesCleared += additionalLines;

  GameStore.faster()
  // what's this called?
  if (additionalLines === 4) {
    ScoreStore.addPoints(pointsPerLine * 2);
  } else {
    ScoreStore.addPoints(additionalLines * pointsPerLine);
  }
});

export default ScoreStore;
