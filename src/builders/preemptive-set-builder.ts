import helpers from '../helpers';
import { MarkupType } from '../ts-def/markup-type';
import { PreemptiveSetType } from '../ts-def/preemptive-set-type';

const {
  segregateMarkup,
  getMatchingMarkupByValues,
  getRowMarkup,
  getMarkupCellIndices,
  getColumnMarkup,
  getSubBoardMarkup,
  filterMarkup
} = helpers;

export default class PreemptiveSetBuilder {
  private logging;
  private markup!: MarkupType;

  // eslint-disable-next-line
  constructor(config: any) {
    this.logging = config.logging;
  }

  private preemptiveSet(values: number[], markup: MarkupType) {
    const size = values.length;
    const cells = Object.keys(markup);
    const id = cells.join('-');
    return { id, size, values, cells };
  }

  private updatePreemptiveSets(
    preemptiveSets: PreemptiveSetType[],
    values: number[],
    markup: MarkupType
  ) {
    const record = this.preemptiveSet(values, markup);
    const alreadyAdded = preemptiveSets.find(v => v.id === record.id);
    return alreadyAdded ? [...preemptiveSets] : [...preemptiveSets, record];
  };

  public withMarkup(markup: MarkupType) {
    this.markup = { ...markup };
    return this;
  }

  public build() {
    this.logging.debug({
      moduleName: 'PreemptiveSetBuilder',
      functionName: 'build',
      message: 'ENTERED build block',
      markup: this.markup
    });

    const segregatedMarkup = segregateMarkup(this.markup);

    const segregatedMarkupByValuesSize = Object.keys(segregatedMarkup)
      .map(v => parseInt(v))
      .sort();

    let preemptiveSets: PreemptiveSetType[] = [];

    segregatedMarkupByValuesSize.forEach(markupValuesSize => {
      if (markupValuesSize > 1) {
        const markupByGroupSize = segregatedMarkup[markupValuesSize];
        Object.entries(markupByGroupSize).forEach(current => {
          const [currentCell, currentCellValues] = current;

          const { rowIndex: currentCellRowIndex, columnIndex: currentCellColumnIndex } =
            getMarkupCellIndices(currentCell);

          const matchingMarkupCells = getMatchingMarkupByValues(
            currentCellValues,
            markupByGroupSize
          );

          const filteredMarkup = filterMarkup(matchingMarkupCells, markupByGroupSize);

          const rowMarkup = getRowMarkup(currentCellRowIndex, filteredMarkup);

          const columnMarkup = getColumnMarkup(currentCellColumnIndex, filteredMarkup);

          const subBoardMarkup = getSubBoardMarkup(
            currentCellRowIndex,
            currentCellColumnIndex,
            filteredMarkup
          );

          if (Object.keys(rowMarkup).length === markupValuesSize) {
            preemptiveSets = this.updatePreemptiveSets(
              preemptiveSets,
              currentCellValues,
              rowMarkup
            );
          }
          if (Object.keys(columnMarkup).length === markupValuesSize) {
            preemptiveSets = this.updatePreemptiveSets(
              preemptiveSets,
              currentCellValues,
              columnMarkup
            );
          }
          if (Object.keys(subBoardMarkup).length === markupValuesSize) {
            preemptiveSets = this.updatePreemptiveSets(
              preemptiveSets,
              currentCellValues,
              subBoardMarkup
            );
          }
        });
      }
    });

    this.logging.debug({
      moduleName: 'PreemptiveSetBuilder',
      functionName: 'build',
      preemptiveSets
    });

    return preemptiveSets;
  }
}