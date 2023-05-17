import BoardBuilder from './builders/board-builder';
import MarkupBuilder from './builders/markup-builder';
import PreemptiveSetBuilder from './builders/preemptive-set-builder';
import PuzzleBuilder from './builders/puzzle-builder';
import RandomBoardBuilder from './builders/random-board-builder';
import MarkupSolver from './solvers/markup-solver';
import PreemptiveSetSolver from './solvers/preemptive-set-solver';
import BoardSolver from './solvers/board-solver';
import BacktrackBoardSolver from './solvers/backtrack-board-solver';
import SolutionValidator from './validators/solution-validator';
import InputValidator from './validators/input-validator';
import BoardValidator from './validators/board-validator';
import LoggingHelper from './helpers/logging-helper';
import PerformanceHelper from './helpers/performance-helper';
import CONSTANTS from './constants';
import { SudokuBoxConfigType } from './ts-def/sudokubox-config-type';
import { BoardType } from './ts-def/board-type';

const { GENERATE_PUZZLE } = CONSTANTS;

export default function engine({ sudokuBoxConfig }: { sudokuBoxConfig?: SudokuBoxConfigType }) {
  const logging = new LoggingHelper({
    isLoggingEnabled: sudokuBoxConfig?.verbose === true,
    logger: sudokuBoxConfig?.logger
  });
  const performance = new PerformanceHelper({
    logPerformance: sudokuBoxConfig?.logPerformance === true
  });

  /**
   * Engine to solve the puzzle.
   * @param {number[]} input This is the input one dimensional array.
   * @returns {{output: number[], isPuzzleSolved: boolean, isBoardValid: boolean, board: number[][], performance: {} }}
   */
  const solve = function solve({ input }: { input: number[] }) {
    logging.debug({
      moduleName: 'Engine',
      functionName: 'solve',
      message: 'ENTERED solve block'
    });

    performance.startTimer();

    const inputBoard = new BoardBuilder(input).build();

    try {
      new InputValidator().validate(inputBoard);
    } catch (e: any) {
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
      message: 'EXITING solve block'
    });

    return { isPuzzleSolved, isBoardValid, output, board, performance: performance.stats() };
  };

  /**
   * Returns true if input is valid, false otherwise.
   * @param {number[]} input This is the input one dimensional array.
   * @return {boolean|{error: {message: string}, isValidInput: boolean}}
   */
  const isValidInput = function isValidInput({ input }: { input: number[] }) {
    try {
      logging.debug({
        moduleName: 'Engine',
        functionName: 'isValidInput',
        message: 'ENTERED try block'
      });

      const boardValidator = new BoardValidator();
      const board = new BoardBuilder(input).build();

      logging.debug({
        moduleName: 'Engine',
        functionName: 'isValidInput',
        message: 'EXITING try block'
      });

      return { isValidInput: boardValidator.isValid(board) };
    } catch (e: any) {
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
   * @param {number[][]} board This is the two-dimensional board array.
   * @return {boolean|{error: {message: string}, isValidBoard: boolean}}
   */
  const isValidBoard = function isValidBoard({ board }: { board: BoardType }) {
    try {
      logging.debug({
        moduleName: 'Engine',
        functionName: 'isValidBoard',
        message: 'ENTERED try block'
      });

      const boardValidator = new BoardValidator();

      logging.debug({
        moduleName: 'Engine',
        functionName: 'isValidBoard',
        message: 'EXITING try block'
      });

      return { isValidBoard: boardValidator.isValid(board) };
    } catch (e: any) {
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

  /**
   * This will generate puzzle.
   * @param {string} level
   * @return {{error: {message: string}}|{totalCellsFilled: number, performance: {}, puzzle: number[], board: number[][]}}
   */
  const generate = function generate({ level }: { level: string }) {
    logging.debug({
      moduleName: 'engine',
      functionName: 'generate',
      message: 'ENTERED generate block'
    });

    performance.startTimer();

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
      GENERATE_PUZZLE[level as keyof typeof GENERATE_PUZZLE];

    const randomBoardBuilder = new RandomBoardBuilder({ logging, performance });
    const { puzzle: randomBoardInput } = randomBoardBuilder.build();
    const { output: randomPuzzleInput } = solve({ input: randomBoardInput });

    const { puzzle, board, totalCellsFilled } = new PuzzleBuilder({ logging })
      .withInput(randomPuzzleInput)
      .withMinimumNumberOfCellsToFill(MINIMUM_NUMBER_OF_CELLS_TO_FILL)
      .withMaximumNumberOfCellsToFill(MAXIMUM_NUMBER_OF_CELLS_TO_FILL)
      .build();

    performance.stopTimer();

    logging.debug({
      moduleName: 'engine',
      functionName: 'generate',
      message: 'EXITING generate block'
    });

    return { puzzle, board, totalCellsFilled, performance: performance.stats() };
  };

  return { solve, isValidInput, isValidBoard, generate };
};