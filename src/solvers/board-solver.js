'use strict';

const { getOutputArrayFromBoard } = require('../helpers');

function BoardSolver({
  logging,
  markupBuilder,
  preemptiveSetBuilder,
  markupSolver,
  preemptiveSetSolver,
  solutionValidator,
  boardValidator
}) {
  this.solve = inputBoard => {
    logging.debug({
      moduleName: 'BoardSolver',
      functionName: 'solve',
      message: 'ENTERED solve block'
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
          moduleName: 'BoardSolver',
          functionName: 'solve',
          message: 'Board is not valid'
        });

        logging.debug({
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
  };
}

module.exports = BoardSolver;
