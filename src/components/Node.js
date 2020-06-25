import React from 'react';

class Node extends React.Component {
	render() {
		const { isStartNode, isFinishNode, isFrontierNode, hasBeenVisited, isPath, isWall } = this.props;
		const bg = () => {
			if (isStartNode) return '#5b58f5';
            if (isFinishNode) return '#ff8293';
			if(isWall) return '#6e6e6e'
			if(isPath) return '#b5f558'
            if(isFrontierNode) return '#ff5757'
			if(hasBeenVisited) return '#5592d9'
			else return '#deeeff'
		};

		return <div style={{ background: bg(), height: 50, width: 50, display: 'inline-block', border:'white solid thin' }}> &nbsp;</div>;
	}
}

export default Node;
