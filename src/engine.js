'use strict';

const BoardBuilder = require('./builders/board-builder');
const MarkupBuilder = require('./builders/markup-builder');
const PreemptiveSetBuilder = require('./builders/preemptive-set-builder');
const PuzzleBuilder = require('./builders/puzzle-builder');
const MarkupSolver = require('./solvers/markup-solver');
const PreemptiveSetSolver = require('./solvers/preemptive-set-solver');
const BoardSolver = require('./solvers/board-solver');
const BacktrackBoardSolver = require('./solvers/backtrack-board-solver');
const SolutionValidator = require('./validators/solution-validator');
const InputValidator = require('./validators/input-validator');
const BoardValidator = require('./validators/board-validator');
const LoggingHelper = require('./helpers/logging-helper');
const PerformanceHelper = require('./helpers/performance-helper');
const { GENERATE_PUZZLE } = require('./constants');

module.exports = function engine() {
  /**
   * Engine to solve the puzzle.
   * @param {number[]} input This is the input one dimensional array.
   * @param {{ verbose: boolean, logPerformance: boolean }} sudokuBoxConfig This is an object of configuration.
   * @returns {{output: number[], isPuzzleSolved: boolean, isBoardValid: boolean, board: number[][], performance: {} }}
   */
  const solve = function solve({ input, sudokuBoxConfig }) {
    const logging = new LoggingHelper({ isLoggingEnabled: sudokuBoxConfig?.verbose === true });
    const performance = new PerformanceHelper({
      logPerformance: sudokuBoxConfig?.logPerformance === true
    });

    logging.debug({
      moduleName: 'Engine',
      functionName: 'solve',
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
        functionName: 'solve',
        message: 'ENTERED solve board by backtracking block'
      });

      const backtrackBoardSolver = new BacktrackBoardSolver({
        logging,
        markupBuilder,
        boardSolver
      });
      const backtrackingResult = backtrackBoardSolver.solve(board);

      performance.stopTimer();

      logging.debug({
        moduleName: 'Engine',
        functionName: 'solve',
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
      functionName: 'solve',
      message: 'EXITING engine block'
    });

    return { isPuzzleSolved, isBoardValid, output, board, performance: performance.stats() };
  };

  /**
   * Returns true if input is valid, false otherwise.
   * @param {number[]} input This is the input one dimensional array.
   * @param {{ verbose: boolean, logPerformance: boolean }} sudokuBoxConfig This is an object of configuration.
   * @return {boolean|{error: {message: string}, isValidInput: boolean}}
   */
  const isValidInput = function isValidInput({ input, sudokuBoxConfig }) {
    const logging = new LoggingHelper({ isLoggingEnabled: sudokuBoxConfig?.verbose === true });
    try {
      const boardValidator = new BoardValidator();
      const board = new BoardBuilder(input).build();
      return boardValidator.isValid(board);
    } catch (e) {
      logging.debug({
        moduleName: 'Engine',
        functionName: 'isValidInput',
        message: 'ENTERED catch block',
        isValidInput: false,
        error: { message: e.message }
      });

      return {
        isValidInput: false,
        error: { message: e.message }
      };
    }
  };

  /**
   * Returns true if board is valid, false otherwise.
   * @param {numbers[][]} board This is the two-dimensional board array.
   * @param {{ verbose: boolean, logPerformance: boolean }} sudokuBoxConfig This is an object of configuration.
   * @return {boolean|{error: {message: string}, isValidBoard: boolean}}
   */
  const isValidBoard = function isValidBoard({ board, sudokuBoxConfig }) {
    const logging = new LoggingHelper({ isLoggingEnabled: sudokuBoxConfig?.verbose === true });
    try {
      const boardValidator = new BoardValidator();
      return boardValidator.isValid(board);
    } catch (e) {
      logging.debug({
        moduleName: 'Engine',
        functionName: 'isValidBoard',
        message: 'ENTERED catch block',
        isValidBoard: false,
        error: { message: e.message }
      });

      return {
        isValidBoard: false,
        error: { message: e.message }
      };
    }
  };

  const generate = function generate({ level, sudokuBoxConfig }) {
    const logging = new LoggingHelper({ isLoggingEnabled: sudokuBoxConfig?.verbose === true });

    logging.debug({
      moduleName: 'engine',
      functionName: 'generate',
      message: 'ENTERED generate block'
    });

    const availableLevels = Object.keys(GENERATE_PUZZLE);

    if (!availableLevels.includes(level)) {
      logging.debug({
        moduleName: 'engine',
        functionName: 'generate',
        message: 'Level not found!'
      });
      return {
        error: { message: `Level not found. Use one of the following: ${availableLevels}` }
      };
    }

    const { MINIMUM_NUMBER_OF_CELLS_TO_FILL, MAXIMUM_NUMBER_OF_CELLS_TO_FILL } =
      GENERATE_PUZZLE[level];

    const { puzzle, board, totalCellsFilled, performance } = new PuzzleBuilder({ sudokuBoxConfig })
      .withMinimumNumberOfCellsToFill(MINIMUM_NUMBER_OF_CELLS_TO_FILL)
      .withMaximumNumberOfCellsToFill(MAXIMUM_NUMBER_OF_CELLS_TO_FILL)
      .build();

    logging.debug({
      moduleName: 'engine',
      functionName: 'generate',
      message: 'ENTERED generate block'
    });

    return { puzzle, board, totalCellsFilled, performance };
  };

  return { solve, isValidInput, isValidBoard, generate };
};
