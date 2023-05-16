const CONSTANTS = {
  ALLOWED_NUMBERS: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  TOTAL_COLUMNS: 9,
  TOTAL_ROWS: 9,
  TOTAL_ROWS_IN_SUB_BOARD: 3,
  TOTAL_COLUMNS_IN_SUB_BOARD: 3,
  EMPTY_CELL: 0,
  RANDOM_BOARD: {
    MAXIMUM_NUMBER_OF_CELLS_TO_FILL: 10,
    MINIMUM_NUMBER_OF_CELLS_TO_FILL: 5
  },
  GENERATE_PUZZLE: {
    EASY: {
      MAXIMUM_NUMBER_OF_CELLS_TO_FILL: 50,
      MINIMUM_NUMBER_OF_CELLS_TO_FILL: 46
    },
    MEDIUM: {
      MAXIMUM_NUMBER_OF_CELLS_TO_FILL: 45,
      MINIMUM_NUMBER_OF_CELLS_TO_FILL: 41
    },
    HARD: {
      MAXIMUM_NUMBER_OF_CELLS_TO_FILL: 40,
      MINIMUM_NUMBER_OF_CELLS_TO_FILL: 36
    },
    EXTREME: {
      MAXIMUM_NUMBER_OF_CELLS_TO_FILL: 35,
      MINIMUM_NUMBER_OF_CELLS_TO_FILL: 31
    },
    DIABOLICAL: {
      MAXIMUM_NUMBER_OF_CELLS_TO_FILL: 30,
      MINIMUM_NUMBER_OF_CELLS_TO_FILL: 26
    }
  }
};

export default CONSTANTS;