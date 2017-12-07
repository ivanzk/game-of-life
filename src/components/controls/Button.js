import React from 'react';

import './Button.css';

import FontAwesome from 'react-fontawesome';


export default function Button(props) {
	return (
		<div className={props.disabled ? "Button disabled" : "Button" }>
			<button id={props.id} aria-label={props.id} onClick={props.controller}>
				<FontAwesome name={props.name} />
			</button>
		</div>
	);
}