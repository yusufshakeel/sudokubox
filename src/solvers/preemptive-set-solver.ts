import helpers from '../helpers';
import { isEmpty } from '../helpers/helper';
import { PreemptiveSetType } from '../ts-def/preemptive-set-type';
import { MarkupType } from '../ts-def/markup-type';

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
} = helpers;

export default class PreemptiveSetSolver {
  private logging;

  // eslint-disable-next-line
  constructor(config: any) {
    this.logging = config.logging;
  }

  public solve(preemptiveSets: PreemptiveSetType[], markup: MarkupType) {
    this.logging.debug({
      moduleName: 'PreemptiveSetSolver',
      functionName: 'solve',
      message: 'ENTERED solve block'
    });

    let boardMarkup = { ...markup };

    preemptiveSets.forEach(preemptiveSet => {
      if (isRowPreemptiveSet(preemptiveSet)) {
        this.logging.debug({
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

          this.logging.debug({
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
        this.logging.debug({
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

          this.logging.debug({
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
        this.logging.debug({
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

          this.logging.debug({
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

    this.logging.debug({ moduleName: 'PreemptiveSetSolver', functionName: 'solve', boardMarkup });
    return boardMarkup;
  }
}