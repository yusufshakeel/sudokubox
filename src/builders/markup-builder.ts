import CONSTANTS from '../constants';
import helpers from '../helpers';
import { BoardType } from '../ts-def/board-type';
const { EMPTY_CELL } = CONSTANTS;
const { getMarkup } = helpers;

export default class MarkupBuilder {
  private logging;
  private board!: BoardType;

  constructor(config: any) {
    this.logging = config.logging;
  }

  public withBoard(board: BoardType) {
    this.board = board;
    return this;
  }

  public build() {
    this.logging.debug({
      moduleName: 'MarkupBuilder',
      functionName: 'build',
      message: 'ENTERED build block',
      board: this.board
    });

    const markup = this.board.reduce((result, row, rowIndex) => {
      const rowResult = row.reduce((rowResult, cell, columnIndex) => {
        if (cell === EMPTY_CELL) {
          return {
            ...rowResult,
            [`${rowIndex},${columnIndex}`]: getMarkup(rowIndex, columnIndex, this.board)
          };
        }

        return rowResult;
      }, {});

      return { ...result, ...rowResult };
    }, {});

    this.logging.debug({ moduleName: 'MarkupBuilder', functionName: 'build', markup });
    return markup;
  }
}