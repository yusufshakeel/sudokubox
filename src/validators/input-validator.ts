import CONSTANTS from '../constants';
import { BoardType } from '../ts-def/board-type';

const { TOTAL_ROWS, TOTAL_COLUMNS, ALLOWED_NUMBERS } = CONSTANTS;
export default class InputValidator {
  private validateInputSize(inputBoard: BoardType) {
    if (inputBoard.length !== TOTAL_ROWS) {
      throw new Error(`Input board must have exactly ${TOTAL_ROWS} rows.`);
    }

    for (let rowIndex = 0; rowIndex < TOTAL_ROWS; rowIndex++) {
      if (inputBoard[rowIndex].length !== TOTAL_COLUMNS) {
        throw new Error(`Input board must have exactly ${TOTAL_COLUMNS} columns in Row ${rowIndex}.`);
      }
    }
  }

  private validateNumbers(inputBoard: BoardType) {
    for (let rowIndex = 0; rowIndex < TOTAL_ROWS; rowIndex++) {
      for (let columnIndex = 0; columnIndex < TOTAL_COLUMNS; columnIndex++) {
        if (!ALLOWED_NUMBERS.includes(inputBoard[rowIndex][columnIndex])) {
          throw new Error(`Input board contains invalid number in Row: ${rowIndex}, Column: ${columnIndex}.`);
        }
      }
    }
  }

  public validate(inputBoard: BoardType) {
    this.validateInputSize(inputBoard);
    this.validateNumbers(inputBoard);
  }
}