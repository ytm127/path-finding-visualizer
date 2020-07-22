
import React, {useContext} from 'react'
import { get, isEqual } from 'lodash';
import GlobalContext from '../global-context'

export const visualizeBFS = async (grid, updateState) => {

    const global = useContext(GlobalContext)

    const {startNodeRow,  startNodeCol, finishNodeRow, finishNodeCol} = global




    let frontier = [];
    let cameFrom = {};
    let current = null;
    // returns an array of valid neighbors
    const getNeighbors = (node) => {
        let neighbors = [];
        // check above
        get(grid, `[${node.row - 1}][${node.col}]`) &&
            !get(grid, `[${node.row - 1}][${node.col}]`).isWall &&
            neighbors.push(get(grid, `[${node.row - 1}][${node.col}]`));
        // check below
        get(grid, `[${node.row + 1}][${node.col}]`) &&
            !get(grid, `[${node.row + 1}][${node.col}]`).isWall &&
            neighbors.push(get(grid, `[${node.row + 1}][${node.col}]`));
        // check right
        get(grid, `[${node.row}][${node.col + 1}]`) &&
            !get(grid, `[${node.row}][${node.col + 1}]`).isWall &&
            neighbors.push(get(grid, `[${node.row}][${node.col + 1}]`));
        // check left
        get(grid, `[${node.row}][${node.col - 1}]`) &&
            !get(grid, `[${node.row}][${node.col - 1}]`).isWall &&
            neighbors.push(get(grid, `[${node.row}][${node.col - 1}]`));
        // return an array of neighbors
        return neighbors;
    };

    const sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };

    let foundEarly = false;

    // Breadth First Search
    let start = grid[startNodeRow][startNodeCol];
    frontier.push(start);
    cameFrom[start.id] = null;
    const process = async () => {
        current = frontier.shift();
        let copyCur = current;
        copyCur.isFrontierNode = false;
        let copyGrid = [ ...grid ];
        copyGrid[copyCur.row][copyCur.col] = copyCur;
        updateState({ copyGrid });
        for (let node of getNeighbors(current)) {
            if (!cameFrom[node.id]) {
                let copyNode = node;
                frontier.push(node); //  put into frontier array
                cameFrom[node.id] = current; // visited[node] = true
                copyNode.isFrontierNode = true;
                copyNode.hasBeenVisited = true;
                let copyGrid = [ ...grid ];
                copyGrid[copyNode.row][copyNode.col] = copyNode;
                updateState({ copyGrid });
                if (copyNode.id === `row-${finishNodeRow}-col-${finishNodeCol}`)
                    foundEarly = true; // early exit
            }
        }
    };

    // Run one interation per every 10 ms
    while (frontier.length > 0 && !foundEarly) {
        updateState({ isScanning: true });
        process();
        await sleep(0.5);
    }
    // draw path
    let path = [];
    let backtrackCurrent = grid[finishNodeRow][finishNodeCol];
    while (
        backtrackCurrent &&
        !isEqual(backtrackCurrent, grid[startNodeRow][startNodeCol])
    ) {
        path.push(backtrackCurrent);
        backtrackCurrent = cameFrom[backtrackCurrent.id];
        if (!backtrackCurrent) {
            updateState({ isScanning: false });
            console.log('no path found');
            updateState({ pathDoesExist: false });
            return;
        }
    }
    updateState({ isScanning: false });

    let copyState = [ ...grid ];
    while (path.length !== 0) {
        let temp = path.pop();
        copyState[temp.row][temp.col].isPath = true;
    }

    updateState({ copyState });

    return
};