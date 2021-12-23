'use strict';

const engine = require('../../src/engine')();
const BoardValidator = require('../../src/validators/board-validator');

const { GENERATE_PUZZLE } = require('../../src/constants');

const {
  input: easyPuzzleInput,
  puzzle: easyPuzzleBoard,
  output: easyPuzzleOutput,
  solution: easyPuzzleSolution
} = require('../test-data/sudoku-puzzle-easy');

const {
  input: hardPuzzleInput,
  output: hardPuzzleOutput,
  solution: hardPuzzleSolution
} = require('../test-data/sudoku-puzzle-hard');

const {
  input: mediumPuzzleInput,
  output: mediumPuzzleOutput,
  solution: mediumPuzzleSolution
} = require('../test-data/sudoku-puzzle-medium');

const { input: unsolvablePuzzleInput } = require('../test-data/sudoku-puzzle-unsolvable');

const {
  input: expertPuzzleInput,
  output: expertPuzzleOutput,
  solution: expertPuzzleSolution
} = require('../test-data/sudoku-puzzle-expert');

const {
  input: evilPuzzleInput,
  output: evilPuzzleOutput,
  solution: evilPuzzleSolution
} = require('../test-data/sudoku-puzzle-evil');

const {
  input: invalidPuzzleInput,
  puzzle: invalidInputBoard
} = require('../test-data/sudoku-puzzle-invalid-input');

describe('solve', () => {
  describe('When input is invalid', () => {
    test('Should return result', () => {
      const result = engine.solve({ input: invalidPuzzleInput });
      expect(result.isPuzzleSolved).toBeFalsy();
      expect(result.error.message).toBe(
        'Input board contains invalid number in Row: 0, Column: 0.'
      );
    });
  });

  describe('Solve easy puzzle', () => {
    test('Should return result', () => {
      const result = engine.solve({ input: easyPuzzleInput });
      expect(result.isPuzzleSolved).toBeTruthy();
      expect(result.board).toStrictEqual(easyPuzzleSolution);
      expect(result.output).toStrictEqual(easyPuzzleOutput);
      expect(result.performance).toBeUndefined();
    });
  });

  describe('Solve medium puzzle', () => {
    test('Should return result', () => {
      const result = engine.solve({ input: mediumPuzzleInput });
      expect(result.isPuzzleSolved).toBeTruthy();
      expect(result.board).toStrictEqual(mediumPuzzleSolution);
      expect(result.output).toStrictEqual(mediumPuzzleOutput);
    });
  });

  describe('Solve hard puzzle', () => {
    test('Should return result', () => {
      const result = engine.solve({ input: hardPuzzleInput });
      expect(result.isPuzzleSolved).toBeTruthy();
      expect(result.board).toStrictEqual(hardPuzzleSolution);
      expect(result.output).toStrictEqual(hardPuzzleOutput);
    });
  });

  describe('Solve expert puzzle', () => {
    test('Should return result', () => {
      const result = engine.solve({ input: expertPuzzleInput });
      expect(result.isPuzzleSolved).toBeTruthy();
      expect(result.board).toStrictEqual(expertPuzzleSolution);
      expect(result.output).toStrictEqual(expertPuzzleOutput);
    });
  });

  describe('Solve evil puzzle', () => {
    test('Should return result', () => {
      const result = engine.solve({
        input: evilPuzzleInput,
        sudokuBoxConfig: { logPerformance: true }
      });
      expect(result.isPuzzleSolved).toBeTruthy();
      expect(result.board).toStrictEqual(evilPuzzleSolution);
      expect(result.output).toStrictEqual(evilPuzzleOutput);
      expect(result.performance).toBeDefined();
    });
  });

  describe('Unsolvable puzzle', () => {
    test('Should return result', () => {
      const result = engine.solve({ input: unsolvablePuzzleInput });
      expect(result.isPuzzleSolved).toBeFalsy();
    });
  });
});

describe('isValidInput', () => {
  describe('When input is valid', () => {
    test('Should return false', () => {
      expect(engine.isValidInput({ input: invalidPuzzleInput })).toBeFalsy();
    });
  });

  describe('When input is invalid', () => {
    test('Should return true', () => {
      expect(engine.isValidInput({ input: easyPuzzleInput })).toBeTruthy();
    });
  });

  describe('When input has error', () => {
    test('Should return error message', () => {
      expect(engine.isValidInput({ input: '1', sudokuBoxConfig: { verbose: true } })).toStrictEqual(
        {
          isValidInput: false,
          error: {
            message: 'input.reduce is not a function'
          }
        }
      );
    });
  });
});

describe('isValidBoard', () => {
  describe('When board is valid', () => {
    test('Should return false', () => {
      expect(engine.isValidBoard({ board: invalidInputBoard })).toBeFalsy();
    });
  });

  describe('When board is invalid', () => {
    test('Should return true', () => {
      expect(engine.isValidBoard({ board: easyPuzzleBoard })).toBeTruthy();
    });
  });

  describe('When board as error', () => {
    test('Should return error message', () => {
      expect(engine.isValidBoard({ board: [], sudokuBoxConfig: { verbose: true } })).toStrictEqual({
        isValidBoard: false,
        error: {
          message: "Cannot read property '0' of undefined"
        }
      });
    });
  });
});

describe('generate', () => {
  describe('When level is wrong', () => {
    test('Should return error message', () => {
      const result = engine.generate({ level: 'UNKNOWN' });
      expect(result).toStrictEqual({
        error: {
          message: 'Level not found. Use one of the following: EASY,MEDIUM,HARD,EXTREME'
        }
      });
    });
  });

  describe('When level is correct', () => {
    test('Should return puzzle', () => {
      const boardValidator = new BoardValidator();
      const { puzzle, board, totalCellsFilled, performance } = engine.generate({
        level: 'EASY',
        sudokuBoxConfig: { logPerformance: true }
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
