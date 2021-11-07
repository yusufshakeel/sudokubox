'use strict';

const { TOTAL_ROWS, TOTAL_COLUMNS, ALLOWED_NUMBERS } = require('../constants');

function InputValidator() {
  const validateInputSize = inputBoard => {
    if (inputBoard.length !== TOTAL_ROWS) {
      return {
        inputBoard,
        hasError: new Error(`Input board must have exactly ${TOTAL_ROWS} rows.`)
      };
    }

    for (let rowIndex = 0; rowIndex < TOTAL_ROWS; rowIndex++) {
      if (inputBoard[rowIndex].length !== TOTAL_COLUMNS) {
        return {
          inputBoard,
          hasError: new Error(
            `Input board must have exactly ${TOTAL_COLUMNS} columns in Row ${rowIndex}.`
          )
        };
      }
    }

    return {
      inputBoard
    };
  };

  const validateNumbers = inputBoard => {
    for (let rowIndex = 0; rowIndex < TOTAL_ROWS; rowIndex++) {
      for (let columnIndex = 0; columnIndex < TOTAL_COLUMNS; columnIndex++) {
        if (!ALLOWED_NUMBERS.includes(inputBoard[rowIndex][columnIndex])) {
          return {
            inputBoard,
            hasError: new Error(
              `Input board contains invalid number in Row: ${rowIndex}, Column: ${columnIndex}.`
            )
          };
        }
      }
    }

    return {
      inputBoard
    };
  };

  this.validate = inputBoard => {
    const validators = [validateInputSize, validateNumbers];

    const validation = validators.reduce(
      (result, validator) => {
        return result.hasError ? result : validator(inputBoard);
      },
      {
        inputBoard
      }
    );

    if (validation.hasError) {
      throw validation.hasError;
    }
  };
}

module.exports = InputValidator;
