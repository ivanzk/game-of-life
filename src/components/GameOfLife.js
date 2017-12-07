import React, { Component } from 'react';
import {Container, Row, Col} from 'reactstrap';

import Board from './board/Board';
import Controls from './controls/Controls';
import Stats from './stats/Stats';


export default class GameOfLife extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			boardDimensions: {
				width: 48,
				height: 36
			},
			boardState: this.randomStateGenerator(48, 36),
			generation: 0,
			aliveCount: 0,
			isEvolving: false
		}
		
		this.changeCellState = this.changeCellState.bind(this);
		this.evolve = this.evolve.bind(this);
		this.controller = this.controller.bind(this);
	}
	
	
	componentDidMount() {
		this.play();
	}
	
	
	componentDidUpdate(prevProps, prevState) {
		if (!this.state.aliveCount && prevState.aliveCount) {
			this.stop();
			this.clear();
		}
	}


	// randomly create cells
	// allDead: boolean, if true - clears the board
	randomStateGenerator(width, height, allDead) {
		let cols = [],
				rows = [];
		
		for(let i = 0; i < height; i++) {
			for(let j = 0; j < width; j++) {
				if (allDead)
					cols.push(0);
				else {
					let cell = Math.floor(Math.random() * 2);
					cols.push(cell);
				}
			}
			rows.push(cols);
			cols = [];
		}
		
		return rows;
	}
	
	
	// manualy change single cell's state
	changeCellState(col, row) {
		this.setState((state) => {
			let boardState = state.boardState,
					aliveCount = state.aliveCount;
			
			if (boardState[row][col]) {
				boardState[row][col] = 0;
				aliveCount--;
			} else {
				boardState[row][col] = 1;
				aliveCount++;
			}
			
			return {
				boardState: boardState,
				aliveCount: aliveCount
			};
		});
	}
	
	
	// auto change all cell's state
	evolve() {
		this.setState(state => {
			let prevBoardState = state.boardState,
					boardState = [],
					generation = state.generation + 1,
					aliveCount = 0;
			
			// loop through every cell
			for (let i = 0; i < prevBoardState.length; i++) {
				let row = prevBoardState[i],
						newRow = [];
				
				for (let j = 0; j < row.length; j++) {
					let col = row[j],
							neighbours = 0;
					
					// count alive neighbour cells
					for (let m = -1; m < 2; m++) {
						let neighbourRow = i + m;
						if (neighbourRow < 0)
							neighbourRow = prevBoardState.length - 1;
						if (neighbourRow === prevBoardState.length)
							neighbourRow = 0;
						
						for (let n = -1; n < 2; n++) {
							if (m === 0 && n === 0)
								continue;
							
							let neighbourCol = j + n;
							if (neighbourCol < 0)
								neighbourCol = row.length - 1;
							if (neighbourCol === row.length)
								neighbourCol = 0;
							
							if (prevBoardState[neighbourRow][neighbourCol])
								neighbours++;
						}
					}
					
					// update cell state depending on alive neighbours
					// if cell was alive
					if (col) {
						if (neighbours < 2 || neighbours > 3)
							newRow.push(0);
						else {
							newRow.push(1);
							aliveCount++;
						}
						// if cell was dead
					} else {
						if (neighbours !== 3)
							newRow.push(0);
						else {
							newRow.push(1);
							aliveCount++;
						}
					}
					
				}
				
				boardState.push(newRow);
			}
			
			return {
				boardState: boardState, 
				generation: generation,
				aliveCount: aliveCount
			};
		});
	}
	
	
	startStop() {
		if (!this.state.aliveCount)
			return;
		
		if (this.state.isEvolving) {
			clearInterval(this.autoEvolve);
			this.setState({isEvolving: false});
		}
		else {
			this.autoEvolve = setInterval(this.evolve, 100);
			this.setState({isEvolving: true});
		}
	}
	
	
	next() {
		if (!this.state.aliveCount)
			return;
		
		this.evolve();
		this.stop();
	}
	
	
	play() {
		if (this.state.isEvolving)
			return;
		else {
			this.autoEvolve = setInterval(this.evolve, 100);
			this.setState({isEvolving: true});
		}
	}
	
	
	stop() {
		clearInterval(this.autoEvolve)
		this.setState({isEvolving: false});
	}
	
	
	clear() {
		this.setState({
			boardState: this.randomStateGenerator(48, 36, true),
			generation: 0,
			aliveCount: 0
		});
	}
	
	
	restart() {
		this.setState(() => {
			return {
				boardState: this.randomStateGenerator(48, 36),
				generation: 0
			};
		}, this.play);
	}
	
	
	controller(e) {
		switch(e.currentTarget.id) {
			case 'startStop':
				this.startStop();
				break;
			case 'next':
				this.next()
				break;
			case 'clear':
				this.clear();
				break;
			case 'restart':
				this.restart();
				break;
			default:
				return;
		}
	}
	
	
  render() {
    return (
      <div className="GameOfLife">
      	<Container className="p-3 p-lg-4">
      		<Row noGutters>
      			<Col xs="12" md="6">
     					<Controls 
     						isEvolving={this.state.isEvolving}
     						aliveCount={this.state.aliveCount}
     						controller={this.controller}
							/>
      			</Col>
      			<Col xs="12" md="6" className="pt-2 pt-md-0">
      				<Stats generation={this.state.generation} />
      			</Col>
      		</Row>
      		<Row noGutters>
						<Col style={{overflow: 'auto'}}>
							<Board 
								boardDimensions={this.state.boardDimensions}
								boardState={this.state.boardState}
								changeCellState= {this.changeCellState}
							/>
						</Col>
      		</Row>
      	</Container>
      </div>
    );
  }
}
