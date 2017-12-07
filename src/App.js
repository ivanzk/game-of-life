import React, { Component } from 'react';
import './App.css';

import FontAwesome from 'react-fontawesome';

import GameOfLife from './components/GameOfLife';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
         	<div className="App-title">
						<h1>Game Of Life</h1>
         	</div>
					<div className="App-github">
						<a href="https://github.com/ivanzk/game-of-life"
							title="Github"
						>
							<FontAwesome name="github" size="2x" />
						</a>
					</div>
        </header>
        <GameOfLife />
      </div>
    );
  }
}

export default App;
