import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setBoard, togglePeekMode } from '../store';

class Lobby extends Component {

  constructor(props){
    super(props)
    this.createGrid = this.createGrid.bind(this);
  }

  createGrid(rows, cols){
    // collects and shuffles elements in 1d array, groups them into 2d array
    let { setBoard } = this.props;
    return () => { 
        let cellCount = rows * cols,
            digitArray = new Array(cellCount).fill(0).map((el, idx) => Math.floor(idx / 2)),
            newBoard = new Array(rows).fill([]);
        
        for (let i = digitArray.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [digitArray[i], digitArray[j]] = [digitArray[j], digitArray[i]];
        }

        digitArray.forEach((digit, idx) => {
            let hash = Math.floor(idx % rows);
            newBoard[hash] = newBoard[hash].concat({value: digit, active: false, row: idx % rows, col: Math.floor(idx / rows)});
        })

        setBoard(newBoard);
    }
  }

  render() {
    let { modeList, peekMode, togglePeekMode } = this.props, { createGrid } = this
    return (
      <div className="lobby-container">
        <header className="lobby-header">
          <h1 className="lobby-title">Memory Game</h1>
          <h3> Hone your memory skills by matching these books together! Pick a grid size below to get started. </h3>
        </header>
         { modeList && modeList.map(dimensions => {
                let [rows, columns] = dimensions
                return <button key={dimensions} className="lobby-mode-button" onClick={createGrid(rows, columns)}> { rows } <small>x</small> { columns } </button>
            })
         }
        <button className={`lobby-peek-button ${peekMode ? 'active' : ''}`} onClick={togglePeekMode} title={`When active, you'll sneak a peek at the book covers before they're hidden!... Cheater...!`} > Peek Mode </button>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  board: state.board,
  peekMode: state.peekMode
})


const mapDispatchToProps = dispatch => ({
    setBoard: grid => dispatch(setBoard(grid)),
    togglePeekMode: () => dispatch(togglePeekMode())
})

export default connect(mapStateToProps, mapDispatchToProps)(Lobby)