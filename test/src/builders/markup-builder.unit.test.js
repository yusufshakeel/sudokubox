'use strict';

const MarkupBuilder = require('../../../src/builders/markup-builder');
const { puzzle, markup } = require('../../test-data/sudoku-puzzle-easy');

describe('MarkupBuilder', () => {
  test('Should return markup', () => {
    const markupBuilder = new MarkupBuilder();
    expect(markupBuilder.withBoard(puzzle).build()).toStrictEqual(markup);
  });
});
