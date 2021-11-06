'use strict';

const PreemptiveSetSolver = require('../../../src/solvers/preemptive-set-solver');

const {
  partiallySolvedBoardMarkupToFindPreemptiveSet,
  partiallySolvedBoardPreemptiveSet,
  partiallySolvedBoardMarkupAfterSolvingPreemptiveSet
} = require('../../test-data/sudoku-puzzle-hard');

describe('PreemptiveSetSolver', () => {
  const preemptiveSetSolver = new PreemptiveSetSolver();

  test('Should return markup', () => {
    const result = preemptiveSetSolver.solve(
      partiallySolvedBoardPreemptiveSet,
      partiallySolvedBoardMarkupToFindPreemptiveSet
    );
    expect(result).toStrictEqual(partiallySolvedBoardMarkupAfterSolvingPreemptiveSet);
  });
});
