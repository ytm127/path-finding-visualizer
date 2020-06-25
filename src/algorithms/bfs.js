
import { get, isEqual } from 'lodash';

export const visualizeBFS = async (startNodeRow, startNodeCol, finishNodeRow, finishNodeCol, gridState, setGridState) => {
    let frontier = [];
    let cameFrom = {};
    let current = null;
    // returns an array of valid neighbors
    const getNeighbors = (node) => {
        let neighbors = [];
        // check above
        get(gridState, `[${node.row - 1}][${node.col}]`) &&
            !get(gridState, `[${node.row - 1}][${node.col}]`).isWall &&
            neighbors.push(get(gridState, `[${node.row - 1}][${node.col}]`));
        // check below
        get(gridState, `[${node.row + 1}][${node.col}]`) &&
            !get(gridState, `[${node.row + 1}][${node.col}]`).isWall &&
            neighbors.push(get(gridState, `[${node.row + 1}][${node.col}]`));
        // check right
        get(gridState, `[${node.row}][${node.col + 1}]`) &&
            !get(gridState, `[${node.row}][${node.col + 1}]`).isWall &&
            neighbors.push(get(gridState, `[${node.row}][${node.col + 1}]`));
        // check left
        get(gridState, `[${node.row}][${node.col - 1}]`) &&
            !get(gridState, `[${node.row}][${node.col - 1}]`).isWall &&
            neighbors.push(get(gridState, `[${node.row}][${node.col - 1}]`));
        // return an array of neighbors
        return neighbors;
    };

    const sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };

    let foundEarly = false;

    // Breadth First Search
    let start = gridState[startNodeRow][startNodeCol];
    frontier.push(start);
    cameFrom[start.id] = null;
    const process = async () => {
        current = frontier.shift();
        let copyCur = current;
        copyCur.isFrontierNode = false;
        let copyGrid = [ ...gridState ];
        copyGrid[copyCur.row][copyCur.col] = copyCur;
        setGridState({ copyGrid });
        for (let node of getNeighbors(current)) {
            if (!cameFrom[node.id]) {
                let copyNode = node;
                frontier.push(node); //  put into frontier array
                cameFrom[node.id] = current; // visited[node] = true
                copyNode.isFrontierNode = true;
                copyNode.hasBeenVisited = true;
                let copyGrid = [ ...gridState ];
                copyGrid[copyNode.row][copyNode.col] = copyNode;
                setGridState({ copyGrid });
                if (copyNode.id === `row-${finishNodeRow}-col-${finishNodeCol}`) foundEarly = true; // early exit
            }
        }
    };

    // Run one interation per every 10 ms
    while (frontier.length > 0 && !foundEarly) {
        process();
        await sleep(0.5);
    }
    // draw path
    let path = [];
    let backtrackCurrent = gridState[finishNodeRow][finishNodeCol];
    while (backtrackCurrent && !isEqual(backtrackCurrent, gridState[startNodeRow][startNodeCol])) {
        path.push(backtrackCurrent);
        backtrackCurrent = cameFrom[backtrackCurrent.id];
        if (!backtrackCurrent) {
            console.log('no path found');
            return;
        }
    }

    let copyState = [ ...gridState ];
    while (path.length !== 0) {
        let temp = path.pop();
        copyState[temp.row][temp.col].isPath = true;
    }

    setGridState({ copyState });
};
