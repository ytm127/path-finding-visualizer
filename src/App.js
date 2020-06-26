import React, {useEffect, useState} from 'react';
import './App.css';
import Grid from './components/Grid';

function App() {
	// Hook
	function useWindowSize() {
		const isClient = typeof window === 'object';

		function getSize() {
			return {
				width: isClient ? window.innerWidth : undefined,
				height: isClient ? window.innerHeight : undefined
			};
		}

		const [ windowSize, setWindowSize ] = useState(getSize);

		useEffect(() => {
			if (!isClient) {
				return false;
			}

			function handleResize() {
				setWindowSize(getSize());
			}

			window.addEventListener('resize', handleResize);
			return () => window.removeEventListener('resize', handleResize);
		}, []); // Empty array ensures that effect is only run on mount and unmount

		return windowSize;
  }
  
  console.log(useWindowSize())
	return (
		<div className="App">

			<br />
			<div className="container" style={{ padding: '5vw', paddingTop: '1vh' }}>
				<h1>PATH FINDING VISUALIZER</h1>
				<div className="pure-g" style={{ margin: 10 }}>
					<div className="pure-u-1-6">
						<p
							style={{
								borderRadius: 15,
								border: 'white solid thick',
								color: 'white',
								padding: 10,
								fontWeight: 700,
								fontSize: '1.5vw',
								background: '#5b58f5'
							}}
						>
							Start
						</p>
					</div>
					<div className="pure-u-1-6">
						<p
							style={{
								borderRadius: 15,
								border: 'white solid thick',
								color: 'white',
								padding: 10,
								fontWeight: 700,
								fontSize: '1.5vw',
								background: '#ff5757'
							}}
						>
							Finish
						</p>
					</div>
					<div className="pure-u-1-6">
						<p
							style={{
								borderRadius: 15,
								border: 'white solid thick',
								color: 'white',
								padding: 10,
								fontWeight: 700,
								fontSize: '1.5vw',
								background: '#6e6e6e'
							}}
						>
							Walls
						</p>
					</div>
					<div className="pure-u-1-6">
						<p
							style={{
								borderRadius: 15,
								border: 'white solid thick',
								color: 'white',
								padding: 10,
								fontWeight: 700,
								fontSize: '1.5vw',
								background: '#b5f558'
							}}
						>
							Path
						</p>
					</div>
					<div className="pure-u-1-6">
						<p
							style={{
								borderRadius: 15,
								border: 'white solid thick',
								color: 'white',
								padding: 10,
								fontWeight: 700,
								fontSize: '1.5vw',
								background: '#fcb6bf'
							}}
						>
							Frontier
						</p>
					</div>
					<div className="pure-u-1-6">
						<p
							style={{
								borderRadius: 15,
								border: 'white solid thick',
								color: 'white',
								padding: 10,
								fontWeight: 700,
								fontSize: '1.5vw',
								background: '#5592d9'
							}}
						>
							Visited
						</p>
					</div>
				</div>
				<hr />
				<Grid screenDimensions={useWindowSize()}/>
			</div>
		</div>
	);
}

export default App;
