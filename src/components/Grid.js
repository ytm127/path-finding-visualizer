import React from 'react';
import Node from './Node';
import { get, isEmpty } from 'lodash';

const startNodeRow = 5;
const startNodeCol = 5;
const finishNodeRow = 14;
const finishNodeCol = 12;
const randomWalls = [ [ 1, 3 ], [ 5, 3 ], [ 0, 7 ], [ 3, 3 ], [ 3, 7 ], [ 2, 7 ] ];

class Grid extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			grid: []
		};
		this.visualizeBFS = this.visualizeBFS.bind(this);
	}

	// Init the grid
	componentDidMount() {
		let grid = buildGrid();
		this.setState({ grid: grid });
	}

	visualizeBFS = async () => {
		let frontier = [];
		let visited = [];
		let current = null;
		// returns an array of valid neighbors
		const getNeighbors = (node) => {
			let neighbors = [];
			// check above
			get(this.state.grid, `[${node.row - 1}][${node.col}]`) &&
				neighbors.push(get(this.state.grid, `[${node.row - 1}][${node.col}]`));
			// check below
			get(this.state.grid, `[${node.row + 1}][${node.col}]`) &&
				neighbors.push(get(this.state.grid, `[${node.row + 1}][${node.col}]`));
			// check right
			get(this.state.grid, `[${node.row}][${node.col + 1}]`) &&
				neighbors.push(get(this.state.grid, `[${node.row}][${node.col + 1}]`));
			// check left
			get(this.state.grid, `[${node.row}][${node.col - 1}]`) &&
				neighbors.push(get(this.state.grid, `[${node.row}][${node.col - 1}]`));
			// return an array of neighbors
			return neighbors;
		};

		const sleep = (milliseconds) => {
			return new Promise((resolve) => setTimeout(resolve, milliseconds));
		};

		// Breadth First Search
		let start = this.state.grid[startNodeRow][startNodeCol];
		frontier.push(start);
		const process = async () => {
			current = frontier.shift();
			let copyCur = current;
			copyCur.isFrontierNode = false;
			let copyGrid = [ ...this.state.grid ];
			copyGrid[copyCur.row][copyCur.col] = copyCur;
			this.setState({ copyGrid });
			for (let node of getNeighbors(current)) {
				// if node is not in visited
				if (!visited.includes(node)) {
					let copyNode = node;
					frontier.push(node); //  put into frontier array
					visited.push(node); // visited[node] = true
					copyNode.isFrontierNode = true;
					copyNode.hasBeenVisited = true;
					let copyGrid = [ ...this.state.grid ];
					copyGrid[copyNode.row][copyNode.col] = copyNode;
					this.setState({ copyGrid });
				}
			}
		};

		// Run one interation per every 10 ms
		while (frontier.length > 0) {
			process();
			await sleep(10);
		}
	};

	render() {
		return (
			<div>
				<h2>Shortest Path</h2>
				<button onClick={this.visualizeBFS}>Start BFS</button>
				{this.state.grid.map((row, idx) => {
					return (
						<div>
							{row.map((cell, cellIdx) => {
								const wall = randomWalls.find((wallCell) => {
									return wallCell[0] === cell.row && wallCell[1] === cell.col;
								});
								return (
									<Node
										isStartNode={cell.isStartNode}
										isFinishNode={cell.isFinishNode}
										isFrontierNode={cell.isFrontierNode}
										hasBeenVisited={cell.hasBeenVisited}
										isWall={!!wall}
									/>
								);
							})}
						</div>
					);
				})}
			</div>
		);
	}
}

export default Grid;

// Grid Utils
const buildGrid = () => {
	let grid = [];
	for (let row = 0; row < 15; row++) {
		let currentRow = [];
		for (let col = 0; col < 15; col++) {
			currentRow.push(nodeData(row, col));
		}
		grid.push(currentRow);
	}

	return grid;
};

// object representing a Node
const nodeData = (row, col) => {
	return {
		row: row,
		col: col,
		isStartNode: row === startNodeRow && col === startNodeCol,
		isFinishNode: row === finishNodeRow && col === finishNodeCol,
		isFrontierNode: false,
		isWall: false,
		hasBeenVisited: false,
		value: Infinity
	};
};
