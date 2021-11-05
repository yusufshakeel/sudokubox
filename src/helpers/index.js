'use strict';

/**
 * This will return the filtered array.
 * @param {number[]} array The array can be a row or column.
 * @param {number} indexToSkip The index in the array to skip.
 * @return {number[]}
 */
const filteredArray = (array, indexToSkip) =>
  array.reduce((result, current, index) => {
    return index === indexToSkip ? result : [...result, current];
  }, []);

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
 * @param {number} value
 * @param {number} rowIndex
 * @param {number[]} row
 * @returns {boolean}
 */
function isUniqueValueInRow(value, rowIndex, row) {
  return !filteredArray(row, rowIndex).includes(value);
}

/**
 * This will return true if value is unique in column.
 * @param {number} value
 * @param {number} columnIndex
 * @param {number[]} column
 * @returns {boolean}
 */
function isUniqueValueInColumn(value, columnIndex, column) {
  return !filteredArray(column, columnIndex).includes(value);
}

module.exports = { getRow, getColumn, isUniqueValueInRow, isUniqueValueInColumn };
