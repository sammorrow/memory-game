import React, { Component } from 'react';
import { connect } from 'react-redux';

import Game from './Game';
import Lobby from './Lobby';

// options list if we'd like to test other variations. careful, there's no validation!
const modeList = [[3, 4], [5, 2], [4, 4], [4, 5]]

class GameManager extends Component {

  render() {
    const { board } = this.props
    return (
      <div>
        { board && board.length ? 
            <Game /> :
            <Lobby modeList={modeList} />
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  board: state.board
})

export default connect(mapStateToProps)(GameManager)