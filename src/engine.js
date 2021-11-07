'use strict';

const BoardBuilder = require('./builders/board-builder');
const MarkupBuilder = require('./builders/markup-builder');
const PreemptiveSetBuilder = require('./builders/preemptive-set-builder');
const MarkupSolver = require('./solvers/markup-solver');
const PreemptiveSetSolver = require('./solvers/preemptive-set-solver');
const SolutionValidator = require('./validators/solution-validator');
const InputValidator = require('./validators/input-validator');
const { getOutputArrayFromBoard } = require('./helpers');
const LoggingHelper = require('./helpers/logging-helper');

/**
 * This will solve the board.
 * @param {number[]} inputBoard
 * @param {MarkupBuilder} markupBuilder
 * @param {PreemptiveSetBuilder} preemptiveSetBuilder
 * @param {MarkupSolver} markupSolver
 * @param {PreemptiveSetSolver} preemptiveSetSolver
 * @param {SolutionValidator} solutionValidator
 * @returns {{output: number[], isPuzzleSolved: boolean, board: *[]}}
 */
function solveBoard({
  inputBoard,
  markupBuilder,
  preemptiveSetBuilder,
  markupSolver,
  preemptiveSetSolver,
  solutionValidator
}) {
  let board = [...inputBoard];
  let isPuzzleSolved = false;

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

function engine({ input, sudokuBoxConfig }) {
  const logging = new LoggingHelper({ isLoggingEnabled: sudokuBoxConfig?.verbose });
  const inputBoard = new BoardBuilder(input).build();

  try {
    new InputValidator().validate(inputBoard);
  } catch (e) {
    return {
      isPuzzleSolved: false,
      error: { message: e.message }
    };
  }

  const markupBuilder = new MarkupBuilder({ logging });
  const preemptiveSetBuilder = new PreemptiveSetBuilder({ logging });
  const markupSolver = new MarkupSolver({ logging });
  const preemptiveSetSolver = new PreemptiveSetSolver({ logging });
  const solutionValidator = new SolutionValidator();

  const { isPuzzleSolved, output, board } = solveBoard({
    inputBoard,
    markupBuilder,
    preemptiveSetBuilder,
    markupSolver,
    preemptiveSetSolver,
    solutionValidator
  });
  return { isPuzzleSolved, output, board };
}

module.exports = engine;
