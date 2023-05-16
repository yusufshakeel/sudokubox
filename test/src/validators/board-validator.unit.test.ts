import BoardValidator from '../../../src/validators/board-validator';
import SudokuPuzzleEasy from '../../test-data/sudoku-puzzle-easy';
const { puzzle } = SudokuPuzzleEasy;

describe('BoardValidator', () => {
  const boardValidator = new BoardValidator();

  describe('When board is valid', () => {
    test('Should return true', () => {
      expect(boardValidator.isValid(puzzle)).toBeTruthy();
    });
  });

  describe('When board is invalid', () => {
    describe('When a row has repeating number', () => {
      test('Should return false', () => {
        const board = [
          [1, 3, 0, 2, 0, 0, 7, 4, 0],
          [0, 2, 5, 0, 1, 0, 0, 0, 0],
          [4, 8, 0, 0, 6, 0, 0, 5, 0],
          [0, 0, 0, 7, 8, 0, 2, 1, 0],
          [5, 0, 0, 0, 9, 0, 3, 7, 0],
          [9, 0, 0, 0, 3, 0, 0, 0, 5],
          [0, 4, 0, 0, 0, 6, 8, 9, 0],
          [0, 5, 3, 0, 0, 1, 4, 1, 0],
          [6, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        expect(boardValidator.isValid(board)).toBeFalsy();
      });
    });

    describe('When a column has repeating number', () => {
      test('Should return false', () => {
        const board = [
          [1, 3, 0, 2, 0, 0, 7, 4, 0],
          [0, 2, 5, 0, 1, 0, 0, 0, 0],
          [4, 8, 0, 0, 6, 0, 0, 5, 0],
          [0, 0, 0, 7, 8, 1, 2, 1, 0],
          [5, 0, 0, 0, 9, 0, 3, 7, 0],
          [9, 0, 0, 0, 3, 0, 0, 0, 5],
          [0, 4, 0, 0, 0, 6, 8, 9, 0],
          [0, 5, 3, 0, 0, 1, 4, 0, 0],
          [6, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        expect(boardValidator.isValid(board)).toBeFalsy();
      });
    });

    describe('When a sub board has repeating number', () => {
      test('Should return false', () => {
        const board = [
          [1, 3, 0, 2, 0, 0, 7, 4, 0],
          [0, 2, 5, 0, 1, 0, 0, 0, 0],
          [4, 8, 1, 0, 6, 0, 0, 5, 0],
          [0, 0, 0, 7, 8, 0, 2, 1, 0],
          [5, 0, 0, 0, 9, 0, 3, 7, 0],
          [9, 0, 0, 0, 3, 0, 0, 0, 5],
          [0, 4, 0, 0, 0, 6, 8, 9, 0],
          [0, 5, 3, 0, 0, 1, 4, 0, 0],
          [6, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        expect(boardValidator.isValid(board)).toBeFalsy();
      });
    });
  });
});