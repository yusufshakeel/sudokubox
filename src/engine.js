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
 * @param {LoggingHelper} logging
 * @param {MarkupBuilder} markupBuilder
 * @param {PreemptiveSetBuilder} preemptiveSetBuilder
 * @param {MarkupSolver} markupSolver
 * @param {PreemptiveSetSolver} preemptiveSetSolver
 * @param {SolutionValidator} solutionValidator
 * @returns {{output: number[], isPuzzleSolved: boolean, board: *[]}}
 */
function solveBoard({
  inputBoard,
  logging,
  markupBuilder,
  preemptiveSetBuilder,
  markupSolver,
  preemptiveSetSolver,
  solutionValidator
}) {
  logging.debug({
    moduleName: 'Engine',
    functionName: 'solveBoard',
    message: 'ENTERED solveBoard block'
  });

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

  logging.debug({
    moduleName: 'Engine',
    functionName: 'solveBoard',
    message: 'EXITING solveBoard block'
  });

  return {
    isPuzzleSolved,
    output: getOutputArrayFromBoard(board),
    board
  };
}

/**
 * Engine to solve the puzzle.
 * @param {number[]} input This is the input one dimensional array.
 * @param {{ verbose: boolean }} sudokuBoxConfig This is an object of configuration.
 * @returns {{isPuzzleSolved: boolean, error: {message}}|{output: number[], isPuzzleSolved: boolean, board: number[][]}}
 */
function engine({ input, sudokuBoxConfig }) {
  const logging = new LoggingHelper({ isLoggingEnabled: sudokuBoxConfig?.verbose });

  logging.debug({
    moduleName: 'Engine',
    functionName: 'engine',
    message: 'ENTERED engine block'
  });

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
    logging,
    markupBuilder,
    preemptiveSetBuilder,
    markupSolver,
    preemptiveSetSolver,
    solutionValidator
  });

  logging.debug({
    moduleName: 'Engine',
    functionName: 'engine',
    message: 'EXITING engine block'
  });

  return { isPuzzleSolved, output, board };
}

module.exports = engine;
