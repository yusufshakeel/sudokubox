import CONSTANTS from '../constants';
import helpers from '../helpers';
import { SolutionType } from '../ts-def/solution-type';
const { TOTAL_ROWS, TOTAL_COLUMNS, EMPTY_CELL } = CONSTANTS;
const {
  getRow,
  getColumn,
  isUniqueValueInRow,
  isUniqueValueInColumn,
  isUniqueValueInSubBoard
} = helpers;

export default class SolutionValidator {
  private IS_SOLVED = true;
  private IS_UNSOLVED = false;

  /**
   * This will return true if the solution is valid and solves the puzzle, false otherwise.
   * @param {number[][]} solution
   * @returns {boolean}
   */
  public isSolved(solution: SolutionType) {
    for (let rowIndex = 0; rowIndex < TOTAL_ROWS; rowIndex++) {
      const row = getRow(rowIndex, solution);

      for (let columnIndex = 0; columnIndex < TOTAL_COLUMNS; columnIndex++) {
        const value = solution[rowIndex][columnIndex];

        if (value === EMPTY_CELL) {
          return this.IS_UNSOLVED;
        }

        if (!isUniqueValueInRow(value, columnIndex, row)) {
          return this.IS_UNSOLVED;
        }

        if (!isUniqueValueInColumn(value, rowIndex, getColumn(columnIndex, solution))) {
          return this.IS_UNSOLVED;
        }

        if (!isUniqueValueInSubBoard(value, rowIndex, columnIndex, solution)) {
          return this.IS_UNSOLVED;
        }
      }
    }

    return this.IS_SOLVED;
  };
}