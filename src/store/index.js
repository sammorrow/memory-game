import { createStore } from 'redux';


// constants
const SET_BOARD = 'SET_BOARD';
const RESET_BOARD = 'RESET_BOARD';
const TOGGLE_CELL = 'TOGGLE_CELL';
const PICK_CELL = 'PICK_CELL';
const SET_BUSY = 'SET_BUSY';
const CLEAR_PICK = 'CLEAR_PICK';
const SET_FREE = 'SET_FREE';
const TOGGLE_PEEK = 'TOGGLE_PEEK';

const defaultState = {board: [], lastPick: {}, busy: false, peekMode: false};

// action creators
export const setBoard = board => ({'type': SET_BOARD, board});
export const resetBoard = () => ({'type': RESET_BOARD});
export const toggleCell = dimensions => ({'type': TOGGLE_CELL, dimensions});
export const pickCell = cell => ({'type': PICK_CELL, cell});
export const clearPick = () => ({'type': CLEAR_PICK});
export const setBusy = () => ({'type': SET_BUSY});
export const setFree = () => ({'type': SET_FREE});
export const togglePeekMode = () => ({'type': TOGGLE_PEEK});

// reducer 
const reducer = (state = defaultState, action) => {
    let newState = {...state}
    switch (action.type){
        case SET_BOARD:
            newState = {
                ...state,
                board: action.board.map(newRow => newRow.map(cell => cell && Object.assign({}, cell)))
            }
            return newState;
        case RESET_BOARD:
            let peekMode = state.peekMode;
            newState = {
                ...defaultState,
                peekMode: peekMode
            }
            return newState;
        case TOGGLE_CELL:
            let [row, col] = action.dimensions;
            newState = {
                ...state,
                board: state.board.map(rowArray => rowArray.map(cell => cell && cell.row === row && cell.col === col ? Object.assign({}, cell, {active: !cell.active}) : cell ))
            }
            return newState;
        case PICK_CELL:
            newState = {
                ...state,
                lastPick: Object.assign({}, action.cell)
            }
            return newState;           
        case CLEAR_PICK:
            newState = {
                ...state,
                lastPick: {}
            }
            return newState;
        case SET_BUSY:
            newState = {
                ...state,
                busy: true
            }
            return newState;
         case SET_FREE:
            newState = {
                ...state,
                busy: false
            }
            return newState;
        case TOGGLE_PEEK:
            newState = {
                ...state,
                peekMode: !state.peekMode
            }
            return newState;
        default:
            return newState;
    }
}

export default createStore(reducer);