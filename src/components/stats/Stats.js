import React from 'react';

import './Stats.css';


export default function Stats(props) {
	return (
		<div className="Stats">
			<h1>Generation: {props.generation}</h1>
		</div>
	);
}