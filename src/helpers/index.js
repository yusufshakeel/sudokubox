'use strict';

const filteredArray = (array, indexToSkip) =>
  array.reduce((result, current, index) => {
    return index === indexToSkip ? result : [...result, current];
  }, []);

function getRow(rowIndex, board) {
  return board[rowIndex];
}

function getColumn(columnIndex, board) {
  return board.reduce((result, row) => [...result, row[columnIndex]], []);
}

function isUniqueValueInRow(value, rowIndex, row) {
  return !filteredArray(row, rowIndex).includes(value);
}

function isUniqueValueInColumn(value, columnIndex, column) {
  return !filteredArray(column, columnIndex).includes(value);
}

module.exports = { getRow, getColumn, isUniqueValueInRow, isUniqueValueInColumn };
