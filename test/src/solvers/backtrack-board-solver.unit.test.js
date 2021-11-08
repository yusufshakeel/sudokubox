'use strict';

const BacktrackBoardSolver = require('../../../src/solvers/backtrack-board-solver');
const BoardSolver = require('../../../src/solvers/board-solver');
const MarkupSolver = require('../../../src/solvers/markup-solver');
const PreemptiveSetSolver = require('../../../src/solvers/preemptive-set-solver');
const MarkupBuilder = require('../../../src/builders/markup-builder');
const PreemptiveSetBuilder = require('../../../src/builders/preemptive-set-builder');
const LoggingHelper = require('../../../src/helpers/logging-helper');
const SolutionValidator = require('../../../src/validators/solution-validator');
const BoardValidator = require('../../../src/validators/board-validator');

const {
  partiallySolvedBoard: partiallySolvedUnsolvableInputBoard
} = require('../../test-data/sudoku-puzzle-unsolvable');

const {
  partiallySolvedBoard: partiallySolvedExpertPuzzleInputBoard
} = require('../../test-data/sudoku-puzzle-expert');

describe('BacktrackBoardSolver', () => {
  const logging = new LoggingHelper();
  const markupBuilder = new MarkupBuilder({ logging });
  const preemptiveSetBuilder = new PreemptiveSetBuilder({ logging });
  const markupSolver = new MarkupSolver({ logging });
  const preemptiveSetSolver = new PreemptiveSetSolver({ logging });
  const solutionValidator = new SolutionValidator();
  const boardValidator = new BoardValidator();

  const boardSolver = new BoardSolver({
    logging,
    markupBuilder,
    preemptiveSetBuilder,
    markupSolver,
    preemptiveSetSolver,
    solutionValidator,
    boardValidator
  });

  const backtrackBoardSolver = new BacktrackBoardSolver({ logging, markupBuilder, boardSolver });

  describe('When partially solved board is solvable', () => {
    test('Should return result', () => {
      const result = backtrackBoardSolver.solve(partiallySolvedExpertPuzzleInputBoard);
      expect(result.isPuzzleSolved).toBeTruthy();
    });
  });

  describe('When partially solved board is unsolvable', () => {
    test('Should return result', () => {
      const result = backtrackBoardSolver.solve(partiallySolvedUnsolvableInputBoard);
      expect(result.isPuzzleSolved).toBeFalsy();
    });
  });
});
