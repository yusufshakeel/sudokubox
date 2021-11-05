'use strict';

const engine = require('../../src/engine');

const {
  input: easyPuzzleInput,
  output: easyPuzzleOutput,
  solution: easyPuzzleSolution
} = require('../test-data/sudoku-puzzle-easy');

const { input: hardPuzzleInput } = require('../test-data/sudoku-puzzle-hard');

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
      expect(result.isPuzzleSolved).toBeFalsy();
    });
  });
});
