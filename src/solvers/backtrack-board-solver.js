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
      cell: seedMarkupCell,
      rowIndex: seedMarkupCellRowIndex,
      columnIndex: seedMarkupCellColumnIndex,
      values: seedMarkupCellValues
    } = getFirstMarkupWithLessNumberOfValues(markup);

    logging.debug({
      moduleName: 'BacktrackBoardSolver',
      functionName: 'solve',
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
        moduleName: 'BacktrackBoardSolver',
        functionName: 'solve',
        message: 'Pushing into stack',
        data: {
          cell: seedMarkupCell,
          rowIndex: seedMarkupCellRowIndex,
          columnIndex: seedMarkupCellColumnIndex,
          value: seedMarkupCellValues[seedIndex]
        }
      });

      stack.push({
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
          moduleName: 'BacktrackBoardSolver',
          functionName: 'solve',
          message: 'Popped from stack',
          data: { stackRowIndex, stackColumnIndex, stackValue, stackBoard }
        });

        board = [...JSON.parse(stackBoard)];
        board[stackRowIndex][stackColumnIndex] = stackValue;

        logging.debug({
          moduleName: 'BacktrackBoardSolver',
          functionName: 'solve',
          message: 'Board updated using data from stack',
          data: board
        });

        const solveBoardResult = boardSolver.solve(board);

        isPuzzleSolved = solveBoardResult.isPuzzleSolved;

        if (solveBoardResult.isPuzzleSolved) {
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
            moduleName: 'BacktrackBoardSolver',
            functionName: 'solve',
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
              moduleName: 'BacktrackBoardSolver',
              functionName: 'solve',
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
