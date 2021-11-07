'use strict';

const MarkupSolver = require('../../../src/solvers/markup-solver');
const LoggingHelper = require('../../../src/helpers/logging-helper');

const {
  puzzle,
  markup,
  partiallySolvedBoardUsingMarkup
} = require('../../test-data/sudoku-puzzle-easy');

describe('MarkupSolver', () => {
  const logging = new LoggingHelper({ isLoggingEnabled: true });
  const markupSolver = new MarkupSolver({ logging });

  describe('When board has cells with markup having one number', () => {
    test('Should return updated board with filled cells using markup', () => {
      expect(markupSolver.solve(markup, puzzle)).toStrictEqual({
        isBoardChanged: true,
        board: partiallySolvedBoardUsingMarkup
      });
    });
  });
});
