'use strict';

const PuzzleBuilder = require('../../../src/builders/puzzle-builder');
const BoardValidator = require('../../../src/validators/board-validator');
const LoggingHelper = require('../../../src/helpers/logging-helper');
const { output: randomPuzzleInput } = require('../../test-data/sudoku-puzzle-easy');
const {
  GENERATE_PUZZLE: { EASY, MEDIUM, HARD, EXTREME, DIABOLICAL }
} = require('../../../src/constants');

describe('PuzzleBuilder', () => {
  const boardValidator = new BoardValidator();
  const loggingHelper = new LoggingHelper({ isLoggingEnabled: true });

  describe('Easy puzzle', () => {
    test('Should be able to create puzzle', () => {
      const puzzleBuilder = new PuzzleBuilder({ logging: loggingHelper });
      const { puzzle, board, totalCellsFilled } = puzzleBuilder
        .withInput(randomPuzzleInput)
        .withMinimumNumberOfCellsToFill(EASY.MINIMUM_NUMBER_OF_CELLS_TO_FILL)
        .withMaximumNumberOfCellsToFill(EASY.MAXIMUM_NUMBER_OF_CELLS_TO_FILL)
        .build();

      expect(puzzle).toHaveLength(81);
      expect(boardValidator.isValid(board)).toBeTruthy();
      expect(totalCellsFilled).toBeLessThanOrEqual(EASY.MAXIMUM_NUMBER_OF_CELLS_TO_FILL);
      expect(totalCellsFilled).toBeGreaterThanOrEqual(EASY.MINIMUM_NUMBER_OF_CELLS_TO_FILL);
    });
  });

  describe('Medium puzzle', () => {
    test('Should be able to create puzzle', () => {
      const puzzleBuilder = new PuzzleBuilder({ logging: loggingHelper });
      const { puzzle, board, totalCellsFilled } = puzzleBuilder
        .withInput(randomPuzzleInput)
        .withMinimumNumberOfCellsToFill(MEDIUM.MINIMUM_NUMBER_OF_CELLS_TO_FILL)
        .withMaximumNumberOfCellsToFill(MEDIUM.MAXIMUM_NUMBER_OF_CELLS_TO_FILL)
        .build();

      expect(puzzle).toHaveLength(81);
      expect(boardValidator.isValid(board)).toBeTruthy();
      expect(totalCellsFilled).toBeLessThanOrEqual(MEDIUM.MAXIMUM_NUMBER_OF_CELLS_TO_FILL);
      expect(totalCellsFilled).toBeGreaterThanOrEqual(MEDIUM.MINIMUM_NUMBER_OF_CELLS_TO_FILL);
    });
  });

  describe('Hard puzzle', () => {
    test('Should be able to create puzzle', () => {
      const puzzleBuilder = new PuzzleBuilder({ logging: loggingHelper });
      const { puzzle, board, totalCellsFilled } = puzzleBuilder
        .withInput(randomPuzzleInput)
        .withMinimumNumberOfCellsToFill(HARD.MINIMUM_NUMBER_OF_CELLS_TO_FILL)
        .withMaximumNumberOfCellsToFill(HARD.MAXIMUM_NUMBER_OF_CELLS_TO_FILL)
        .build();

      expect(puzzle).toHaveLength(81);
      expect(boardValidator.isValid(board)).toBeTruthy();
      expect(totalCellsFilled).toBeLessThanOrEqual(HARD.MAXIMUM_NUMBER_OF_CELLS_TO_FILL);
      expect(totalCellsFilled).toBeGreaterThanOrEqual(HARD.MINIMUM_NUMBER_OF_CELLS_TO_FILL);
    });
  });

  describe('Extreme puzzle', () => {
    test('Should be able to create puzzle', () => {
      const puzzleBuilder = new PuzzleBuilder({ logging: loggingHelper });
      const { puzzle, board, totalCellsFilled } = puzzleBuilder
        .withInput(randomPuzzleInput)
        .withMinimumNumberOfCellsToFill(EXTREME.MINIMUM_NUMBER_OF_CELLS_TO_FILL)
        .withMaximumNumberOfCellsToFill(EXTREME.MAXIMUM_NUMBER_OF_CELLS_TO_FILL)
        .build();

      expect(puzzle).toHaveLength(81);
      expect(boardValidator.isValid(board)).toBeTruthy();
      expect(totalCellsFilled).toBeLessThanOrEqual(EXTREME.MAXIMUM_NUMBER_OF_CELLS_TO_FILL);
      expect(totalCellsFilled).toBeGreaterThanOrEqual(EXTREME.MINIMUM_NUMBER_OF_CELLS_TO_FILL);
    });
  });

  describe('Diabolical puzzle', () => {
    test('Should be able to create puzzle', () => {
      const puzzleBuilder = new PuzzleBuilder({ logging: loggingHelper });
      const { puzzle, board, totalCellsFilled } = puzzleBuilder
        .withInput(randomPuzzleInput)
        .withMinimumNumberOfCellsToFill(DIABOLICAL.MINIMUM_NUMBER_OF_CELLS_TO_FILL)
        .withMaximumNumberOfCellsToFill(DIABOLICAL.MAXIMUM_NUMBER_OF_CELLS_TO_FILL)
        .build();

      expect(puzzle).toHaveLength(81);
      expect(boardValidator.isValid(board)).toBeTruthy();
      expect(totalCellsFilled).toBeLessThanOrEqual(DIABOLICAL.MAXIMUM_NUMBER_OF_CELLS_TO_FILL);
      expect(totalCellsFilled).toBeGreaterThanOrEqual(DIABOLICAL.MINIMUM_NUMBER_OF_CELLS_TO_FILL);
    });
  });
});
