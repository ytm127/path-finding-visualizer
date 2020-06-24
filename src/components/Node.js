import React from 'react';

class Node extends React.Component {
	render() {
		const { isStartNode, isFinishNode, isFrontierNode, hasBeenVisited, value, isWall } = this.props;
		const bg = () => {
			if (isStartNode) return 'blue';
            if (isFinishNode) return 'red';
            if(isWall) return 'black'
            if(isFrontierNode) return 'orange'
            if(hasBeenVisited) return 'lightgrey'
		};

		return <div style={{ background: bg(), height: 50, width: 50, display: 'inline-block', border:'grey solid thin' }}> &nbsp;</div>;
	}
}

export default Node;
