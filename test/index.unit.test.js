'use strict';

const SudokuBox = require('../index');
const { input, solution } = require('./test-data/sudoku-puzzle-easy');

describe('SudokuBox', () => {
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
