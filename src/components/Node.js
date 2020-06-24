import React from 'react';

class Node extends React.Component {
	render() {
		const { isStartNode, isFinishNode, isFrontierNode, hasBeenVisited, value, isWall } = this.props;
		const bg = () => {
			if (isStartNode) return '#5b58f5';
            if (isFinishNode) return '#ff8293';
            if(isWall) return '#6e6e6e'
            if(isFrontierNode) return '#b5ffb7'
            if(hasBeenVisited) return '#b5d9ff'
		};

		return <div style={{ background: bg(), height: 50, width: 50, display: 'inline-block', border:'grey solid thin' }}> &nbsp;</div>;
	}
}

export default Node;
