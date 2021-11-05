'use strict';

const {
  TOTAL_ROWS_IN_SUB_BOARD,
  TOTAL_COLUMNS_IN_SUB_BOARD,
  TOTAL_COLUMNS
} = require('../constants');

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
 * This will return the sub board indices.
 * @param {number} rowIndex
 * @param {number} columnIndex
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
 * This will return the sub board as one dimensional array.
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

module.exports = {
  getRow,
  getColumn,
  getMarkup,
  isUniqueValueInRow,
  isUniqueValueInColumn,
  isUniqueValueInSubBoard,
  getSubBoardIndices,
  getSubBoardAsOneDimensionalArray
};
