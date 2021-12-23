'use strict';

const SudokuBox = require('../index');
const { input, puzzle, solution } = require('./test-data/sudoku-puzzle-easy');
const {
  input: inputInvalid,
  puzzle: boardInvalid
} = require('./test-data/sudoku-puzzle-invalid-input');
const BoardValidator = require('../src/validators/board-validator');
const { GENERATE_PUZZLE } = require('../src/constants');

describe('SudokuBox', () => {
  describe('solve', () => {
    test('Should solve puzzle', () => {
      const sudokuBox = new SudokuBox({ logPerformance: true });
      let result = sudokuBox.solve({ input });
      console.info(result);
      expect(result.isPuzzleSolved).toBeTruthy();
      expect(result.isBoardValid).toBeTruthy();
      expect(result.board).toStrictEqual(solution);
      expect(result.performance).toStrictEqual({
        duration: {
          nano: expect.any(Number),
          micro: expect.any(Number),
          milli: expect.any(Number),
          second: expect.any(Number)
        }
      });
    });
  });

  describe('isValidInput', () => {
    describe('When input is valid', () => {
      test('Should return true', () => {
        const sudokuBox = new SudokuBox();
        expect(sudokuBox.isValidInput({ input })).toBeTruthy();
      });
    });

    describe('When input is invalid', () => {
      test('Should return false', () => {
        const sudokuBox = new SudokuBox();
        expect(sudokuBox.isValidInput({ input: inputInvalid })).toBeFalsy();
      });
    });
  });

  describe('isValidBoard', () => {
    describe('When board is valid', () => {
      test('Should return true', () => {
        const sudokuBox = new SudokuBox();
        expect(sudokuBox.isValidBoard({ board: puzzle })).toBeTruthy();
      });
    });

    describe('When board is invalid', () => {
      test('Should return false', () => {
        const sudokuBox = new SudokuBox();
        expect(sudokuBox.isValidBoard({ board: boardInvalid })).toBeFalsy();
      });
    });
  });

  describe('generate', () => {
    test('Should return puzzle', () => {
      const sudokuBox = new SudokuBox({ logPerformance: true });
      const boardValidator = new BoardValidator();
      const { puzzle, board, totalCellsFilled, performance } = sudokuBox.generate({
        level: 'EASY'
      });
      expect(puzzle).toHaveLength(81);
      expect(boardValidator.isValid(board)).toBeTruthy();
      expect(totalCellsFilled).toBeLessThanOrEqual(
        GENERATE_PUZZLE.EASY.MAXIMUM_NUMBER_OF_CELLS_TO_FILL
      );
      expect(totalCellsFilled).toBeGreaterThanOrEqual(
        GENERATE_PUZZLE.EASY.MINIMUM_NUMBER_OF_CELLS_TO_FILL
      );
      expect(performance).toStrictEqual({
        duration: {
          nano: expect.any(Number),
          micro: expect.any(Number),
          milli: expect.any(Number),
          second: expect.any(Number)
        }
      });
    });
  });
});
