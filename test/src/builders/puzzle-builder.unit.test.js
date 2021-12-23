'use strict';

const PuzzleBuilder = require('../../../src/builders/puzzle-builder');
const BoardValidator = require('../../../src/validators/board-validator');
const {
  GENERATE_PUZZLE: { EASY, MEDIUM, HARD, EXTREME }
} = require('../../../src/constants');

describe('PuzzleBuilder', () => {
  const boardValidator = new BoardValidator();

  describe('Easy puzzle', () => {
    test('Should be able to create puzzle', () => {
      const puzzleBuilder = new PuzzleBuilder({
        sudokuBoxConfig: { verbose: true, logPerformance: true }
      });
      const { puzzle, board, totalCellsFilled, performance } = puzzleBuilder
        .withMinimumNumberOfCellsToFill(EASY.MINIMUM_NUMBER_OF_CELLS_TO_FILL)
        .withMaximumNumberOfCellsToFill(EASY.MAXIMUM_NUMBER_OF_CELLS_TO_FILL)
        .build();

      expect(puzzle).toHaveLength(81);
      expect(boardValidator.isValid(board)).toBeTruthy();
      expect(totalCellsFilled).toBeLessThanOrEqual(EASY.MAXIMUM_NUMBER_OF_CELLS_TO_FILL);
      expect(totalCellsFilled).toBeGreaterThanOrEqual(EASY.MINIMUM_NUMBER_OF_CELLS_TO_FILL);
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

  describe('Medium puzzle', () => {
    test('Should be able to create puzzle', () => {
      const puzzleBuilder = new PuzzleBuilder({
        sudokuBoxConfig: { verbose: true, logPerformance: true }
      });
      const { puzzle, board, totalCellsFilled, performance } = puzzleBuilder
        .withMinimumNumberOfCellsToFill(MEDIUM.MINIMUM_NUMBER_OF_CELLS_TO_FILL)
        .withMaximumNumberOfCellsToFill(MEDIUM.MAXIMUM_NUMBER_OF_CELLS_TO_FILL)
        .build();

      expect(puzzle).toHaveLength(81);
      expect(boardValidator.isValid(board)).toBeTruthy();
      expect(totalCellsFilled).toBeLessThanOrEqual(MEDIUM.MAXIMUM_NUMBER_OF_CELLS_TO_FILL);
      expect(totalCellsFilled).toBeGreaterThanOrEqual(MEDIUM.MINIMUM_NUMBER_OF_CELLS_TO_FILL);
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

  describe('Hard puzzle', () => {
    test('Should be able to create puzzle', () => {
      const puzzleBuilder = new PuzzleBuilder({
        sudokuBoxConfig: { verbose: true, logPerformance: true }
      });
      const { puzzle, board, totalCellsFilled, performance } = puzzleBuilder
        .withMinimumNumberOfCellsToFill(HARD.MINIMUM_NUMBER_OF_CELLS_TO_FILL)
        .withMaximumNumberOfCellsToFill(HARD.MAXIMUM_NUMBER_OF_CELLS_TO_FILL)
        .build();

      expect(puzzle).toHaveLength(81);
      expect(boardValidator.isValid(board)).toBeTruthy();
      expect(totalCellsFilled).toBeLessThanOrEqual(HARD.MAXIMUM_NUMBER_OF_CELLS_TO_FILL);
      expect(totalCellsFilled).toBeGreaterThanOrEqual(HARD.MINIMUM_NUMBER_OF_CELLS_TO_FILL);
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

  describe('Extreme puzzle', () => {
    test('Should be able to create puzzle', () => {
      const puzzleBuilder = new PuzzleBuilder({
        sudokuBoxConfig: { verbose: true, logPerformance: true }
      });
      const { puzzle, board, totalCellsFilled, performance } = puzzleBuilder
        .withMinimumNumberOfCellsToFill(EXTREME.MINIMUM_NUMBER_OF_CELLS_TO_FILL)
        .withMaximumNumberOfCellsToFill(EXTREME.MAXIMUM_NUMBER_OF_CELLS_TO_FILL)
        .build();

      expect(puzzle).toHaveLength(81);
      expect(boardValidator.isValid(board)).toBeTruthy();
      expect(totalCellsFilled).toBeLessThanOrEqual(EXTREME.MAXIMUM_NUMBER_OF_CELLS_TO_FILL);
      expect(totalCellsFilled).toBeGreaterThanOrEqual(EXTREME.MINIMUM_NUMBER_OF_CELLS_TO_FILL);
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
