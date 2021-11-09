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
const PerformanceHelper = require('./helpers/performance-helper');

/**
 * Engine to solve the puzzle.
 * @param {number[]} input This is the input one dimensional array.
 * @param {{ verbose: boolean, logPerformance: boolean }} sudokuBoxConfig This is an object of configuration.
 * @returns {{output: number[], isPuzzleSolved: boolean, isBoardValid: boolean, board: number[][], performance: {} }}
 */
function engine({ input, sudokuBoxConfig }) {
  const logging = new LoggingHelper({ isLoggingEnabled: sudokuBoxConfig?.verbose === true });
  const performance = new PerformanceHelper({
    logPerformance: sudokuBoxConfig?.logPerformance === true
  });

  logging.debug({
    moduleName: 'Engine',
    functionName: 'engine',
    message: 'ENTERED engine block'
  });

  performance.startTimer();

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

  const { isPuzzleSolved, isBoardValid, output, board } = boardSolver.solve(inputBoard);

  if (!isPuzzleSolved) {
    logging.debug({
      moduleName: 'Engine',
      functionName: 'engine',
      message: 'ENTERED solve board by backtracking block'
    });

    const backtrackBoardSolver = new BacktrackBoardSolver({ logging, markupBuilder, boardSolver });
    const backtrackingResult = backtrackBoardSolver.solve(board);

    performance.stopTimer();

    logging.debug({
      moduleName: 'Engine',
      functionName: 'engine',
      message: 'EXITING solve board by backtracking block'
    });

    return {
      isPuzzleSolved: backtrackingResult.isPuzzleSolved,
      isBoardValid: backtrackingResult.isBoardValid,
      output: backtrackingResult.output,
      board: backtrackingResult.board,
      performance: performance.stats()
    };
  }

  performance.stopTimer();

  logging.debug({
    moduleName: 'Engine',
    functionName: 'engine',
    message: 'EXITING engine block'
  });

  return { isPuzzleSolved, isBoardValid, output, board, performance: performance.stats() };
}

module.exports = engine;
