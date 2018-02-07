import React from 'react';
import Card from './Card';

export default props => {
    const { board } = props;
    return (
        <div className="grid-container">
        { board && board.map((row, idx) => {
            return (
                <div key={`row-${idx}`}className="grid-row">
                    { row && row.map(cell => <Card key={`${cell.row}-${cell.col}`} cell={cell}/>) }
                </div> 
            )
         })
        }
        </div>
    )
}