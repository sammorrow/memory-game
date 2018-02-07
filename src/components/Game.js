import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setFree, resetBoard } from '../store';
import Grid from './Grid'

class Game extends Component {
    // in case some impatient kids exit before we can unthrottle! otherwise we could have simply combined setBusy and setFree into a toggle.
    componentWillUnmount(){
        const { setFree } = this.props;
        setFree()
    }

    render(){
        const { board, resetBoard } = this.props;
        return (
            <div className="game-container">
                <button className="game-back-button" onClick={resetBoard}> Back </button>
                <Grid board={board} />
            </div>
        );
     }
}

const mapStateToProps = state => ({
    board: state.board,
})

const mapDispatchToProps = dispatch => ({
    setFree: () => dispatch(setFree()),
    resetBoard: () => dispatch(resetBoard())
})

export default connect(mapStateToProps, mapDispatchToProps)(Game);