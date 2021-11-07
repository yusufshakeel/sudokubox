'use strict';

const MarkupBuilder = require('../../../src/builders/markup-builder');
const LoggingHelper = require('../../../src/helpers/logging-helper');
const { puzzle, markup } = require('../../test-data/sudoku-puzzle-easy');

describe('MarkupBuilder', () => {
  test('Should return markup', () => {
    const logging = new LoggingHelper({ isLoggingEnabled: true });
    const markupBuilder = new MarkupBuilder({ logging });
    expect(markupBuilder.withBoard(puzzle).build()).toStrictEqual(markup);
  });
});
