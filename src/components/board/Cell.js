import React from 'react';

import './Cell.css';


export default function Cell(props) {
	let deadOrAlive = props.boardState[props.x] ? 'alive' : 'dead';
	
	return (
		<div className={`Cell ${deadOrAlive}`}
			onClick={() => props.changeCellState(props.x, props.y)} >
		</div>
	);
}
