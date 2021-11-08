'use strict';

const BoardBuilder = require('./builders/board-builder');
const MarkupBuilder = require('./builders/markup-builder');
const PreemptiveSetBuilder = require('./builders/preemptive-set-builder');
const MarkupSolver = require('./solvers/markup-solver');
const PreemptiveSetSolver = require('./solvers/preemptive-set-solver');
const SolutionValidator = require('./validators/solution-validator');
const InputValidator = require('./validators/input-validator');
const BoardValidator = require('./validators/board-validator');
const LoggingHelper = require('./helpers/logging-helper');
const StackHelper = require('./helpers/stack-helper');
const { getOutputArrayFromBoard, getFirstMarkupWithLessNumberOfValues } = require('./helpers');

/**
 * This will solve the board.
 * @param {number[]} inputBoard
 * @param {LoggingHelper} logging
 * @param {MarkupBuilder} markupBuilder
 * @param {PreemptiveSetBuilder} preemptiveSetBuilder
 * @param {MarkupSolver} markupSolver
 * @param {PreemptiveSetSolver} preemptiveSetSolver
 * @param {SolutionValidator} solutionValidator
 * @param {BoardValidator} boardValidator
 * @returns {{output: number[], isPuzzleSolved: boolean, isBoardValid: boolean, isBoardChanged: boolean, board: number[][]}}
 */
function solveBoard({
  inputBoard,
  logging,
  markupBuilder,
  preemptiveSetBuilder,
  markupSolver,
  preemptiveSetSolver,
  solutionValidator,
  boardValidator
}) {
  logging.debug({
    moduleName: 'Engine',
    functionName: 'solveBoard',
    message: 'ENTERED solveBoard block'
  });

  let board = [...inputBoard];
  let isPuzzleSolved = false;
  let isBoardValid = false;
  let isBoardChanged = false;

  while (!isPuzzleSolved) {
    const markup = markupBuilder.withBoard(board).build();
    const preemptiveSets = preemptiveSetBuilder.withMarkup(markup).build();
    const updatedMarkup = preemptiveSetSolver.solve(preemptiveSets, markup);
    const { isBoardChanged: markSolverBoardChanged, board: enrichedBoard } = markupSolver.solve(
      updatedMarkup,
      board
    );

    isBoardValid = boardValidator.isValid(enrichedBoard);
    isBoardChanged = markSolverBoardChanged;

    if (!isBoardValid) {
      logging.debug({
        moduleName: 'Engine',
        functionName: 'solveBoard',
        message: 'Board is not valid'
      });

      logging.debug({
        moduleName: 'Engine',
        functionName: 'solveBoard',
        message: 'EXITING solveBoard block'
      });

      return {
        isPuzzleSolved,
        isBoardValid,
        isBoardChanged,
        board,
        output: getOutputArrayFromBoard(board)
      };
    }

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
    isBoardValid,
    isBoardChanged,
    board,
    output: getOutputArrayFromBoard(board)
  };
}

/**
 * This will solve the board with backtracking.
 * @param {number[][]} partiallySolvedInputBoard
 * @param {LoggingHelper} logging
 * @param {MarkupBuilder} markupBuilder
 * @param {PreemptiveSetBuilder} preemptiveSetBuilder
 * @param {MarkupSolver} markupSolver
 * @param {PreemptiveSetSolver} preemptiveSetSolver
 * @param {SolutionValidator} solutionValidator
 * @param {BoardValidator} boardValidator
 * @returns {{output: number[], isPuzzleSolved: boolean, isBoardValid: boolean, isBoardChanged: boolean, board: number[][]}}
 */
function solveBoardWithBacktracking({
  partiallySolvedInputBoard,
  logging,
  markupBuilder,
  preemptiveSetBuilder,
  markupSolver,
  preemptiveSetSolver,
  solutionValidator,
  boardValidator
}) {
  logging.debug({
    moduleName: 'Engine',
    functionName: 'solveBoardWithBacktracking',
    message: 'ENTERED solveBoardWithBacktracking block'
  });

  let pristineBoard = [...partiallySolvedInputBoard];
  let board = [...pristineBoard];
  let isPuzzleSolved = false;
  let isBoardValid = false;
  let isBoardChanged = false;
  let stack = new StackHelper();

  let markup = markupBuilder.withBoard(board).build();
  const {
    cell: seedMarkupCell,
    rowIndex: seedMarkupCellRowIndex,
    columnIndex: seedMarkupCellColumnIndex,
    values: seedMarkupCellValues
  } = getFirstMarkupWithLessNumberOfValues(markup);

  logging.debug({
    moduleName: 'Engine',
    functionName: 'solveBoardWithBacktracking',
    message: 'Seed markup cell for backtracking',
    data: {
      cell: seedMarkupCell,
      rowIndex: seedMarkupCellRowIndex,
      columnIndex: seedMarkupCellColumnIndex,
      values: seedMarkupCellValues
    }
  });

  for (let seedIndex = 0; seedIndex < seedMarkupCellValues.length; seedIndex++) {
    board = [...pristineBoard];

    logging.debug({
      moduleName: 'Engine',
      functionName: 'solveBoardWithBacktracking',
      message: 'Pushing into stack',
      data: {
        cell: seedMarkupCell,
        rowIndex: seedMarkupCellRowIndex,
        columnIndex: seedMarkupCellColumnIndex,
        value: seedMarkupCellValues[seedIndex]
      }
    });

    stack.push({
      cell: seedMarkupCell,
      rowIndex: seedMarkupCellRowIndex,
      columnIndex: seedMarkupCellColumnIndex,
      value: seedMarkupCellValues[seedIndex],
      board: JSON.stringify(board)
    });

    while (!isPuzzleSolved) {
      const {
        rowIndex: stackRowIndex,
        columnIndex: stackColumnIndex,
        value: stackValue,
        board: stackBoard
      } = stack.pop();

      logging.debug({
        moduleName: 'Engine',
        functionName: 'solveBoardWithBacktracking',
        message: 'Popping from stack',
        data: { stackRowIndex, stackColumnIndex, stackValue, stackBoard }
      });

      board = [...JSON.parse(stackBoard)];
      board[stackRowIndex][stackColumnIndex] = stackValue;

      logging.debug({
        moduleName: 'Engine',
        functionName: 'solveBoardWithBacktracking',
        message: 'Board updated using data from stack',
        data: board
      });

      const solveBoardResult = solveBoard({
        inputBoard: board,
        logging,
        markupBuilder,
        preemptiveSetBuilder,
        markupSolver,
        preemptiveSetSolver,
        solutionValidator,
        boardValidator
      });

      isPuzzleSolved = solveBoardResult.isPuzzleSolved;

      if (solveBoardResult.isPuzzleSolved) {
        logging.debug({
          moduleName: 'Engine',
          functionName: 'solveBoardWithBacktracking',
          message: 'EXITING solveBoardWithBacktracking block'
        });

        return solveBoardResult;
      }

      if (solveBoardResult.isBoardValid) {
        board = [...solveBoardResult.board];

        logging.debug({
          moduleName: 'Engine',
          functionName: 'solveBoardWithBacktracking',
          message: 'Board is valid but not solved yet so picking new seed markup cell'
        });

        markup = markupBuilder.withBoard(board).build();
        const {
          cell: newSeedMarkupCell,
          rowIndex: newSeedMarkupCellRowIndex,
          columnIndex: newSeedMarkupCellColumnIndex,
          values: newSeedMarkupCellValues
        } = getFirstMarkupWithLessNumberOfValues(markup);

        logging.debug({
          moduleName: 'Engine',
          functionName: 'solveBoardWithBacktracking',
          message: 'Seed markup cell for backtracking',
          data: {
            cell: newSeedMarkupCell,
            rowIndex: newSeedMarkupCellRowIndex,
            columnIndex: newSeedMarkupCellColumnIndex,
            values: newSeedMarkupCellValues
          }
        });

        newSeedMarkupCellValues.forEach(value => {
          logging.debug({
            moduleName: 'Engine',
            functionName: 'solveBoardWithBacktracking',
            message: 'Pushing into stack',
            data: {
              cell: newSeedMarkupCell,
              rowIndex: newSeedMarkupCellRowIndex,
              columnIndex: newSeedMarkupCellColumnIndex,
              value
            }
          });

          stack.push({
            cell: newSeedMarkupCell,
            rowIndex: newSeedMarkupCellRowIndex,
            columnIndex: newSeedMarkupCellColumnIndex,
            value,
            board: JSON.stringify(board)
          });
        });
      } else {
        if (stack.size() === 0) {
          break;
        }
      }
    }
  }

  logging.debug({
    moduleName: 'Engine',
    functionName: 'solveBoardWithBacktracking',
    message: 'EXITING solveBoardWithBacktracking block'
  });

  return {
    isPuzzleSolved,
    isBoardValid,
    isBoardChanged,
    board,
    output: getOutputArrayFromBoard(board)
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
  const boardValidator = new BoardValidator();

  const { isPuzzleSolved, output, board } = solveBoard({
    inputBoard,
    logging,
    markupBuilder,
    preemptiveSetBuilder,
    markupSolver,
    preemptiveSetSolver,
    solutionValidator,
    boardValidator
  });

  if (!isPuzzleSolved) {
    logging.debug({
      moduleName: 'Engine',
      functionName: 'engine',
      message: 'ENTERED engine solve board by backtracking block'
    });

    const backtrackingResult = solveBoardWithBacktracking({
      partiallySolvedInputBoard: board,
      logging,
      markupBuilder,
      preemptiveSetBuilder,
      markupSolver,
      preemptiveSetSolver,
      solutionValidator,
      boardValidator
    });

    logging.debug({
      moduleName: 'Engine',
      functionName: 'engine',
      message: 'EXITING engine solve board by backtracking block'
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
