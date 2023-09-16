import helpers from '../helpers';
import { BoardType } from '../ts-def/board-type';
const { getOutputArrayFromBoard } = helpers;

export default class BoardSolver {
  private logging;
  private markupBuilder;
  private preemptiveSetBuilder;
  private markupSolver;
  private preemptiveSetSolver;
  private solutionValidator;
  private boardValidator;

  // eslint-disable-next-line
  constructor(config: any) {
    this.logging = config.logging;
    this.markupBuilder = config.markupBuilder;
    this.preemptiveSetBuilder = config.preemptiveSetBuilder;
    this.markupSolver = config.markupSolver;
    this.preemptiveSetSolver = config.preemptiveSetSolver;
    this.solutionValidator = config.solutionValidator;
    this.boardValidator = config.boardValidator;
  }

  public solve(inputBoard: BoardType) {
    this.logging.debug({
      moduleName: 'BoardSolver',
      functionName: 'solve',
      message: 'ENTERED solve block'
    });

    let board = [...inputBoard];
    let isPuzzleSolved = false;
    let isBoardValid = false;
    let isBoardChanged = false;

    while (!isPuzzleSolved) {
      const markup = this.markupBuilder.withBoard(board).build();
      const preemptiveSets = this.preemptiveSetBuilder.withMarkup(markup).build();
      const updatedMarkup = this.preemptiveSetSolver.solve(preemptiveSets, markup);
      const {
        isBoardChanged: markSolverBoardChanged,
        board: enrichedBoard
      } = this.markupSolver.solve(
        updatedMarkup,
        board
      );

      isBoardValid = this.boardValidator.isValid(enrichedBoard);
      isBoardChanged = markSolverBoardChanged;

      if (!isBoardValid) {
        this.logging.debug({
          moduleName: 'BoardSolver',
          functionName: 'solve',
          message: 'Board is not valid'
        });

        this.logging.debug({
          moduleName: 'BoardSolver',
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

      isPuzzleSolved = this.solutionValidator.isSolved(enrichedBoard);

      board = [...enrichedBoard];

      if (isPuzzleSolved) {
        break;
      }

      if (!isBoardChanged) {
        break;
      }
    }

    this.logging.debug({
      moduleName: 'BoardSolver',
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