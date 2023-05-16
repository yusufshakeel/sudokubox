import CONSTANTS from '../constants';
import BoardBuilder from './board-builder';
import BoardValidator from '../validators/board-validator';
import helpers from '../helpers';

const { TOTAL_ROWS, TOTAL_COLUMNS, RANDOM_BOARD } = CONSTANTS;
const { getRandomInteger } = helpers;
const boardValidator = new BoardValidator();

export default class RandomBoardBuilder {
  private logging;

  constructor(config: any) {
    this.logging = config.logging;
  }

  public build() {
    this.logging.debug({
      moduleName: 'RandomBoardBuilder',
      functionName: 'build',
      message: 'ENTERED build block'
    });

    const totalNumberOfCells = TOTAL_ROWS * TOTAL_COLUMNS;
    const totalCellsToFill = getRandomInteger(
      RANDOM_BOARD.MINIMUM_NUMBER_OF_CELLS_TO_FILL,
      RANDOM_BOARD.MAXIMUM_NUMBER_OF_CELLS_TO_FILL
    );

    let puzzle = Array(totalNumberOfCells).fill(0);
    let board = new BoardBuilder(puzzle).build();
    const positionThatCanBeFilled = new Set(Array.from(Array(totalNumberOfCells).keys()));

    const totalCellsFilled = (puzzle: number[]) => puzzle.filter(v => v !== 0).length;
    const getRandomValue = () => getRandomInteger(1, 9);
    const getRandomIndex = () => getRandomInteger(0, positionThatCanBeFilled.size - 1);

    let index = getRandomIndex();
    let value = getRandomValue();
    puzzle[index] = value;
    positionThatCanBeFilled.delete(index);

    while (totalCellsFilled(puzzle) < totalCellsToFill) {
      const newPuzzle = [...puzzle];
      index = getRandomIndex();
      value = getRandomValue();
      newPuzzle[index] = value;
      board = new BoardBuilder(newPuzzle).build();
      if (boardValidator.isValid(board)) {
        puzzle = [...newPuzzle];
        positionThatCanBeFilled.delete(index);
      }
    }

    this.logging.debug({
      moduleName: 'RandomBoardBuilder',
      functionName: 'build',
      message: 'EXITING build block'
    });

    return {
      puzzle,
      board,
      totalCellsFilled: totalCellsToFill
    };
  }
}