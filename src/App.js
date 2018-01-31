import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state={
      turn: 'X',
      board: Array(9).fill(''),
      gameEnded: false,
      totalMoves:0,
      winnerLine:''
    }
    this.boardClicked=this.boardClicked.bind(this);
    this.checkWinningCondition=this.checkWinningCondiition.bind(this);
    this.resetgame=this.resetgame.bind(this);
  }
  boardClicked(e){
    // to stop user from entering after finding the winner.
    if(this.state.winnerLine===''){
      // to avoid giving chance to click the same box again. check if it's marked before assigning state.
      if(this.state.board[e.target.getAttribute("box")] === ''){
        this.state.board[e.target.getAttribute("box")] = this.state.turn;

        this.setState({
          turn: this.state.turn === 'X'?'O':'X',
          board: this.state.board,
          totoalMoves: this.state.totalMoves++
        })
      }
      var result = this.checkWinningCondiition();
      if(result){
        this.setState({
            gameEnded: true,
        })
      }
      if(result==='X'){
        this.setState({
          winnerLine: 'Player X won the game'
        })
      }
      else if(result==='O'){
        this.setState({
          winnerLine: 'Player O won the game'
        })
      }
      else if(result === 'game_draw'){
        this.setState({
          winnerLine: 'Match ends in draw.'
        })
      }
    }
  }
  resetgame(e){
    e.preventDefault();
    this.setState({
      turn: 'X',
      board: Array(9).fill(''),
      gameEnded: false,
      totalMoves:0,
      winnerLine:''
    })
  }
  checkWinningCondiition(){
    var winner_moves=[
                          [0,4,8],[2,4,6],//diagonal condition
                          [0,3,6],[1,4,7],[2,5,8],//row condition
                          [0,1,2],[3,4,5],[6,7,8] // column condition
                      ];
    //compare board marks with all of these winner_moves. If it matches with a unique player, determine the winner.
    //pass this winner_moves array as an index to board array to compare values.
    let board=this.state.board;
    for(let i=0;i<winner_moves.length;i++){
      if(
          board[winner_moves[i][0]]===board[winner_moves[i][1]] &&
          board[winner_moves[i][1]]===board[winner_moves[i][2]]
        ){
          return board[winner_moves[i][0]];
        }
    }
    if(this.state.totalMoves===9){
      //code reaches here when there is no winner.so return a dummy text to identify draw condition.
      return 'game_draw'
    }
  }
  render() {
    return (
      <div className="App">
        <div id="game">
            <div id="header">
              <h1> Classic Tic Tac Toe </h1>
            </div>
            <div id="score">
              <h2 className="result">{this.state.winnerLine} </h2>
            </div>
            <div id="board" onClick={(e)=>{this.boardClicked(e)}}>
              { this.state.board.map((cell, idx) => {
                return <div className="square" box={idx}>
                        {cell}
                       </div>
              })}
            </div>
              <button type="button" className="btn btn-primary" onClick={this.resetgame}>Reset Game</button>
        </div>
        <div id="footer">
            Created in React.js by Swetha.
        </div>
      </div>
    );
  }
}

export default App;
