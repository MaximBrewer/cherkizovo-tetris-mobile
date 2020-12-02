import React from 'react';
import key from 'keymaster';
import AppActions from '../actions/app-actions';
import GameStore from '../stores/game-store';
// import AppConstants from '../constants/app-constants';

// const { states } = AppConstants;

function gameBoard() {
  return {
    gameBoard: GameStore.getGameBoard()
  };
}

const keyboardMap = {
  // x: AppActions.moveDown,
  z: AppActions.moveLeft,
  c: AppActions.moveRight,
  space: AppActions.hardDrop,
  // z: AppActions.flipCounterclockwise,
  // x: AppActions.flipClockwise,
  x: AppActions.flipClockwise,
  // s: AppActions.flipClockwise,
  // p: () => {
  //   if (GameStore.getCurrentState() === states.PLAYING) {
  //     AppActions.pause();
  //   } else {
  //     AppActions.resume();
  //   }
  // },
  // c: AppActions.hold,
  // shift: AppActions.hold
};

function addKeyboardEvents() {
  Object.keys(keyboardMap).forEach((k) => {
    // if (k === 'shift') {
    //   DetectShift.bind(keyboardMap[k]);
    // } else {
      key(k, keyboardMap[k]);
    // }
  });
}
function removeKeyboardEvents() {
  Object.keys(keyboardMap).forEach((k) => {
    // if (k === 'shift') {
    //   DetectShift.unbind(keyboardMap[k]);
    // } else {
      key.unbind(k);
    // }
  });
}

export default class Gameboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = gameBoard();
  }

  componentDidMount() {
    GameStore.addChangeListener(this._onChange);
    addKeyboardEvents();
  }

  componentWillUnmount() {
    removeKeyboardEvents();
    GameStore.pause();
    GameStore.removeChangeListener(this._onChange);
  }

  _onChange = () => {
    this.setState(gameBoard());
  };

  render() {
    const rows = this.state.gameBoard.map((row, i) => {
      const blocksInRow = row.map((block, j) => {
        const classString = `game-block ${block || 'block-empty'}`;
        return <td key={j} className={classString} />;
      });

      return <tr key={i}>{blocksInRow}</tr>;
    });
    return (
      <table className="game-board">
        <tbody>{rows}</tbody>
      </table>
    );
  }
}
