'use strict';

const BoardBuilder = require('./builders/board-builder');
const MarkupBuilder = require('./builders/markup-builder');
const PreemptiveSetBuilder = require('./builders/preemptive-set-builder');
const MarkupSolver = require('./solvers/markup-solver');
const PreemptiveSetSolver = require('./solvers/preemptive-set-solver');
const BoardSolver = require('./solvers/board-solver');
const BacktrackBoardSolver = require('./solvers/backtrack-board-solver');
const SolutionValidator = require('./validators/solution-validator');
const InputValidator = require('./validators/input-validator');
const BoardValidator = require('./validators/board-validator');
const LoggingHelper = require('./helpers/logging-helper');

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

  const { isPuzzleSolved, output, board } = boardSolver.solve(inputBoard);

  if (!isPuzzleSolved) {
    logging.debug({
      moduleName: 'Engine',
      functionName: 'engine',
      message: 'ENTERED solve board by backtracking block'
    });

    const backtrackBoardSolver = new BacktrackBoardSolver({ logging, markupBuilder, boardSolver });
    const backtrackingResult = backtrackBoardSolver.solve(board);

    logging.debug({
      moduleName: 'Engine',
      functionName: 'engine',
      message: 'EXITING solve board by backtracking block'
    });

    return {
      isPuzzleSolved: backtrackingResult.isPuzzleSolved,
      output: backtrackingResult.output,
      board: backtrackingResult.board
    };
  }

  logging.debug({
    moduleName: 'Engine',
    functionName: 'engine',
    message: 'EXITING engine block'
  });

  return { isPuzzleSolved, output, board };
}

module.exports = engine;
