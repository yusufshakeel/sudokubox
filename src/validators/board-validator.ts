import CONSTANTS from '../constants';
import helpers from '../helpers';
import { BoardType } from '../ts-def/board-type';
const { TOTAL_ROWS, TOTAL_COLUMNS, EMPTY_CELL } = CONSTANTS;
const {
  getRow,
  getColumn,
  isUniqueValueInRow,
  isUniqueValueInColumn,
  isUniqueValueInSubBoard
} = helpers;

export default class BoardValidator {
  private IS_VALID = true;
  private IS_INVALID = false;

  public isValid(board: BoardType) {
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
          return this.IS_INVALID;
        }
      }
    }

    return this.IS_VALID;
  }
}