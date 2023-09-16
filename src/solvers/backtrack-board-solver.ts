import StackHelper from '../helpers/stack-helper';
import helpers from '../helpers';
import { BoardType } from '../ts-def/board-type';

const { getFirstMarkupWithLessNumberOfValues, getOutputArrayFromBoard } = helpers;

export default class BacktrackBoardSolver {
  private logging;
  private markupBuilder;
  private boardSolver;

  // eslint-disable-next-line
  constructor(config: any) {
    this.logging = config.logging;
    this.markupBuilder = config.markupBuilder;
    this.boardSolver = config.boardSolver;
  }

  public solve(partiallySolvedInputBoard: BoardType) {
    this.logging.debug({
      moduleName: 'BacktrackBoardSolver',
      functionName: 'solve',
      message: 'ENTERED solve block'
    });

    const pristineBoard = [...partiallySolvedInputBoard];
    let board = [...pristineBoard];
    let isPuzzleSolved = false;
    const isBoardValid = false;
    const isBoardChanged = false;
    const stack = new StackHelper();

    let markup = this.markupBuilder.withBoard(board).build();
    const {
      rowIndex: seedMarkupCellRowIndex,
      columnIndex: seedMarkupCellColumnIndex,
      values: seedMarkupCellValues
    } = getFirstMarkupWithLessNumberOfValues(markup);

    this.logging.debug({
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

      this.logging.debug({
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

        this.logging.debug({
          moduleName: 'BacktrackBoardSolver',
          functionName: 'solve',
          message: 'Popped from stack',
          data: { rowIndexFromStack, columnIndexFromStack, cellValueFromStack, boardFromStack }
        });

        board = [...JSON.parse(boardFromStack)];
        board[rowIndexFromStack][columnIndexFromStack] = cellValueFromStack;

        this.logging.debug({
          moduleName: 'BacktrackBoardSolver',
          functionName: 'solve',
          message: 'Board after updating cell using value from stack',
          data: { rowIndexFromStack, columnIndexFromStack, cellValueFromStack, updatedBoard: board }
        });

        const solveBoardResult = this.boardSolver.solve(board);

        isPuzzleSolved = solveBoardResult.isPuzzleSolved;

        if (isPuzzleSolved) {
          this.logging.debug({
            moduleName: 'BacktrackBoardSolver',
            functionName: 'solve',
            message: 'EXITING solve block'
          });

          return solveBoardResult;
        }

        if (solveBoardResult.isBoardValid) {
          board = [...solveBoardResult.board];

          this.logging.debug({
            moduleName: 'BacktrackBoardSolver',
            functionName: 'solve',
            message: 'Board is valid but not yet solved so selecting a new seed markup cell'
          });

          markup = this.markupBuilder.withBoard(board).build();
          const {
            rowIndex: newSeedMarkupCellRowIndex,
            columnIndex: newSeedMarkupCellColumnIndex,
            values: newSeedMarkupCellValues
          } = getFirstMarkupWithLessNumberOfValues(markup);

          this.logging.debug({
            moduleName: 'BacktrackBoardSolver',
            functionName: 'solve',
            message: 'Seed markup cell for backtracking',
            data: {
              rowIndex: newSeedMarkupCellRowIndex,
              columnIndex: newSeedMarkupCellColumnIndex,
              values: newSeedMarkupCellValues
            }
          });

          newSeedMarkupCellValues.forEach((value: number) => {
            const boardToSaveIntoStack = JSON.stringify(board);

            this.logging.debug({
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

    this.logging.debug({
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
  }
}