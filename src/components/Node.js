import React from 'react';
import {colors} from '../styles'

class Node extends React.Component {
	render() {
		const { isStartNode, isFinishNode, isFrontierNode, hasBeenVisited, isPath, isWall, nodeSize } = this.props;
		const bg = () => {
			if (isStartNode) return colors.isStartNode;
            if (isFinishNode) return colors.isFinishNode;
			if(isWall) return colors.isWall
			if(isPath) return colors.isPath
            if(isFrontierNode) return colors.isFrontierNode
			if(hasBeenVisited) return colors.hasBeenVisited
			else return colors.default
		};

		return <div style={{ background: bg(), height: nodeSize, width: nodeSize, display: 'inline-block', border:'none' }}> &nbsp;</div>;
	}
}

export default Node;
