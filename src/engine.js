'use strict';

const BoardBuilder = require('./builders/board-builder');
const MarkupBuilder = require('./builders/markup-builder');
const MarkupSolver = require('./solvers/markup-solver');
const SolutionValidator = require('./validators/solution-validator');
const { getOutputArrayFromBoard } = require('./helpers');

function engine({ input }) {
  const inputBoard = new BoardBuilder(input).build();
  const markupBuilder = new MarkupBuilder();
  const markupSolver = new MarkupSolver();
  const solutionValidator = new SolutionValidator();

  let board = [...inputBoard];
  let isPuzzleSolved = false;

  while (!isPuzzleSolved) {
    let markup = markupBuilder.withBoard(board).build();
    let { isBoardChanged, board: enrichedBoard } = markupSolver.solve(markup, board);
    isPuzzleSolved = solutionValidator.isSolved(enrichedBoard);

    if (isPuzzleSolved) {
      board = [...enrichedBoard];
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
