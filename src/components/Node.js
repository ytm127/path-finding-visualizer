import React from 'react';

class Node extends React.Component {
	render() {
		const { isStartNode, isFinishNode, isFrontierNode, hasBeenVisited, isPath, isWall } = this.props;
		const bg = () => {
			if (isStartNode) return '#5b58f5';
            if (isFinishNode) return '#ff5757';
			if(isWall) return '#6e6e6e'
			if(isPath) return '#b5f558'
            if(isFrontierNode) return '#fcb6bf'
			if(hasBeenVisited) return '#5592d9'
			else return '#ededed'
		};

		return <div style={{ background: bg(), height: '3vw', width: '3vw', display: 'inline-block', border:'none' }}> &nbsp;</div>;
	}
}

export default Node;
