import { Component } from "react";
import "./BoardStyle.css";
import Square from "./Square";
import RefreshBtn from "./RefreshBtn";

class Board extends Component {
  constructor(props) {
    super(props);
    // the first time this board renders we wanna have a null inside the squares array that is because we wanna show nothing, and the xIsNext tells that its x's turn now
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleRefreshClick() {
    window.location.reload();
  }

  // this is the method we will be passing in the square
  handleClick(i) {
    // the i is basically the number of the square

    const squares = [...this.state.squares]; // making a copy of the squares

    if (calculateWinner(squares)) {
      // if there is a winner then its gonna say no more clicking
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O"; // this is the copy one that we just created
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  // why are we using this renderSquare as a method and not just <Square />? because we wanna be able to pass which square it is that we're gonna pass to know that which one is checked
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]} // this will take the value from the state its either gonna be x . o or null ( which will render nothing )
        onClick={() => !this.state.squares[i] && this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = `Winner! -> ${winner}`;
    } else if (this.state.isTie) {
      status = `No one won, you both are losers :0`;
    } else {
      status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div>
          <RefreshBtn refreshClick={this.handleRefreshClick} />
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

export default Board;
