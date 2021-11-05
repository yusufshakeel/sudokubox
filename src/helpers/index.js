'use strict';

const { TOTAL_ROWS_IN_MINI_BOARD, TOTAL_COLUMNS_IN_MINI_BOARD } = require('../constants');

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
 * @param {number} rowIndex The row index of the value.
 * @param {number[]} row The row to check.
 * @returns {boolean}
 */
function isUniqueValueInRow(value, rowIndex, row) {
  return !filteredArray(row, rowIndex).includes(value);
}

/**
 * This will return true if value is unique in column.
 * @param {number} value The value to check in the column.
 * @param {number} columnIndex The column index of the value.
 * @param {number[]} column The column to check.
 * @returns {boolean}
 */
function isUniqueValueInColumn(value, columnIndex, column) {
  return !filteredArray(column, columnIndex).includes(value);
}

/**
 * This will return the sub board indices.
 * @param {number} rowIndex
 * @param {number} columnIndex
 * @returns {{rowStartIndex: number, columnEndIndex: number, rowEndIndex: number, columnStartIndex: number}}
 */
function getSubBoardIndices(rowIndex, columnIndex) {
  const rowStartIndex = Math.floor(rowIndex / TOTAL_ROWS_IN_MINI_BOARD) * TOTAL_ROWS_IN_MINI_BOARD;
  const rowEndIndex = rowStartIndex + TOTAL_ROWS_IN_MINI_BOARD - 1;
  const columnStartIndex =
    Math.floor(columnIndex / TOTAL_COLUMNS_IN_MINI_BOARD) * TOTAL_COLUMNS_IN_MINI_BOARD;
  const columnEndIndex = columnStartIndex + TOTAL_COLUMNS_IN_MINI_BOARD - 1;
  return {
    rowStartIndex,
    rowEndIndex,
    columnStartIndex,
    columnEndIndex
  };
}

// function isUniqueValueInSubboard(value, rowIndex, columnIndex, board) {
//   //
// }

module.exports = {
  getRow,
  getColumn,
  isUniqueValueInRow,
  isUniqueValueInColumn,
  getSubBoardIndices
};
