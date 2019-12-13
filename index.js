/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

var grid = [];
const GRID_LENGTH = 3;
let turn = 'X';

function initializeGrid() {
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
            tempArray.push(0);
        }
        // console.log('tempArray---', tempArray)
        grid.push(tempArray);
        // console.log('grid---', grid)
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';

    for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum % 2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if (gridValue === 1) {
            content = '<span class="cross" disabled>X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross" disabled>O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="' + colIdx + '" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        // console.log('coldiv---', coldiv)
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        // console.log('coldiv---', coldiv)
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    console.log('renderMainGrid')
    const parent = document.getElementById("grid");
    // console.log('parent---', parent)
    const columnDivs = getColumns();
    // console.log('columnDivs---', columnDivs);
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = 1;
    grid[colIdx][rowIdx] = newValue;
    renderMainGrid();
    addClickHandlers();

    if (checkWinner(newValue)) {
        setTimeout(function () {
            alert('X (Player) is winner');
            grid = [];
            initializeGrid();
            renderMainGrid();
            addClickHandlers();
        }, 1000);
    } else {
        // setTimeout(computerHandlers(chooseO), 300000)
        setTimeout(function () {
            computerHandlers(chooseO)
        }, 1000);
    }


}


function computerHandlers(cb) {
    console.log('inside computerHandlers====', grid)
    console.log('inside computerHandlers length====', grid.length)

    var playerBoxesIndex = [];
    for (let i = 0; i < grid.length; i++) {

        for (let j = 0; j < grid.length; j++) {

            if (grid[i][j] == 0) {
                playerBoxesIndex.push(i + '' + j);
            }
        }
    }

    console.log('playerBoxesIndex----', playerBoxesIndex)
    cb(playerBoxesIndex)
}

function chooseO(playerBoxesIndex) {
    console.log('inside chooseO-----', playerBoxesIndex);

    if (playerBoxesIndex.length > 0) {
        let a = (playerBoxesIndex[Math.floor(Math.random() * playerBoxesIndex.length)]).split('');

        let newValue = 2;
        grid[Number(a[0])][Number(a[1])] = newValue;
        renderMainGrid();
        addClickHandlers();
        if (checkWinner(2) == true) {
            setTimeout(function () {
                alert('O (PC) is Winner');
                grid = [];
                initializeGrid();
                renderMainGrid();
                addClickHandlers();
            }, 1000);
        }
    } else {
        grid = [];
        alert('Opps...No one is winner')
        initializeGrid();
        renderMainGrid();
        addClickHandlers();

    }


}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    console.log('boxes--', boxes)
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

initializeGrid();
renderMainGrid();
addClickHandlers();


function checkWinner(element) {


    if (mainDiagonal(element)) {
        console.log('---md-----');
        return true;
    }
    else if (secondDiagonal(element)) {
        console.log('---sd-----')
        return true;
    }
    else if (horizontalCnd(element)) {
        console.log('-------hd-------')
        return true;
    }
    else if (verticalCnd(element)) {
        console.log('-------vd-------')
        return true;
    } else {
        return false
    }


}

function horizontalCnd(element) {

    let isValid = Boolean = false;
    for (let r = 0; r < grid.length; r++) {

        isValid = grid[r].every((ele, index) => {
            return ele == element;
        });

        if (isValid) {
            break;
        }

    }

    console.log('isValid------', isValid)

    return isValid


}

function verticalCnd(element) {

    let isValid = Boolean = false;
    let tArray = [];

    for (let r = 0; r < grid.length; r++) {

        tArray = [];

        for (let s = 0; s < grid.length; s++) {


            if (grid[s][r] == element) {
                tArray.push(grid[s][r]);
                isValid = true;
            } else {
                tArray = [];
                isValid == false
                break;
            }
        }

        if (tArray.length == grid.length) {
            isValid = true;
            break;
        } else {
            isValid = false;
        }


    }

    console.log('verticalCnd isValid------', isValid)

    return isValid
}


function mainDiagonal(element) {

    // 1 st check main diagonally in array
    var isValid = grid.every((r, index, self) => {
        return self[index][index] == element
    });

    return isValid;
}

function secondDiagonal(element) {

    // 2 nd check other diagonally in array
    var isValid = grid.every((r, index, self) => {
        return self[index][(grid.length - 1) - index] == element
    });

    return isValid;
}



