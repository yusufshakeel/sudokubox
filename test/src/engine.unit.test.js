'use strict';

const engine = require('../../src/engine');

const {
  input: easyPuzzleInput,
  output: easyPuzzleOutput,
  solution: easyPuzzleSolution
} = require('../test-data/sudoku-puzzle-easy');

const {
  input: hardPuzzleInput,
  output: hardPuzzleOutput,
  solution: hardPuzzleSolution
} = require('../test-data/sudoku-puzzle-hard');

const {
  input: unsolvablePuzzleInput,
  output: unsolvablePuzzleOutput,
  solution: unsolvablePuzzleSolution
} = require('../test-data/sudoku-puzzle-unsolvable');

describe('engine', () => {
  describe('Solve easy puzzle', () => {
    test('Should return result', () => {
      const result = engine({ input: easyPuzzleInput });
      expect(result.isPuzzleSolved).toBeTruthy();
      expect(result.board).toStrictEqual(easyPuzzleSolution);
      expect(result.output).toStrictEqual(easyPuzzleOutput);
    });
  });

  describe('Solve hard puzzle', () => {
    test('Should return result', () => {
      const result = engine({ input: hardPuzzleInput });
      expect(result.isPuzzleSolved).toBeTruthy();
      expect(result.board).toStrictEqual(hardPuzzleSolution);
      expect(result.output).toStrictEqual(hardPuzzleOutput);
    });
  });

  describe('Unsolvable puzzle', () => {
    test('Should return result', () => {
      const result = engine({ input: unsolvablePuzzleInput });
      expect(result.isPuzzleSolved).toBeFalsy();
      expect(result.board).toStrictEqual(unsolvablePuzzleSolution);
      expect(result.output).toStrictEqual(unsolvablePuzzleOutput);
    });
  });
});
