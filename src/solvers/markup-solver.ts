import helpers from '../helpers';
import { MarkupType } from '../ts-def/markup-type';
import { BoardType } from '../ts-def/board-type';
const { getMarkupCellIndices } = helpers;

export default class MarkupSolver {
  private logging;

  constructor(config: any) {
    this.logging = config.logging;
  }

  public solve(markup: MarkupType, board: BoardType) {
    this.logging.debug({
      moduleName: 'MarkupSolver',
      functionName: 'solve',
      message: 'ENTERED solve block'
    });

    let isBoardChanged = false;
    const partiallySolvedBoard = [...board];
    Object.entries(markup).forEach(([cell, value]) => {
      if (value.length === 1) {
        const { rowIndex, columnIndex } = getMarkupCellIndices(cell);
        partiallySolvedBoard[rowIndex][columnIndex] = value[0];
        isBoardChanged = true;

        this.logging.debug({
          moduleName: 'MarkupSolver',
          functionName: 'solve',
          message: 'Cell found with one markup',
          rowIndex,
          columnIndex,
          valueUsedToFillTheCell: value[0]
        });
      }
    });

    const markupSolverResult = { isBoardChanged, board: partiallySolvedBoard };
    this.logging.debug({ moduleName: 'MarkupSolver', functionName: 'solve', markupSolverResult });

    return markupSolverResult;
  }
}