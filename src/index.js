import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Board from "./components/Board";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: true,
      isTie: false,
      stepNum: 0,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNum + 1);
    const current = history[history.length - 1];
    const squares = [...current.squares];

    if (calculateWinner(squares) || squares[i]) return;

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{ squares: squares }]),
      xIsNext: !this.state.xIsNext,
      stepNum: history.length,
    });

    if (!squares.some((sq) => sq === null)) this.setState({ isTie: true });
  }

  jumpTo(moveNum) {
    console.log(`Jumping to move #${moveNum}`);
    this.setState({
      stepNum: moveNum,
      xIsNext: moveNum % 2 === 0,
    });
  }

  render() {
    const history = this.state.history.slice(0, this.state.stepNum + 1);
    const current = history[this.state.stepNum];
    const winner = calculateWinner(current.squares);

    // the step is the actual element itsef, while the move is the index of that element
    const moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : `Go to game start`;
      return (
        <li key={move} className="p-1 me-4">
          <button
            className="btn btn-secondary my-1"
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;

    if (winner) status = `Winner! -> ${winner}`;
    else if (this.state.isTie)
      status = `Too bad no one won, you both are losers :0`;
    else status = `Next player ${this.state.xIsNext ? `X` : `O`}`;

    // ALTERNATIVC WAY OF WRITING THIS ( NOT TOO GOOD   )
    // status = winner
    // ? `Winner! -> ${winner}`
    // : `Next player ${this.state.xIsNext ? `X` : `O`}`;

    // this.state.isTie && status = `Too bad you both are losers :0`

    return (
      <div className="game-info-list d-flex flex-wrap">
        <div className="game-board">
          <Board
            squares={current.squares}
            onclick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="px-3 py-2 fw-bold fs-4 w-75">{status}</div>
          <ol className="game-info-list d-flex flex-column flex-wrap">
            {moves}
          </ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
