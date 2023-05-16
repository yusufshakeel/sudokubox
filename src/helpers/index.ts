import CONSTANTS from '../constants';
import { arrayEquals } from './helper';
import { CellsType } from '../ts-def/cells-type';
import { MarkupType } from '../ts-def/markup-type';
import { BoardType } from '../ts-def/board-type';
import { RowType } from '../ts-def/row-type';
import { ColumnType } from '../ts-def/column-type';
import { PreemptiveSetType } from '../ts-def/preemptive-set-type';

const {
  TOTAL_ROWS_IN_SUB_BOARD,
  TOTAL_COLUMNS_IN_SUB_BOARD,
  TOTAL_COLUMNS
} = CONSTANTS;

/**
 * This will omit the provided cells from the markup.
 * @param {string[]} cells
 * @param {{string: [number]}} markup This will be something like { "r,c": [1,2,...] }
 * @returns {{string: [number]}}
 */
function omitMarkup(cells: CellsType, markup: MarkupType) {
  return Object.entries(markup).reduce((result, current) => {
    const [cell, values] = current;
    return cells.includes(cell) ? result : { ...result, [cell]: values };
  }, {} as MarkupType);
}

/**
 * This will return filtered markup based on the cells provided.
 * @param {[string]} cells This will be something like ["r,c", ...]
 * @param {{string: [number]}} markup This will be something like { "r,c": [1,2,...] }
 * @returns {*}
 */
const filterMarkup = (cells: CellsType, markup: MarkupType) => {
  return cells.reduce((result, cell) => {
    return markup[cell] ? { ...result, [cell]: markup[cell] } : result;
  }, {} as MarkupType);
};

/**
 * This will return the filtered array.
 * @param {number[]} array The array can be a row or column.
 * @param {number} indexToSkip The index in the array to skip.
 * @returns {number[]}
 */
const filteredArray = (array: number[], indexToSkip: number) => {
  return array.reduce((result, current, index) => {
    return index === indexToSkip ? result : [...result, current];
  }, [] as number[]);
};

/**
 * This will return row of numbers.
 * @param {number} rowIndex The row index of the board to select.
 * @param {number[][]} board The sudoku board.
 * @returns {number[]}
 */
function getRow(rowIndex: number, board: BoardType): RowType {
  return board[rowIndex];
}

/**
 * This will return column of numbers.
 * @param {number} columnIndex The column index of the board to select.
 * @param {number[][]} board The sudoku board.
 * @returns {number[]}
 */
function getColumn(columnIndex: number, board: BoardType): ColumnType {
  return board.reduce((result, row) => [...result, row[columnIndex]], [] as ColumnType);
}

/**
 * This will return sub board as one dimensional array.
 * @param {number} rowIndex
 * @param {number} columnIndex
 * @param {number[][]} board
 * @returns {number[]}
 */
function getSubBoard(rowIndex: number, columnIndex: number, board: BoardType) {
  const { rowStartIndex, rowEndIndex, columnStartIndex, columnEndIndex } = getSubBoardIndices(
    rowIndex,
    columnIndex
  );
  return getSubBoardAsOneDimensionalArray(
    rowStartIndex,
    rowEndIndex,
    columnStartIndex,
    columnEndIndex,
    board
  );
}

/**
 * This will return true if value is unique in row.
 * @param {number} value The value to check in the row.
 * @param {number} columnIndex The column index of the value.
 * @param {number[]} row The row to check.
 * @returns {boolean}
 */
function isUniqueValueInRow(value: number, columnIndex: number, row: RowType) {
  return !filteredArray(row, columnIndex).includes(value);
}

/**
 * This will return true if value is unique in column.
 * @param {number} value The value to check in the column.
 * @param {number} rowIndex The row index of the value.
 * @param {number[]} column The column to check.
 * @returns {boolean}
 */
function isUniqueValueInColumn(value: number, rowIndex: number, column: ColumnType) {
  return !filteredArray(column, rowIndex).includes(value);
}

/**
 * This will return the sub board indices in which the given rowIndex and columnIndex falls.
 *
 * Example: If rowIndex is 1 and columnIndex 1 then the cell(1,1) is inside the top-left sub board.
 *
 * Therefore, the sub board indices that will be returned is row [0, 2] and column [0, 2] both
 * inclusive.
 *
 * @param {number} rowIndex The row index of the board.
 * @param {number} columnIndex The column index of the board.
 * @returns {{rowStartIndex: number, columnEndIndex: number, rowEndIndex: number, columnStartIndex: number}}
 */
function getSubBoardIndices(rowIndex: number, columnIndex: number) {
  const rowStartIndex = Math.floor(rowIndex / TOTAL_ROWS_IN_SUB_BOARD) * TOTAL_ROWS_IN_SUB_BOARD;
  const rowEndIndex = rowStartIndex + TOTAL_ROWS_IN_SUB_BOARD - 1;
  const columnStartIndex =
    Math.floor(columnIndex / TOTAL_COLUMNS_IN_SUB_BOARD) * TOTAL_COLUMNS_IN_SUB_BOARD;
  const columnEndIndex = columnStartIndex + TOTAL_COLUMNS_IN_SUB_BOARD - 1;
  return {
    rowStartIndex,
    rowEndIndex,
    columnStartIndex,
    columnEndIndex
  };
}

/**
 * This will return the sub board as a one dimensional array.
 * @param {number} rowStartIndex
 * @param {number} rowEndIndex
 * @param {number} columnStartIndex
 * @param {number} columnEndIndex
 * @param {number[][]} board
 * @returns {number[]}
 */
function getSubBoardAsOneDimensionalArray(
  rowStartIndex: number,
  rowEndIndex: number,
  columnStartIndex: number,
  columnEndIndex: number,
  board: BoardType
) {
  const array: number[] = [];
  for (let rowIndex = rowStartIndex; rowIndex <= rowEndIndex; rowIndex++) {
    for (let columnIndex = columnStartIndex; columnIndex <= columnEndIndex; columnIndex++) {
      array.push(board[rowIndex][columnIndex]);
    }
  }
  return array;
}

/**
 * This will return true if value is unique in the sub board, false otherwise.
 * @param {number} value The value to check in the sub board.
 * @param {number} rowIndex The row index of the value in the board.
 * @param {number} columnIndex The column index of the value in the board.
 * @param {number[][]} board The sudoku board.
 * @returns {boolean}
 */
function isUniqueValueInSubBoard(
  value: number,
  rowIndex: number,
  columnIndex: number,
  board: BoardType
) {
  const subBoardAsOneDimensionalArray = getSubBoard(rowIndex, columnIndex, board);

  const valueIndexToSkip =
    (rowIndex % TOTAL_ROWS_IN_SUB_BOARD) * TOTAL_ROWS_IN_SUB_BOARD +
    (columnIndex % TOTAL_COLUMNS_IN_SUB_BOARD);

  return !filteredArray(subBoardAsOneDimensionalArray, valueIndexToSkip).includes(value);
}

/**
 * This will return the markup of an empty cell. It is an array of numbers that the cell can have.
 * @param {number} rowIndex Row index of the cell.
 * @param {number} columnIndex Column index of the cell.
 * @param {number[][]} board The sudoku board.
 * @returns {number[]}
 */
function getMarkup(rowIndex: number, columnIndex: number, board: BoardType) {
  const row = board[rowIndex];
  const column = getColumn(columnIndex, board);
  const { rowStartIndex, rowEndIndex, columnStartIndex, columnEndIndex } = getSubBoardIndices(
    rowIndex,
    columnIndex
  );
  const subBoardAsOneDimensionalArray = getSubBoardAsOneDimensionalArray(
    rowStartIndex,
    rowEndIndex,
    columnStartIndex,
    columnEndIndex,
    board
  );

  const markupValues: number[] = [];
  for (let value = 1; value <= TOTAL_COLUMNS; value++) {
    if (
      !row.includes(value) &&
      !column.includes(value) &&
      !subBoardAsOneDimensionalArray.includes(value)
    ) {
      markupValues.push(value);
    }
  }
  return markupValues;
}

/**
 * This will return the markup cell indices.
 * @param {string} cell This is the cell in format 'row,col'.
 * @returns {{rowIndex: number, columnIndex: number}}
 */
function getMarkupCellIndices(cell: string) {
  const [rowIndex, columnIndex] = cell.split(',').map(index => parseInt(index));
  return { rowIndex, columnIndex };
}

/**
 * This will return a one dimensional output array from the two dimensional board array.
 * @param {number[][]} board
 * @returns {number[]}
 */
function getOutputArrayFromBoard(board: BoardType) {
  return board
    .join()
    .split(',')
    .map(value => parseInt(value));
}

/**
 * This will return markups found along the given row.
 * @param {number} rowIndex
 * @param {{string: [number]}} markup This will be like { "r,c": [1,2,...] }
 * @returns {{string: [number]}}
 */
function getRowMarkup(rowIndex: number, markup: MarkupType) {
  const cells = Object.keys(markup).filter(cell => {
    const { rowIndex: markupCellRowIndex } = getMarkupCellIndices(cell);
    return rowIndex === markupCellRowIndex;
  });
  return filterMarkup(cells, markup);
}

/**
 * This will return markups found along the given column.
 * @param {number} columnIndex
 * @param {{string: [number]}} markup This will be like { "r,c": [1,2,...] }
 * @returns {{string: [number]}}
 */
function getColumnMarkup(columnIndex: number, markup: MarkupType) {
  const cells = Object.keys(markup).filter(cell => {
    const { columnIndex: markupCellColumnIndex } = getMarkupCellIndices(cell);
    return columnIndex === markupCellColumnIndex;
  });
  return filterMarkup(cells, markup);
}

/**
 * This will return markups found within a given sub board with respect to the rowIndex and
 * columnIndex provided.
 *
 * Example: If rowIndex is 1 and columnIndex is 0 then the cell(1,0) is inside top-left sub board.
 *
 * Therefore, this function will return markups found inside the top-left sub board.
 *
 * @param {number} rowIndex The row index of a cell in the board.
 * @param {number} columnIndex The column index of a cell in the board.
 * @param {{string: [number]}} markup This will be like { "r,c": [1,2,...] }
 * @returns {{string: [number]}}
 */
function getSubBoardMarkup(rowIndex: number, columnIndex: number, markup: MarkupType) {
  const { rowStartIndex, rowEndIndex, columnStartIndex, columnEndIndex } = getSubBoardIndices(
    rowIndex,
    columnIndex
  );
  const cells: CellsType = [];
  for (let r = rowStartIndex; r <= rowEndIndex; r++) {
    for (let c = columnStartIndex; c <= columnEndIndex; c++) {
      const cell = `${r},${c}`;
      if (markup[cell]) {
        cells.push(cell);
      }
    }
  }
  return filterMarkup(cells, markup);
}

/**
 * This will return true if the cells of the preemptive set is along a row, false otherwise.
 * @param preemptiveSet
 * @returns {boolean}
 */
function isRowPreemptiveSet(preemptiveSet: PreemptiveSetType) {
  const rowIndices = preemptiveSet.cells.map(cell => getMarkupCellIndices(cell).rowIndex);
  return rowIndices.every(index => rowIndices[0] === index);
}

/**
 * This will return true if the cells of the preemptive set is along a column, false otherwise.
 * @param preemptiveSet
 * @returns {boolean}
 */
function isColumnPreemptiveSet(preemptiveSet: PreemptiveSetType) {
  const columnIndices = preemptiveSet.cells.map(cell => getMarkupCellIndices(cell).columnIndex);
  return columnIndices.every(index => columnIndices[0] === index);
}

/**
 * This will return true if the cells of the preemptive set in the same sub board, false otherwise.
 * @param preemptiveSet
 * @returns {boolean}
 */
function isSubBoardPreemptiveSet(preemptiveSet: PreemptiveSetType) {
  const cells = preemptiveSet.cells.map(cell => getMarkupCellIndices(cell));
  const { rowStartIndex, rowEndIndex, columnStartIndex, columnEndIndex } = getSubBoardIndices(
    cells[0].rowIndex,
    cells[0].columnIndex
  );
  return cells.every(({ rowIndex, columnIndex }) => {
    return (
      rowIndex >= rowStartIndex &&
      rowIndex <= rowEndIndex &&
      columnIndex >= columnStartIndex &&
      columnIndex <= columnEndIndex
    );
  });
}

/**
 * This will return segregated markup by the length of values.
 * @param {{string: [number]}} markup This will be like { "r,c": [1,2,...] }
 * @returns {{ number: [{string: number[]}] }}
 */
function segregateMarkup(markup:MarkupType) {
  return Object.entries(markup).reduce((result, current) => {
    const [cell, values] = current;
    const count = values.length;
    return {
      ...result,
      [count]: { ...result[count], [cell]: values }
    };
  }, {} as { [count: number]: MarkupType[] });
}

/**
 * This will return filtered markup by values.
 * @param {number[]} values This is an array of numbers like [1,2,...]
 * @param {{string: [number]}} markup This will be like { "r,c": [1,2,...] }
 * @returns {[string]} The array of cells
 */
function getMatchingMarkupByValues(values: number[], markup: MarkupType) {
  return Object.entries(markup).reduce((result, current) => {
    const [cell, currentValues] = current;
    return arrayEquals(values, currentValues) ? [...result, cell] : result;
  }, [] as string[]);
}

/**
 * This will return updated markup.
 * @param {{string: [number]}} boardMarkup This will be like { "r,c": [1,2,...] }
 * @param preemptiveSet
 * @param {{string: [number]}} markupToUpdate This will be like { "r,c": [1,2,...] }
 * @returns {{string: [number]}}
 */
function updateBoardMarkupUsingPreemptiveSet(
  boardMarkup: MarkupType,
  preemptiveSet: PreemptiveSetType,
  markupToUpdate:MarkupType
) {
  const enrichedBoardMarkup = { ...boardMarkup };
  const { values: preemptiveSetValues } = preemptiveSet;
  Object.entries(markupToUpdate).forEach(current => {
    const [cell, currentValues] = current;
    const filteredValues = currentValues.filter(v => !preemptiveSetValues.includes(v));
    const currentValuesInMarkupForTheCell = enrichedBoardMarkup[cell];
    if (currentValuesInMarkupForTheCell.length > 1) {
      enrichedBoardMarkup[cell] = filteredValues;
    }
  });
  return enrichedBoardMarkup;
}

function getFirstMarkupWithLessNumberOfValues(markup: MarkupType) {
  const segregatedMarkup = segregateMarkup(markup);
  const groupSize = Object.keys(segregatedMarkup)
    .map(v => parseInt(v))
    .sort();
  const lowestGroupSize = groupSize[0];
  const [cell, values]: any =
    Object.entries(markup)
      .find(entry => entry[1].length === lowestGroupSize);
  const { rowIndex, columnIndex } = getMarkupCellIndices(cell);
  return { cell, rowIndex, columnIndex, values };
}

/**
 * This will return an integer value between start and end both inclusive.
 * @param {number} start
 * @param {number} end
 * @return {number}
 */
function getRandomInteger(start: number, end: number) {
  const min = Math.ceil(start);
  const max = Math.floor(end);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default {
  getRow,
  getColumn,
  getSubBoard,
  getMarkup,
  isUniqueValueInRow,
  isUniqueValueInColumn,
  isUniqueValueInSubBoard,
  getSubBoardIndices,
  getSubBoardAsOneDimensionalArray,
  getMarkupCellIndices,
  getOutputArrayFromBoard,
  getRowMarkup,
  getColumnMarkup,
  getSubBoardMarkup,
  isRowPreemptiveSet,
  isColumnPreemptiveSet,
  isSubBoardPreemptiveSet,
  segregateMarkup,
  getMatchingMarkupByValues,
  filterMarkup,
  omitMarkup,
  updateBoardMarkupUsingPreemptiveSet,
  getFirstMarkupWithLessNumberOfValues,
  getRandomInteger
};