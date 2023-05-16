import BoardBuilder from './board-builder';
import helpers from '../helpers';
import { InputType } from '../ts-def/input-type';

const { getRandomInteger } = helpers;

export default class PuzzleBuilder {
  private logging;
  private input!: InputType;
  private minNumberOfCellsToFill!: number;
  private maxNumberOfCellsToFill!: number;

  constructor(config: any) {
    this.logging = config.logging;
  }

  public withInput(input: InputType) {
    this.input = input;
    return this;
  }

  public withMinimumNumberOfCellsToFill(cellCount: number) {
    this.minNumberOfCellsToFill = cellCount;
    return this;
  }

  public withMaximumNumberOfCellsToFill(cellCount: number) {
    this.maxNumberOfCellsToFill = cellCount;
    return this;
  }

  public build() {
    this.logging.debug({
      moduleName: 'PuzzleBuilder',
      functionName: 'build',
      message: 'ENTERED build block'
    });

    const totalCellsToFill = getRandomInteger(
      this.minNumberOfCellsToFill,
      this.maxNumberOfCellsToFill
    );

    const EMPTY = 0;
    const puzzle = [...this.input];
    let board = new BoardBuilder(puzzle).build();
    const positionsThatCanBeEmptied = [...puzzle.keys()];
    const totalCellsFilled = (puzzle: number[]) => puzzle.filter(v => v !== 0).length;
    const getRandomPositionIndex =
      (positions: number[]) => getRandomInteger(0, positions.length - 1);

    let filledCells = totalCellsFilled(puzzle);
    while (filledCells > totalCellsToFill) {
      const index = positionsThatCanBeEmptied.splice(
        getRandomPositionIndex(positionsThatCanBeEmptied),
        1
      )[0];
      puzzle[index] = EMPTY;
      board = new BoardBuilder(puzzle).build();
      filledCells = totalCellsFilled(puzzle);
    }

    this.logging.debug({
      moduleName: 'PuzzleBuilder',
      functionName: 'build',
      message: 'EXITING build block'
    });

    return {
      puzzle,
      board,
      totalCellsFilled: totalCellsFilled(puzzle)
    };
  }
}