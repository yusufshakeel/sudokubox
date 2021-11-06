'use strict';

const BoardBuilder = require('./builders/board-builder');
const MarkupBuilder = require('./builders/markup-builder');
const PreemptiveSetBuilder = require('./builders/preemptive-set-builder');
const MarkupSolver = require('./solvers/markup-solver');
const PreemptiveSetSolver = require('./solvers/preemptive-set-solver');
const SolutionValidator = require('./validators/solution-validator');
const { getOutputArrayFromBoard } = require('./helpers');

function engine({ input }) {
  const inputBoard = new BoardBuilder(input).build();
  const markupBuilder = new MarkupBuilder();
  const preemptiveSetBuilder = new PreemptiveSetBuilder();
  const markupSolver = new MarkupSolver();
  const preemptiveSetSolver = new PreemptiveSetSolver();
  const solutionValidator = new SolutionValidator();

  let board = [...inputBoard];
  let isPuzzleSolved = false;

  while (!isPuzzleSolved) {
    const markup = markupBuilder.withBoard(board).build();
    const { isBoardChanged, board: enrichedBoard } = markupSolver.solve(markup, board);
    isPuzzleSolved = solutionValidator.isSolved(enrichedBoard);

    board = [...enrichedBoard];

    if (isPuzzleSolved) {
      break;
    }

    if (!isBoardChanged) {
      break;
    }
  }

  while (!isPuzzleSolved) {
    const markup = markupBuilder.withBoard(board).build();
    const preemptiveSets = preemptiveSetBuilder.withMarkup(markup).build();
    const updatedMarkup = preemptiveSetSolver.solve(preemptiveSets, markup);
    const { isBoardChanged, board: enrichedBoard } = markupSolver.solve(updatedMarkup, board);
    isPuzzleSolved = solutionValidator.isSolved(enrichedBoard);

    board = [...enrichedBoard];

    if (isPuzzleSolved) {
      break;
    }

    if (!isBoardChanged) {
      break;
    }
  }

  return {
    isPuzzleSolved,
    output: getOutputArrayFromBoard(board),
    board
  };
}

module.exports = engine;
