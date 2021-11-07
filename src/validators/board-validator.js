'use strict';

const { TOTAL_ROWS, TOTAL_COLUMNS, EMPTY_CELL } = require('../constants');
const {
  getRow,
  getColumn,
  isUniqueValueInRow,
  isUniqueValueInColumn,
  isUniqueValueInSubBoard
} = require('../helpers');

function BoardValidator() {
  const IS_VALID = true;
  const IS_INVALID = false;

  this.isValid = board => {
    for (let rowIndex = 0; rowIndex < TOTAL_ROWS; rowIndex++) {
      for (let columnIndex = 0; columnIndex < TOTAL_COLUMNS; columnIndex++) {
        const cellValue = board[rowIndex][columnIndex];
        if (cellValue === EMPTY_CELL) {
          continue;
        }

        const row = getRow(rowIndex, board);
        const column = getColumn(columnIndex, board);
        if (
          !isUniqueValueInRow(cellValue, columnIndex, row) ||
          !isUniqueValueInColumn(cellValue, rowIndex, column) ||
          !isUniqueValueInSubBoard(cellValue, rowIndex, columnIndex, board)
        ) {
          return IS_INVALID;
        }
      }
    }

    return IS_VALID;
  };
}

module.exports = BoardValidator;
