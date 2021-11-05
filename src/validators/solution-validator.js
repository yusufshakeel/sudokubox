'use strict';

const { TOTAL_ROWS, TOTAL_COLUMNS, EMPTY_CELL } = require('../constants');
const {
  getRow,
  getColumn,
  isUniqueValueInRow,
  isUniqueValueInColumn,
  isUniqueValueInSubBoard
} = require('../helpers');

/**
 * This validates the solution.
 * @constructor
 */
function SolutionValidator() {
  const IS_SOLVED = true;
  const IS_UNSOLVED = false;

  /**
   * This will return true if the solution is valid and solves the puzzle, false otherwise.
   * @param {number[][]} solution
   * @returns {boolean}
   */
  this.isSolved = function isSolved(solution) {
    for (let rowIndex = 0; rowIndex < TOTAL_ROWS; rowIndex++) {
      const row = getRow(rowIndex, solution);

      for (let columnIndex = 0; columnIndex < TOTAL_COLUMNS; columnIndex++) {
        const value = solution[rowIndex][columnIndex];

        if (value === EMPTY_CELL) {
          return IS_UNSOLVED;
        }

        if (!isUniqueValueInRow(value, columnIndex, row)) {
          return IS_UNSOLVED;
        }

        if (!isUniqueValueInColumn(value, rowIndex, getColumn(columnIndex, solution))) {
          return IS_UNSOLVED;
        }

        if (!isUniqueValueInSubBoard(value, rowIndex, columnIndex, solution)) {
          return IS_UNSOLVED;
        }
      }
    }

    return IS_SOLVED;
  };
}

module.exports = SolutionValidator;
