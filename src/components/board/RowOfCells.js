import React from 'react';

import './RowOfCells.css';

import Cell from './Cell';


export default function RowOfCells(props) {
	let cells = [];
	for(let i = 0; i < props.boardDimensions.width; i++) {
		cells.push(
			<Cell
				key={i} 
				x={i}
				y={props.y}
				boardState={props.boardState[props.y]}
				changeCellState={props.changeCellState}
			/>
		);
	}
	
	return (
		<div className="RowOfCells">
			{cells}
		</div>
	);
}
