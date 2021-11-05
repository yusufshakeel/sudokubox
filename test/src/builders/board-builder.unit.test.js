'use strict';

const BoardBuilder = require('../../../src/builders/board-builder');

describe('BoardBuilder', () => {
  test('Should build board from input', () => {
    const input = [
      1, 3, 0, 2, 0, 0, 7, 4, 0, 0, 2, 5, 0, 1, 0, 0, 0, 0, 4, 8, 0, 0, 6, 0, 0, 5, 0, 0, 0, 0, 7,
      8, 0, 2, 1, 0, 5, 0, 0, 0, 9, 0, 3, 7, 0, 9, 0, 0, 0, 3, 0, 0, 0, 5, 0, 4, 0, 0, 0, 6, 8, 9,
      0, 0, 5, 3, 0, 0, 1, 4, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0
    ];
    const boardBuilder = new BoardBuilder(input);
    expect(boardBuilder.build()).toStrictEqual([
      [1, 3, 0, 2, 0, 0, 7, 4, 0],
      [0, 2, 5, 0, 1, 0, 0, 0, 0],
      [4, 8, 0, 0, 6, 0, 0, 5, 0],
      [0, 0, 0, 7, 8, 0, 2, 1, 0],
      [5, 0, 0, 0, 9, 0, 3, 7, 0],
      [9, 0, 0, 0, 3, 0, 0, 0, 5],
      [0, 4, 0, 0, 0, 6, 8, 9, 0],
      [0, 5, 3, 0, 0, 1, 4, 0, 0],
      [6, 0, 0, 0, 0, 0, 0, 0, 0]
    ]);
  });
});
