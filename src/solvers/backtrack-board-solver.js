'use strict';

const StackHelper = require('../helpers/stack-helper');
const { getFirstMarkupWithLessNumberOfValues, getOutputArrayFromBoard } = require('../helpers');

function BacktrackBoardSolver({ logging, markupBuilder, boardSolver }) {
  this.solve = partiallySolvedInputBoard => {
    logging.debug({
      moduleName: 'BacktrackBoardSolver',
      functionName: 'solve',
      message: 'ENTERED solve block'
    });

    let pristineBoard = [...partiallySolvedInputBoard];
    let board = [...pristineBoard];
    let isPuzzleSolved = false;
    let isBoardValid = false;
    let isBoardChanged = false;
    let stack = new StackHelper();

    let markup = markupBuilder.withBoard(board).build();
    const {
      rowIndex: seedMarkupCellRowIndex,
      columnIndex: seedMarkupCellColumnIndex,
      values: seedMarkupCellValues
    } = getFirstMarkupWithLessNumberOfValues(markup);

    logging.debug({
      moduleName: 'BacktrackBoardSolver',
      functionName: 'solve',
      message: 'Seed markup cell for backtracking',
      data: {
        rowIndex: seedMarkupCellRowIndex,
        columnIndex: seedMarkupCellColumnIndex,
        values: seedMarkupCellValues
      }
    });

    for (let seedIndex = 0; seedIndex < seedMarkupCellValues.length; seedIndex++) {
      board = [...pristineBoard];

      const boardToPushIntoStack = JSON.stringify(board);

      logging.debug({
        moduleName: 'BacktrackBoardSolver',
        functionName: 'solve',
        message: 'Pushing into stack',
        data: {
          rowIndex: seedMarkupCellRowIndex,
          columnIndex: seedMarkupCellColumnIndex,
          value: seedMarkupCellValues[seedIndex],
          board: boardToPushIntoStack
        }
      });

      stack.push({
        rowIndex: seedMarkupCellRowIndex,
        columnIndex: seedMarkupCellColumnIndex,
        value: seedMarkupCellValues[seedIndex],
        board: boardToPushIntoStack
      });

      while (!isPuzzleSolved) {
        const {
          rowIndex: rowIndexFromStack,
          columnIndex: columnIndexFromStack,
          value: cellValueFromStack,
          board: boardFromStack
        } = stack.pop();

        logging.debug({
          moduleName: 'BacktrackBoardSolver',
          functionName: 'solve',
          message: 'Popped from stack',
          data: { rowIndexFromStack, columnIndexFromStack, cellValueFromStack, boardFromStack }
        });

        board = [...JSON.parse(boardFromStack)];
        board[rowIndexFromStack][columnIndexFromStack] = cellValueFromStack;

        logging.debug({
          moduleName: 'BacktrackBoardSolver',
          functionName: 'solve',
          message: 'Board after updating cell using value from stack',
          data: { rowIndexFromStack, columnIndexFromStack, cellValueFromStack, updatedBoard: board }
        });

        const solveBoardResult = boardSolver.solve(board);

        isPuzzleSolved = solveBoardResult.isPuzzleSolved;

        if (isPuzzleSolved) {
          logging.debug({
            moduleName: 'BacktrackBoardSolver',
            functionName: 'solve',
            message: 'EXITING solve block'
          });

          return solveBoardResult;
        }

        if (solveBoardResult.isBoardValid) {
          board = [...solveBoardResult.board];

          logging.debug({
            moduleName: 'BacktrackBoardSolver',
            functionName: 'solve',
            message: 'Board is valid but not yet solved so selecting a new seed markup cell'
          });

          markup = markupBuilder.withBoard(board).build();
          const {
            rowIndex: newSeedMarkupCellRowIndex,
            columnIndex: newSeedMarkupCellColumnIndex,
            values: newSeedMarkupCellValues
          } = getFirstMarkupWithLessNumberOfValues(markup);

          logging.debug({
            moduleName: 'BacktrackBoardSolver',
            functionName: 'solve',
            message: 'Seed markup cell for backtracking',
            data: {
              rowIndex: newSeedMarkupCellRowIndex,
              columnIndex: newSeedMarkupCellColumnIndex,
              values: newSeedMarkupCellValues
            }
          });

          newSeedMarkupCellValues.forEach(value => {
            const boardToSaveIntoStack = JSON.stringify(board);

            logging.debug({
              moduleName: 'BacktrackBoardSolver',
              functionName: 'solve',
              message: 'Pushing into stack',
              data: {
                rowIndex: newSeedMarkupCellRowIndex,
                columnIndex: newSeedMarkupCellColumnIndex,
                value,
                board: boardToSaveIntoStack
              }
            });

            stack.push({
              rowIndex: newSeedMarkupCellRowIndex,
              columnIndex: newSeedMarkupCellColumnIndex,
              value,
              board: boardToSaveIntoStack
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
      moduleName: 'BacktrackBoardSolver',
      functionName: 'solve',
      message: 'EXITING solve block'
    });

    return {
      isPuzzleSolved,
      isBoardValid,
      isBoardChanged,
      board,
      output: getOutputArrayFromBoard(board)
    };
  };
}

module.exports = BacktrackBoardSolver;
