import React from 'react';
import './App.css';
import Grid from './components/Grid';

function App() {
	return (
		<div className="App">
			<br />
			<h1>GRAPH TRAVERSAL ALGORITHMS</h1>
			<div className="pure-g" style={{ margin: 10 }}>
				<div className="pure-u-1-6">
					<p
						style={{
							borderRadius: 15,
							border: 'white solid thick',
							color: 'white',
							padding: 10,
              fontWeight: 700,
              fontSize:'1.5vw',
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
              fontSize:'1.5vw',
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
              fontSize:'1.5vw',
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
              fontSize:'1.5vw',
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
              fontSize:'1.5vw',
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
              fontSize:'1.5vw',
							background: '#5592d9'
						}}
					>
						Visited
					</p>
				</div>
			</div>
			<hr/>
      <Grid />
		</div>
	);
}

export default App;
