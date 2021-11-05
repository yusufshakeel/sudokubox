'use strict';

const MarkupSolver = require('../../../src/solvers/markup-solver');
const {
  puzzle,
  markup,
  partiallySolvedBoardUsingMarkup
} = require('../../test-data/sudoku-puzzle-easy');

describe('MarkupSolver', () => {
  const markupSolver = new MarkupSolver();

  describe('When board has cells with markup having one number', () => {
    test('Should return updated board with filled cells using markup', () => {
      expect(markupSolver.solve(markup, puzzle)).toStrictEqual(partiallySolvedBoardUsingMarkup);
    });
  });
});
