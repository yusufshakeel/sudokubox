import CONSTANTS from '../constants';
import { InputType } from '../ts-def/input-type';
import { BoardType } from '../ts-def/board-type';
import { RowType } from '../ts-def/row-type';

const { TOTAL_ROWS } = CONSTANTS;

export default class BoardBuilder {
  private input: InputType;

  constructor(input: InputType) {
    this.input = input;
  }

  private isNewRow(index: number) {
    return (index + 1) % TOTAL_ROWS === 0;
  }

  public build() {
    const { board } = this.input.reduce(
      (result, current, index) => {
        const row = [...result.row, current];
        return this.isNewRow(index)
          ? { board: [...result.board, row], row: [] }
          : { ...result, row };
      },
      { board: [], row: [] } as { board: BoardType, row: RowType }
    );
    return board;
  }
}