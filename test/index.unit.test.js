'use strict';

const SudokuBox = require('../index');
const { input, solution } = require('./test-data/sudoku-puzzle-easy');

describe('SudokuBox', () => {
  const sudokuBox = new SudokuBox();

  describe('Solve puzzle', () => {
    describe('Easy puzzle', () => {
      test('Should solve puzzle', () => {
        let result = sudokuBox.solve({ input });
        expect(result.isPuzzleSolved).toBeTruthy();
        expect(result.board).toStrictEqual(solution);
      });
    });
  });
});
