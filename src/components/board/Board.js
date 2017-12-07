import React from 'react';

import './Board.css';

import RowOfCells from './RowOfCells';


export default function Board(props) {
	let rows = [];
	for(let i = 0; i < props.boardDimensions.height; i++) {
		rows.push(
			<RowOfCells 
				key={i} 
				y={i}
				boardDimensions={props.boardDimensions}
				boardState={props.boardState}
				changeCellState={props.changeCellState} 
			/>
		);
	}
	
	return (
		<div className="Board">
			{rows}
		</div>
	);
}
