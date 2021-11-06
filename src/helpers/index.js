'use strict';

const {
  TOTAL_ROWS_IN_SUB_BOARD,
  TOTAL_COLUMNS_IN_SUB_BOARD,
  TOTAL_COLUMNS
} = require('../constants');

/**
 * This will return filtered markup based on the cells provided.
 * @param {[string]} cells This will be something like ["r,c", ...]
 * @param {{string: [number]}} markup This will be something like { "r,c": [1,2,...] }
 * @returns {*}
 */
const filterMarkup = (cells, markup) => {
  return cells.reduce((result, cell) => {
    return { ...result, [cell]: markup[cell] };
  }, {});
};

/**
 * This will return the filtered array.
 * @param {number[]} array The array can be a row or column.
 * @param {number} indexToSkip The index in the array to skip.
 * @returns {number[]}
 */
const filteredArray = (array, indexToSkip) => {
  return array.reduce((result, current, index) => {
    return index === indexToSkip ? result : [...result, current];
  }, []);
};

/**
 * This will return row of numbers.
 * @param {number} rowIndex The row index of the board to select.
 * @param {number[][]} board The sudoku board.
 * @returns {number[]}
 */
function getRow(rowIndex, board) {
  return board[rowIndex];
}

/**
 * This will return column of numbers.
 * @param {number} columnIndex The column index of the board to select.
 * @param {number[][]} board The sudoku board.
 * @returns {number[]}
 */
function getColumn(columnIndex, board) {
  return board.reduce((result, row) => [...result, row[columnIndex]], []);
}

/**
 * This will return true if value is unique in row.
 * @param {number} value The value to check in the row.
 * @param {number} columnIndex The column index of the value.
 * @param {number[]} row The row to check.
 * @returns {boolean}
 */
function isUniqueValueInRow(value, columnIndex, row) {
  return !filteredArray(row, columnIndex).includes(value);
}

/**
 * This will return true if value is unique in column.
 * @param {number} value The value to check in the column.
 * @param {number} rowIndex The row index of the value.
 * @param {number[]} column The column to check.
 * @returns {boolean}
 */
function isUniqueValueInColumn(value, rowIndex, column) {
  return !filteredArray(column, rowIndex).includes(value);
}

/**
 * This will return the sub board indices in which the given rowIndex and columnIndex falls.
 *
 * Example: If rowIndex is 1 and columnIndex 1 then the cell(1,1) is inside the top-left sub board.
 *
 * Therefore, the sub board indices that will be returned is row [0, 2] and column [0, 2] both
 * inclusive.
 *
 * @param {number} rowIndex The row index of the board.
 * @param {number} columnIndex The column index of the board.
 * @returns {{rowStartIndex: number, columnEndIndex: number, rowEndIndex: number, columnStartIndex: number}}
 */
function getSubBoardIndices(rowIndex, columnIndex) {
  const rowStartIndex = Math.floor(rowIndex / TOTAL_ROWS_IN_SUB_BOARD) * TOTAL_ROWS_IN_SUB_BOARD;
  const rowEndIndex = rowStartIndex + TOTAL_ROWS_IN_SUB_BOARD - 1;
  const columnStartIndex =
    Math.floor(columnIndex / TOTAL_COLUMNS_IN_SUB_BOARD) * TOTAL_COLUMNS_IN_SUB_BOARD;
  const columnEndIndex = columnStartIndex + TOTAL_COLUMNS_IN_SUB_BOARD - 1;
  return {
    rowStartIndex,
    rowEndIndex,
    columnStartIndex,
    columnEndIndex
  };
}

/**
 * This will return the sub board as a one dimensional array.
 * @param {number} rowStartIndex
 * @param {number} rowEndIndex
 * @param {number} columnStartIndex
 * @param {number} columnEndIndex
 * @param {number[][]} board
 * @returns {number[]}
 */
function getSubBoardAsOneDimensionalArray(
  rowStartIndex,
  rowEndIndex,
  columnStartIndex,
  columnEndIndex,
  board
) {
  let array = [];
  for (let rowIndex = rowStartIndex; rowIndex <= rowEndIndex; rowIndex++) {
    for (let columnIndex = columnStartIndex; columnIndex <= columnEndIndex; columnIndex++) {
      array.push(board[rowIndex][columnIndex]);
    }
  }
  return array;
}

/**
 * This will return true if value is unique in the sub board, false otherwise.
 * @param {number} value The value to check in the sub board.
 * @param {number} rowIndex The row index of the value in the board.
 * @param {number} columnIndex The column index of the value in the board.
 * @param {number[][]} board The sudoku board.
 * @returns {boolean}
 */
function isUniqueValueInSubBoard(value, rowIndex, columnIndex, board) {
  const { rowStartIndex, rowEndIndex, columnStartIndex, columnEndIndex } = getSubBoardIndices(
    rowIndex,
    columnIndex
  );

  const subBoardAsOneDimensionalArray = getSubBoardAsOneDimensionalArray(
    rowStartIndex,
    rowEndIndex,
    columnStartIndex,
    columnEndIndex,
    board
  );

  const valueIndexToSkip =
    (rowIndex % TOTAL_ROWS_IN_SUB_BOARD) * TOTAL_ROWS_IN_SUB_BOARD +
    (columnIndex % TOTAL_COLUMNS_IN_SUB_BOARD);

  return !filteredArray(subBoardAsOneDimensionalArray, valueIndexToSkip).includes(value);
}

/**
 * This will return the markup of an empty cell. It is an array of numbers that the cell can have.
 * @param {number} rowIndex Row index of the cell.
 * @param {number} columnIndex Column index of the cell.
 * @param {number[][]} board The sudoku board.
 * @returns {number[]}
 */
function getMarkup(rowIndex, columnIndex, board) {
  const row = board[rowIndex];
  const column = getColumn(columnIndex, board);
  const { rowStartIndex, rowEndIndex, columnStartIndex, columnEndIndex } = getSubBoardIndices(
    rowIndex,
    columnIndex
  );
  const subBoardAsOneDimensionalArray = getSubBoardAsOneDimensionalArray(
    rowStartIndex,
    rowEndIndex,
    columnStartIndex,
    columnEndIndex,
    board
  );

  let markupValues = [];
  for (let value = 1; value <= TOTAL_COLUMNS; value++) {
    if (
      !row.includes(value) &&
      !column.includes(value) &&
      !subBoardAsOneDimensionalArray.includes(value)
    ) {
      markupValues.push(value);
    }
  }
  return markupValues;
}

/**
 * This will return the markup cell indices.
 * @param {string} cell This is the cell in format 'row,col'.
 * @returns {{rowIndex: number, columnIndex: number}}
 */
function getMarkupCellIndices(cell) {
  const [rowIndex, columnIndex] = cell.split(',').map(index => parseInt(index));
  return { rowIndex, columnIndex };
}

/**
 * This will return a one dimensional output array from the two dimensional board array.
 * @param {number[][]} board
 * @returns {number[]}
 */
function getOutputArrayFromBoard(board) {
  return board
    .join()
    .split(',')
    .map(value => parseInt(value));
}

/**
 * This will return markups found along the given row.
 * @param {number} rowIndex
 * @param {{string: [number]}} markup
 * @returns {{string: [number]}}
 */
function getRowMarkup(rowIndex, markup) {
  const cells = Object.keys(markup).filter(cell => {
    const { rowIndex: markupCellRowIndex } = getMarkupCellIndices(cell);
    return rowIndex === markupCellRowIndex;
  });
  return filterMarkup(cells, markup);
}

/**
 * This will return markups found along the given column.
 * @param {number} columnIndex
 * @param {{string: [number]}} markup
 * @returns {{string: [number]}}
 */
function getColumnMarkup(columnIndex, markup) {
  const cells = Object.keys(markup).filter(cell => {
    const { columnIndex: markupCellColumnIndex } = getMarkupCellIndices(cell);
    return columnIndex === markupCellColumnIndex;
  });
  return filterMarkup(cells, markup);
}

/**
 * This will return markups found within a given sub board with respect to the rowIndex and
 * columnIndex provided.
 *
 * Example: If rowIndex is 1 and columnIndex is 0 then the cell(1,0) is inside top-left sub board.
 *
 * Therefore, this function will return markups found inside the top-left sub board.
 *
 * @param {number} rowIndex The row index of a cell in the board.
 * @param {number} columnIndex The column index of a cell in the board.
 * @param {{string: [number]}} markup This will be like { "r,c": [1,2,...] }
 * @returns {{string: [number]}}
 */
function getSubBoardMarkup(rowIndex, columnIndex, markup) {
  const { rowStartIndex, rowEndIndex, columnStartIndex, columnEndIndex } = getSubBoardIndices(
    rowIndex,
    columnIndex
  );
  let cells = [];
  for (let r = rowStartIndex; r <= rowEndIndex; r++) {
    for (let c = columnStartIndex; c <= columnEndIndex; c++) {
      const cell = `${r},${c}`;
      if (markup[cell]) {
        cells.push(cell);
      }
    }
  }
  return filterMarkup(cells, markup);
}

module.exports = {
  getRow,
  getColumn,
  getMarkup,
  isUniqueValueInRow,
  isUniqueValueInColumn,
  isUniqueValueInSubBoard,
  getSubBoardIndices,
  getSubBoardAsOneDimensionalArray,
  getMarkupCellIndices,
  getOutputArrayFromBoard,
  getRowMarkup,
  getColumnMarkup,
  getSubBoardMarkup
};
