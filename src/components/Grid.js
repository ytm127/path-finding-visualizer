import React from 'react';
import Node from './Node';
import { get, isEqual } from 'lodash';

const startNodeRow = getRandomInt(14);
const startNodeCol = getRandomInt(25);
const finishNodeRow = getRandomInt(14);
const finishNodeCol = getRandomInt(25);

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

let walls = [];
for (let i = 0; i < 150; i++) {
	walls.push([ getRandomInt(14), getRandomInt(25) ]);
}

// make sure wall node doesn't overlap with finishNode
const randomWalls = walls.filter((x) => !isEqual(x, [ finishNodeRow, finishNodeCol ]));

class Grid extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			grid: [],
			isScanning: false,
			pathDoesExist: true
		};
		this.visualizeBFS = this.visualizeBFS.bind(this);
		this.visualizeDFS = this.visualizeDFS.bind(this);
	}

	// Init the grid
	componentDidMount() {
		let grid = buildGrid();
		this.setState({ grid: grid });
	}

	visualizeBFS = async () => {
		let frontier = [];
		let cameFrom = {};
		let current = null;
		// returns an array of valid neighbors
		const getNeighbors = (node) => {
			let neighbors = [];
			// check above
			get(this.state.grid, `[${node.row - 1}][${node.col}]`) &&
				!get(this.state.grid, `[${node.row - 1}][${node.col}]`).isWall &&
				neighbors.push(get(this.state.grid, `[${node.row - 1}][${node.col}]`));
			// check below
			get(this.state.grid, `[${node.row + 1}][${node.col}]`) &&
				!get(this.state.grid, `[${node.row + 1}][${node.col}]`).isWall &&
				neighbors.push(get(this.state.grid, `[${node.row + 1}][${node.col}]`));
			// check right
			get(this.state.grid, `[${node.row}][${node.col + 1}]`) &&
				!get(this.state.grid, `[${node.row}][${node.col + 1}]`).isWall &&
				neighbors.push(get(this.state.grid, `[${node.row}][${node.col + 1}]`));
			// check left
			get(this.state.grid, `[${node.row}][${node.col - 1}]`) &&
				!get(this.state.grid, `[${node.row}][${node.col - 1}]`).isWall &&
				neighbors.push(get(this.state.grid, `[${node.row}][${node.col - 1}]`));
			// return an array of neighbors
			return neighbors;
		};

		const sleep = (milliseconds) => {
			return new Promise((resolve) => setTimeout(resolve, milliseconds));
		};

		let foundEarly = false;

		// Breadth First Search
		let start = this.state.grid[startNodeRow][startNodeCol];
		frontier.push(start);
		cameFrom[start.id] = null;
		const process = async () => {
			current = frontier.shift();
			let copyCur = current;
			copyCur.isFrontierNode = false;
			let copyGrid = [ ...this.state.grid ];
			copyGrid[copyCur.row][copyCur.col] = copyCur;
			this.setState({ copyGrid });
			for (let node of getNeighbors(current)) {
				if (!cameFrom[node.id]) {
					let copyNode = node;
					frontier.push(node); //  put into frontier array
					cameFrom[node.id] = current; // visited[node] = true
					copyNode.isFrontierNode = true;
					copyNode.hasBeenVisited = true;
					let copyGrid = [ ...this.state.grid ];
					copyGrid[copyNode.row][copyNode.col] = copyNode;
					this.setState({ copyGrid });
					if (copyNode.id === `row-${finishNodeRow}-col-${finishNodeCol}`) foundEarly = true; // early exit
				}
			}
		};

		// Run one interation per every 10 ms
		while (frontier.length > 0 && !foundEarly) {
			this.setState({isScanning: true})
			process();
			await sleep(0.5);
		}
		// draw path
		let path = [];
		let backtrackCurrent = this.state.grid[finishNodeRow][finishNodeCol];
		while (backtrackCurrent && !isEqual(backtrackCurrent, this.state.grid[startNodeRow][startNodeCol])) {
			path.push(backtrackCurrent);
			backtrackCurrent = cameFrom[backtrackCurrent.id];
			if (!backtrackCurrent) {
				this.setState({isScanning: false})
				console.log('no path found');
				this.setState({pathDoesExist: false})
				return;
			}
		}
		this.setState({isScanning: false})

		let copyState = [ ...this.state.grid ];
		while (path.length !== 0) {
			let temp = path.pop();
			copyState[temp.row][temp.col].isPath = true;
		}

		this.setState({ copyState });
	};

	visualizeDFS = async () => {
		let frontier = [];
		let cameFrom = {};
		let current = null;
		// returns an array of valid neighbors
		const getNeighbors = (node) => {
			let neighbors = [];
			// check above
			get(this.state.grid, `[${node.row - 1}][${node.col}]`) &&
				!get(this.state.grid, `[${node.row - 1}][${node.col}]`).isWall &&
				neighbors.push(get(this.state.grid, `[${node.row - 1}][${node.col}]`));
			// check below
			get(this.state.grid, `[${node.row + 1}][${node.col}]`) &&
				!get(this.state.grid, `[${node.row + 1}][${node.col}]`).isWall &&
				neighbors.push(get(this.state.grid, `[${node.row + 1}][${node.col}]`));
			// check right
			get(this.state.grid, `[${node.row}][${node.col + 1}]`) &&
				!get(this.state.grid, `[${node.row}][${node.col + 1}]`).isWall &&
				neighbors.push(get(this.state.grid, `[${node.row}][${node.col + 1}]`));
			// check left
			get(this.state.grid, `[${node.row}][${node.col - 1}]`) &&
				!get(this.state.grid, `[${node.row}][${node.col - 1}]`).isWall &&
				neighbors.push(get(this.state.grid, `[${node.row}][${node.col - 1}]`));
			// return an array of neighbors
			return neighbors;
		};

		const sleep = (milliseconds) => {
			return new Promise((resolve) => setTimeout(resolve, milliseconds));
		};

		let foundEarly = false;

		// Depth First Search
		let start = this.state.grid[startNodeRow][startNodeCol];
		frontier.push(start);
		cameFrom[start.id] = null;
		const process = async () => {
			current = frontier.pop();
			let copyCur = current;
			copyCur.isFrontierNode = false;
			let copyGrid = [ ...this.state.grid ];
			copyGrid[copyCur.row][copyCur.col] = copyCur;
			this.setState({ copyGrid });
			for (let node of getNeighbors(current)) {
				if (!cameFrom[node.id]) {
					let copyNode = node;
					frontier.push(node); //  put into frontier array
					cameFrom[node.id] = current; // visited[node] = true
					copyNode.isFrontierNode = true;
					copyNode.hasBeenVisited = true;
					let copyGrid = [ ...this.state.grid ];
					copyGrid[copyNode.row][copyNode.col] = copyNode;
					this.setState({ copyGrid });
					if (copyNode.id === `row-${finishNodeRow}-col-${finishNodeCol}`) foundEarly = true; // early exit
				}
			}
		};

		// Run one interation per every 10 ms
		while (frontier.length > 0 && !foundEarly) {
			this.setState({isScanning: true})
			process();
			await sleep(0.5);
		}
		// draw path
		let path = [];
		let backtrackCurrent = this.state.grid[finishNodeRow][finishNodeCol];
		while (backtrackCurrent && !isEqual(backtrackCurrent, this.state.grid[startNodeRow][startNodeCol])) {
			path.push(backtrackCurrent);
			backtrackCurrent = cameFrom[backtrackCurrent.id];
			if (!backtrackCurrent) {
				console.log('no path found');
				this.setState({pathDoesExist: false})
				this.setState({isScanning: false})
				return;
			}
		}
		this.setState({isScanning: false})

		let copyState = [ ...this.state.grid ];
		while (path.length !== 0) {
			let temp = path.pop();
			copyState[temp.row][temp.col].isPath = true;
		}

		this.setState({ copyState });
	};

	visualizeAstar = async () => {
		let frontier = [];
		let cameFrom = {};
		let queue = {};
		let current = null;
		// returns an array of valid neighbors
		const getNeighbors = (node) => {
			let neighbors = [];
			// check above
			get(this.state.grid, `[${node.row - 1}][${node.col}]`) &&
				!get(this.state.grid, `[${node.row - 1}][${node.col}]`).isWall &&
				neighbors.push(get(this.state.grid, `[${node.row - 1}][${node.col}]`));
			// check below
			get(this.state.grid, `[${node.row + 1}][${node.col}]`) &&
				!get(this.state.grid, `[${node.row + 1}][${node.col}]`).isWall &&
				neighbors.push(get(this.state.grid, `[${node.row + 1}][${node.col}]`));
			// check right
			get(this.state.grid, `[${node.row}][${node.col + 1}]`) &&
				!get(this.state.grid, `[${node.row}][${node.col + 1}]`).isWall &&
				neighbors.push(get(this.state.grid, `[${node.row}][${node.col + 1}]`));
			// check left
			get(this.state.grid, `[${node.row}][${node.col - 1}]`) &&
				!get(this.state.grid, `[${node.row}][${node.col - 1}]`).isWall &&
				neighbors.push(get(this.state.grid, `[${node.row}][${node.col - 1}]`));
			// return an array of neighbors
			return neighbors;
		};

		const sleep = (milliseconds) => {
			return new Promise((resolve) => setTimeout(resolve, milliseconds));
		};

		const heuristic = (finish , cur) => {
			// Manhattan distance on a square grid
			return Math.abs(finish.row - cur.row) + Math.abs(finish.col - cur.col);
		};


		let foundEarly = false;

		// A* star search
		let start = this.state.grid[startNodeRow][startNodeCol];
		frontier.push(start);
		cameFrom[start.id] = null;
		const process = async () => {
			frontier.sort((x, y) => x.value - y.value);
			current = frontier.shift();
			let copyCur = current;
			copyCur.isFrontierNode = false;
			let copyGrid = [ ...this.state.grid ];
			copyGrid[copyCur.row][copyCur.col] = copyCur;
			this.setState({ copyGrid });
			for (let node of getNeighbors(current)) {
				if (!cameFrom[node.id]) {
						let copyNode = node;
						frontier.push(node); //  put into frontier array
						cameFrom[node.id] = current; // visited[node] = true
						copyNode.isFrontierNode = true;
						copyNode.hasBeenVisited = true;
						copyNode.value = heuristic(this.state.grid[finishNodeRow][finishNodeCol], copyNode); // update value
						let copyGrid = [ ...this.state.grid ];
						copyGrid[copyNode.row][copyNode.col] = copyNode;
						this.setState({ copyGrid });
						if (copyNode.id === `row-${finishNodeRow}-col-${finishNodeCol}`) foundEarly = true; // early exit
				}
			}
		};

		// Run one interation per every 10 ms
		while (frontier.length > 0 && !foundEarly) {
			this.setState({isScanning: true})
			process();
			await sleep(0.5);
		}
		// draw path
		let path = [];
		let backtrackCurrent = this.state.grid[finishNodeRow][finishNodeCol];
		while (backtrackCurrent && !isEqual(backtrackCurrent, this.state.grid[startNodeRow][startNodeCol])) {
			path.push(backtrackCurrent);
			backtrackCurrent = cameFrom[backtrackCurrent.id];
			if (!backtrackCurrent) {
				this.setState({isScanning: false})
				console.log('no path found');
				this.setState({pathDoesExist: false})
				return;
			}
		}

		this.setState({isScanning: false})

		let copyState = [ ...this.state.grid ];
		while (path.length !== 0) {
			let temp = path.pop();
			copyState[temp.row][temp.col].isPath = true;
		}

		this.setState({ copyState });
	};

	resetTraversal = () => {
		let grid = buildGrid();
		this.setState({ grid: grid });
	}

	render() {
		return (
			<div>
				<br />
				{this.state.grid.map((row, idx) => {
					return (
						<div style={{ height: '2.5vw' }}> 
							{row.map((cell, cellIdx) => {
								const wall = randomWalls.find((wallCell) => {
									return wallCell[0] === cell.row && wallCell[1] === cell.col;
								});
								return (
									<Node
										id={`row-${idx}-col-${cellIdx}`}
										isStartNode={cell.isStartNode}
										isFinishNode={cell.isFinishNode}
										isFrontierNode={cell.isFrontierNode}
										hasBeenVisited={cell.hasBeenVisited}
										isWall={!!wall}
										isPath={cell.isPath}
									/>
								);
							})}
						</div>
					);
				})}
				<br />
				<button className="button-xlarge pure-button" style={{ margin: 10 }} onClick={this.visualizeBFS}>
					BFS
				</button>
				<button className="button-xlarge pure-button" style={{ margin: 10 }} onClick={this.visualizeDFS}>
					DFS
				</button>
				<button className="button-xlarge pure-button" style={{ margin: 10 }} onClick={this.visualizeAstar}>
					AStar
				</button>
				<div>
				<button className="button-xlarge pure-button" style={{ margin: 10 }} onClick={this.resetTraversal}>
					<strong>Reset Traversal</strong>
				</button>
				{this.state.isScanning && 'Scanning...'}
				{!this.state.pathDoesExist && 'Path does not exist :('}
				</div>
			</div>
		);
	}
}

export default Grid;

// TODO - Put both into different files
// Grid Utils
const buildGrid = () => {
	let grid = [];
	for (let row = 0; row < 15; row++) {
		let currentRow = [];
		for (let col = 0; col < 25; col++) {
			currentRow.push(nodeData(row, col));
		}
		grid.push(currentRow);
	}

	return grid;
};

// object representing a Node
const nodeData = (row, col) => {
	const wall = randomWalls.find((x) => isEqual([ row, col ], x));
	return {
		id: `row-${row}-col-${col}`,
		row: row,
		col: col,
		isStartNode: row === startNodeRow && col === startNodeCol,
		isFinishNode: row === finishNodeRow && col === finishNodeCol,
		isFrontierNode: false,
		isWall: wall,
		isPath: false,
		hasBeenVisited: false,
		value: row === startNodeRow && col === startNodeCol ? 0 : Infinity
	};
};
