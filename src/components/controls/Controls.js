import React from 'react';

import './Controls.css';

import Button from './Button';


export default function Controls(props) {
	let isDisabled = props.aliveCount ? false : true;
	
	return (
		<div className="Controls">
			<Button id="startStop" name={props.isEvolving ? "pause" : "play"}
				disabled={isDisabled}
				controller={props.controller} 
			/>
			<Button id="next" name="step-forward"
				disabled={isDisabled}
				controller={props.controller} 
			/>
			<Button id="clear" name="remove" 
				disabled={isDisabled}
				controller={props.controller} 
			/>
			<Button id="restart" name="refresh" controller={props.controller} />
		</div>
	);
}