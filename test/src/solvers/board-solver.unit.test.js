'use strict';

const BoardSolver = require('../../../src/solvers/board-solver');
const MarkupSolver = require('../../../src/solvers/markup-solver');
const PreemptiveSetSolver = require('../../../src/solvers/preemptive-set-solver');
const MarkupBuilder = require('../../../src/builders/markup-builder');
const PreemptiveSetBuilder = require('../../../src/builders/preemptive-set-builder');
const LoggingHelper = require('../../../src/helpers/logging-helper');
const SolutionValidator = require('../../../src/validators/solution-validator');
const BoardValidator = require('../../../src/validators/board-validator');
const BoardBuilder = require('../../../src/builders/board-builder');

const { input: unsolvablePuzzleInput } = require('../../test-data/sudoku-puzzle-unsolvable');
const { input: expertPuzzleInput } = require('../../test-data/sudoku-puzzle-expert');
const { input: easyPuzzleInput } = require('../../test-data/sudoku-puzzle-easy');

describe('BoardSolver', () => {
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

  describe('When board becomes invalid eventually', () => {
    test('Should return result', () => {
      const inputBoard = new BoardBuilder(unsolvablePuzzleInput).build();
      const result = boardSolver.solve(inputBoard);
      expect(result.isPuzzleSolved).toBeFalsy();
    });
  });

  describe('When board does not change', () => {
    test('Should return result', () => {
      const inputBoard = new BoardBuilder(expertPuzzleInput).build();
      const result = boardSolver.solve(inputBoard);
      expect(result.isPuzzleSolved).toBeFalsy();
    });
  });

  describe('When board is solved', () => {
    test('Should return result', () => {
      const inputBoard = new BoardBuilder(easyPuzzleInput).build();
      const result = boardSolver.solve(inputBoard);
      expect(result.isPuzzleSolved).toBeTruthy();
    });
  });
});
