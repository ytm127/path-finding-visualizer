import React, { useEffect, useState } from 'react';
import './App.css';
import Grid from './components/Grid';
import { useWindowSize } from './hooks';
import { GlobalContextProvider } from './global-context';
import { isEqual } from 'lodash';
import { StyledGridKeys } from './styles';
import {colors } from './styles'

function App() {
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
	const global = { startNodeRow, startNodeCol, finishNodeRow, finishNodeCol, randomWalls };
	return (
		<GlobalContextProvider value={global}>
			<div className="App">
				<br />
				<div className="container" style={{ padding: '5vw', paddingTop: '1vh' }}>
					<h1>PATH FINDING VISUALIZER</h1>
					<div className="pure-g" style={{ margin: 10 }}>
						<div className="pure-u-1-6">
							<StyledGridKeys color={colors.isStartNode}>Start</StyledGridKeys>
						</div>
						<div className="pure-u-1-6">
							<StyledGridKeys color={colors.isFinishNode}>Finish</StyledGridKeys>
						</div>
						<div className="pure-u-1-6">
							<StyledGridKeys color={colors.isWall}>Walls</StyledGridKeys>
						</div>
						<div className="pure-u-1-6">
							<StyledGridKeys color={colors.isPath}>Path</StyledGridKeys>
						</div>
						<div className="pure-u-1-6">
							<StyledGridKeys color={colors.isFrontierNode}>Frontier</StyledGridKeys>
						</div>
						<div className="pure-u-1-6">
							<StyledGridKeys color={colors.hasBeenVisited}>Visited</StyledGridKeys>
						</div>
					</div>
					<hr />
					<Grid screenDimensions={useWindowSize()} />
				</div>
			</div>
		</GlobalContextProvider>
	);
}

export default App;
