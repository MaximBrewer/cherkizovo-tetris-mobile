import React from 'react';
import AppActions from '../actions/app-actions';
import GameStore from '../stores/game-store';

function gameBoard() {
  return {
    gameBoard: GameStore.getGameBoard()
  };
}

const watchKeys = (e) => {
  if (e.isComposing || e.keyCode === 229) {
    return;
  }
  switch (e.keyCode) {
    case 32:
      AppActions.hardDrop()
      e.preventDefault();
      break;
    case 37:
      AppActions.moveLeft()
      e.preventDefault();
      break;
    case 38:
      AppActions.flipClockwise()
      e.preventDefault();
      break;
    case 39:
      AppActions.moveRight()
      e.preventDefault();
      break;
    case 40:
      AppActions.moveDown()
      e.preventDefault();
      break;
    default:
      break;
  }
}

function addKeyboardEvents() {
  window.addEventListener('keydown', watchKeys)
}
function removeKeyboardEvents() {
  window.removeEventListener('keydown', watchKeys)
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
