import './App.css';
import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #d3e397;
  margin: 100px 200px;
  display: flex;

  height: 720px;
  flex-direction: column;
  align-items: center;
`;

const Status = styled.div`
  margin: 10px;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
`;

function Square({ value, handleClick, x, y }) {
  return (
    <button className="square" onClick={() => handleClick(x, y)}>
      {value}
    </button>
  );
}

let squareKey = 0;
function Row({ rowI, handleClick, y }) {
  return (
    <div className="board-row">
      {rowI.map((square, index) => {
        squareKey++;
        return <Square value={rowI[index]} x={index} y={y} handleClick={handleClick} key={'S' + squareKey} />;
      })}
    </div>
  );
}

function Board() {
  const [board, setBoard] = useState({ squares: Array(19).fill(Array(19).fill(null)), xIsNext: true });
  let nextPlayer = board.xIsNext ? '○' : '●';
  let status;
  const winner = calculateWinner(board.squares);
  if (winner) {
    status = `winner: ${winner}`;
  } else {
    status = `Next Player: ${board.xIsNext ? '○' : '●'}`;
  }
  const handleClick = (x, y) => {
    if (board.squares[y][x]) return;
    setBoard({
      squares: board.squares.map((row, currentY) => {
        if (currentY !== y) return row;
        return row.map((square, currentX) => {
          if (currentX !== x) return square;
          return nextPlayer;
        });
      }),
      xIsNext: !board.xIsNext,
    });
  };
  return (
    <div>
      <Status>{status}</Status>
      {board.squares.map((row, index) => {
        return <Row key={'R' + index} y={index} rowI={board.squares[index]} handleClick={handleClick} />;
      })}
    </div>
  );
}

function Game() {
  return (
    <Wrapper>
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    </Wrapper>
  );
}

// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
//       return squares[a];
//     }
//   }
//   return null;
// }

function calculateWinner(board) {
  // 檢查橫排
  for (let i = 0; i < 19; i++) {
    for (let j = 0; j <= 13; j++) {
      if (board[i][j]) {
        if (
          board[i][j] === board[i][j + 1] &&
          board[i][j + 1] === board[i][j + 2] &&
          board[i][j + 2] === board[i][j + 3] &&
          board[i][j + 3] === board[i][j + 4]
        ) {
          console.log(board[i][j], '橫排贏');
          return board[i][j];
        }
      }
    }
  }

  // 檢查直排
  for (let i = 0; i <= 13; i++) {
    for (let j = 0; j < 19; j++) {
      if (board[i][j]) {
        if (
          board[i][j] === board[i + 1][j] &&
          board[i + 1][j] === board[i + 2][j] &&
          board[i + 2][j] === board[i + 3][j] &&
          board[i + 3][j] === board[i + 4][j]
        ) {
          console.log(board[i][j], '直排贏');
          return board[i][j];
        }
      }
    }
  }

  // 檢查左上連右下
  for (let i = 0; i <= 14; i++) {
    for (let j = 0; j <= 14; j++) {
      if (board[i][j]) {
        if (
          board[i][j] === board[i + 1][j + 1] &&
          board[i + 1][j + 1] === board[i + 2][j + 2] &&
          board[i + 2][j + 2] === board[i + 3][j + 3] &&
          board[i + 3][j + 3] === board[i + 4][j + 4]
        ) {
          console.log(board[i][j], '左上連右下贏');
          return board[i][j];
        }
      }
    }
  }

  // 檢查右上連左下
  for (let i = 4; i < 19; i++) {
    for (let j = 0; j <= 14; j++) {
      if (board[i][j]) {
        if (
          board[i][j] === board[i - 1][j + 1] &&
          board[i - 1][j + 1] === board[i - 2][j + 2] &&
          board[i - 2][j + 2] === board[i - 3][j + 3] &&
          board[i - 3][j + 3] === board[i - 4][j + 4]
        ) {
          console.log(board[i][j], '右上連左下贏');
          return board[i][j];
        }
      }
    }
  }
  return null;
}
export default Game;
