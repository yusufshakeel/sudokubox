'use strict';

const SudokuBox = require('../index');
const { input, solution } = require('./test-data/sudoku-puzzle-easy');

describe('SudokuBox', () => {
  test('Should solve puzzle', () => {
    const sudokuBox = new SudokuBox({ verbose: true, logPerformance: true });
    let result = sudokuBox.solve({ input });
    expect(result.isPuzzleSolved).toBeTruthy();
    expect(result.isBoardValid).toBeTruthy();
    expect(result.board).toStrictEqual(solution);
    expect(result.performance).not.toBeUndefined();
  });
});
