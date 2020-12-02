import _ from 'lodash';
import AppDispatcher from '../dispatchers/app-dispatcher';
import AppConstants from '../constants/app-constants';
import EventEmitter from '../modules/event-emitter';
import BoardStore from './board-store';
import PieceStore from './piece-store';
import pieceSetter from '../modules/piece-setter';
import ScoreStore from '../stores/score-store';

const { states, actions, events } = AppConstants;

let _currentState = null;
let _interval = null;
let _speed = 1000;

const GameStore = _.extend(
  {
    getGameBoard() {
      if (_currentState === states.LOST) {
        return BoardStore.getBoard();
      }
      const gameBoard = _.cloneDeep(BoardStore.getBoard());
      const pieceData = PieceStore.getPieceData();
      const setter = pieceSetter(gameBoard);

      // set the preview
      setter(
        pieceData.piece.blocks[pieceData.rotation],
        pieceData.previewPosition,
        'piece-preview'
      );

      // set the actual piece
      setter(
        pieceData.piece.blocks[pieceData.rotation],
        pieceData.position,
        pieceData.piece.className
      );
      return gameBoard;
    },

    getCurrentState() {
      return _currentState;
    },

    forceStart() {
      global.clearInterval(_interval);
      BoardStore.clearTable();
      ScoreStore.clearPoints();
      _currentState = null;
      _speed = 1000;
      this.start()
    },

    start() {
      if (_currentState !== states.LOST) {
        _interval = global.setInterval(() => {
          PieceStore.tick();
        }, _speed);
        _currentState = states.PLAYING;
        this.emitChange();
      }
    },

    faster() {
      global.clearInterval(_interval);
      _speed = _speed / 1.1;
      _interval = global.setInterval(() => {
        PieceStore.tick();
      }, _speed);
    },

    pause() {
      if (_currentState === states.PLAYING) {
        global.clearInterval(_interval);
        _currentState = states.PAUSED;
        this.emitChange();
      }
    },

    onLost() {
      global.clearInterval(_interval);
      _currentState = states.LOST;
      this.emitChange();
    },

    dispatcherIndex: AppDispatcher.register((payload) => {
      const { action } = payload;
      switch (action.actionType) {
        case actions.PAUSE:
          GameStore.pause();
          break;

        case actions.RESUME:
          GameStore.start();
          break;
        default: break;
      }

      return true;
    })
  },
  EventEmitter
);

PieceStore.on(events.PLAYER_LOST, () => {
  GameStore.onLost();
});

// Game store should emit all changes that occur
PieceStore.addChangeListener(() => {
  GameStore.emitChange();
});

BoardStore.addChangeListener(() => {
  GameStore.emitChange();
});

export default GameStore;
