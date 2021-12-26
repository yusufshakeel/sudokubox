'use strict';

const SudokuBox = require('../index');
const { input, puzzle, solution } = require('./test-data/sudoku-puzzle-easy');
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
    test('Should be able to validate', () => {
      const sudokuBox = new SudokuBox();
      expect(sudokuBox.isValidInput({ input })).toStrictEqual({ isValidInput: true });
    });
  });

  describe('isValidBoard', () => {
    test('Should be able to validate', () => {
      const sudokuBox = new SudokuBox();
      expect(sudokuBox.isValidBoard({ board: puzzle })).toStrictEqual({ isValidBoard: true });
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
