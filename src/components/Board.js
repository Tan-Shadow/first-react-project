import { Component } from "react";
import "./BoardStyle.css";
import Square from "./Square";
import RefreshBtn from "./RefreshBtn";

class Board extends Component {
  handleRefreshClick() {
    window.location.reload();
  }

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onclick(i)}
      />
    );
  }

  render() {
    return (
      <div>
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

export default Board;
