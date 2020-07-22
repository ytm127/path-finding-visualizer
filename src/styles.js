import styled  from 'styled-components';

export const colors = {
	isStartNode: '#5b58f5',
	isFinishNode: '#ff5757',
	isWall: '#6e6e6e',
	isPath: '#b5f558',
	isFrontierNode: '#fcb6bf',
	hasBeenVisited: '#5592d9',
	default: '#ededed'
};


export const StyledGridKeys = styled.p`
border-radius: 15px;
border: white solid thick;
color: white;
padding: 10px;
font-weight: 700px;
font-size: 1.5vw;
background: ${props => props.color};
`
