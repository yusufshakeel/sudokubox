'use strict';

const {
  isRowPreemptiveSet,
  getRowMarkup,
  getMarkupCellIndices,
  omitMarkup,
  isColumnPreemptiveSet,
  getColumnMarkup,
  isSubBoardPreemptiveSet,
  getSubBoardMarkup,
  updateBoardMarkupUsingPreemptiveSet
} = require('../helpers');
const { isEmpty } = require('../helpers/helper');

function PreemptiveSetSolver(config) {
  const { logging } = config;

  this.solve = (preemptiveSets, markup) => {
    logging.debug({
      moduleName: 'PreemptiveSetSolver',
      functionName: 'solve',
      message: 'ENTERED solve block'
    });

    let boardMarkup = { ...markup };

    preemptiveSets.forEach(preemptiveSet => {
      if (isRowPreemptiveSet(preemptiveSet)) {
        logging.debug({
          moduleName: 'PreemptiveSetSolver',
          functionName: 'solve',
          message: 'ENTERED isRowPreemptiveSet block',
          preemptiveSet
        });

        const { rowIndex } = getMarkupCellIndices(preemptiveSet.cells[0]);
        const rowMarkup = getRowMarkup(rowIndex, boardMarkup);
        const markupAfterOmittingPreemptiveSetCells = omitMarkup(preemptiveSet.cells, rowMarkup);
        if (!isEmpty(markupAfterOmittingPreemptiveSetCells)) {
          boardMarkup = updateBoardMarkupUsingPreemptiveSet(
            boardMarkup,
            preemptiveSet,
            markupAfterOmittingPreemptiveSetCells
          );

          logging.debug({
            moduleName: 'PreemptiveSetSolver',
            functionName: 'solve',
            message: 'EXITING isRowPreemptiveSet block',
            preemptiveSet,
            markupAfterOmittingPreemptiveSetCells,
            boardMarkup
          });
        }
      }

      if (isColumnPreemptiveSet(preemptiveSet)) {
        logging.debug({
          moduleName: 'PreemptiveSetSolver',
          functionName: 'solve',
          message: 'ENTERED isColumnPreemptiveSet block',
          preemptiveSet
        });

        const { columnIndex } = getMarkupCellIndices(preemptiveSet.cells[0]);
        const columnMarkup = getColumnMarkup(columnIndex, boardMarkup);
        const markupAfterOmittingPreemptiveSetCells = omitMarkup(preemptiveSet.cells, columnMarkup);
        if (!isEmpty(markupAfterOmittingPreemptiveSetCells)) {
          boardMarkup = updateBoardMarkupUsingPreemptiveSet(
            boardMarkup,
            preemptiveSet,
            markupAfterOmittingPreemptiveSetCells
          );

          logging.debug({
            moduleName: 'PreemptiveSetSolver',
            functionName: 'solve',
            message: 'EXITING isColumnPreemptiveSet block',
            preemptiveSet,
            markupAfterOmittingPreemptiveSetCells,
            boardMarkup
          });
        }
      }

      if (isSubBoardPreemptiveSet(preemptiveSet)) {
        logging.debug({
          moduleName: 'PreemptiveSetSolver',
          functionName: 'solve',
          message: 'ENTERED isSubBoardPreemptiveSet block',
          preemptiveSet
        });

        const { rowIndex, columnIndex } = getMarkupCellIndices(preemptiveSet.cells[0]);
        const subBoardMarkup = getSubBoardMarkup(rowIndex, columnIndex, boardMarkup);
        const markupAfterOmittingPreemptiveSetCells = omitMarkup(
          preemptiveSet.cells,
          subBoardMarkup
        );
        if (!isEmpty(markupAfterOmittingPreemptiveSetCells)) {
          boardMarkup = updateBoardMarkupUsingPreemptiveSet(
            boardMarkup,
            preemptiveSet,
            markupAfterOmittingPreemptiveSetCells
          );

          logging.debug({
            moduleName: 'PreemptiveSetSolver',
            functionName: 'solve',
            message: 'EXITING isSubBoardPreemptiveSet block',
            preemptiveSet,
            markupAfterOmittingPreemptiveSetCells,
            boardMarkup
          });
        }
      }
    });

    logging.debug({ moduleName: 'PreemptiveSetSolver', functionName: 'solve', boardMarkup });
    return boardMarkup;
  };
}

module.exports = PreemptiveSetSolver;
