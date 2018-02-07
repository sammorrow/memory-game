import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardBack from '../assets/homer.png';
import bookCovers from '../assets/cards';
import { toggleCell, setBusy, setFree, clearPick, pickCell } from '../store';

class CardComponent extends Component {
    constructor(props){
        super(props)
        this.state = {dirty: false}
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        


        const { dataset } = e.currentTarget,
            dataObj = {...dataset}
        
            dataObj.active = dataObj.active !== 'false'

        let { toggleCell, setBusy, setFree, clearPick, pickCell, busy, lastPick } = this.props
        if (busy || dataObj.active) return;

        this.setState({dirty: true})
        toggleCell([+dataObj.row, +dataObj.col])
        if (!Object.keys(lastPick).length) pickCell(dataObj);
        else if (+lastPick.value === +dataObj.value) clearPick();
        
        else {
            setBusy();
            setTimeout(()=> {
                toggleCell([+dataObj.row, +dataObj.col])
                toggleCell([+lastPick.row, +lastPick.col]);
                clearPick();
            }, 1900) // bit more time on the delay to account for our flip animations
            setTimeout(()=> {
                setFree();
            }, 2800) // let's wait until the second animation finishes before allowing further action
        }
  }

  // css: three states -- default, flipping to front (will be flipped after 850ms), and flipping to back.  
  render(){
    const { cell, peekMode } = this.props,
        { handleClick } = this,
        { dirty } = this.state;
    let flipAnimationClass = cell.active ? "-card-back-flip" : "-card-front-flip";
    if (!peekMode && !dirty) flipAnimationClass = "";
    return (
      <div className="card" data-value={cell.value} data-row={cell.row} data-active={cell.active} data-col={cell.col} onClick={handleClick}>
        <div className={"card-back back"+flipAnimationClass}>
            <img className="card-image" src={CardBack} alt={'The card back.'} />
        </div>
        <div className={"card-front front"+flipAnimationClass}>
            <img className="card-image" src={bookCovers[cell.value]}  alt={`Card ${cell.value}`}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    busy: state.busy,
    lastPick: state.lastPick,
    peekMode: state.peekMode
})

const mapDispatchToProps = dispatch => ({
    toggleCell: dimensions => dispatch(toggleCell(dimensions)),
    pickCell: dimensions => dispatch(pickCell(dimensions)),
    clearPick: () => dispatch(clearPick()),
    setBusy: () => dispatch(setBusy()),
    setFree: () => dispatch(setFree()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CardComponent)
