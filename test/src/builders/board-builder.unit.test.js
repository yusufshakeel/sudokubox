'use strict';

const BoardBuilder = require('../../../src/builders/board-builder');
const { input, puzzle } = require('../../test-data/sudoku-puzzle-easy');

describe('BoardBuilder', () => {
  test('Should build board from input', () => {
    const boardBuilder = new BoardBuilder(input);
    expect(boardBuilder.build()).toStrictEqual(puzzle);
  });
});
