import React from 'react';
import Node from './Node';
import { get } from 'lodash';

const startNodeRow = 0;
const startNodeCol = 1;
const finishNodeRow = 8;
const finishNodeCol = 9;

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

	visualizeBFS() {
		let frontier = [];
		let visited = [];
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

		let start = this.state.grid[startNodeRow][startNodeCol];
		frontier.push(start);
		while (frontier.length > 0) {
			let current = frontier.shift();
			for (let node of getNeighbors(current)) {
				// if node is not in visited
				if (!visited.includes(node)) {
					frontier.push(node); //  put into frontier array
                    visited.push(node); // visited[node] = true
                    let copyGrid = [...this.state.grid]
                    copyGrid[node.row][node.col].hasBeenVisited = true
                    this.setState({grid: copyGrid})
				}
			}
		}
		console.log({ visited });

		// start the traversal of visited array/ visualization
		const interval = setInterval(() => {
            const cur = visited.shift()
            console.log(cur, {visited})
        }, 100);
        setTimeout(() => {
            clearInterval(interval)
        }, 15000);
	}

	render() {
		return (
			<div>
				<h2>Shortest Path</h2>
				<button onClick={this.visualizeBFS}>Start BFS</button>
				{this.state.grid.map((row, idx) => {
					return (
						<div>
							{row.map((cell, cellIdx) => {
								return (
									<Node
										isStartNode={cell.isStartNode}
										isFinishNode={cell.isFinishNode}
                                        isFrontierNode={false}
                                        hasBeenVisited={cell.hasBeenVisited}
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
	for (let row = 0; row < 10; row++) {
		let currentRow = [];
		for (let col = 0; col < 10; col++) {
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
		hasBeenVisited: false,
		value: Infinity
	};
};
