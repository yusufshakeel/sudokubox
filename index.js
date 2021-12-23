'use strict';

const defaultConfig = require('./src/configs');
const engine = require('./src/engine')();

function SudokuBox(config) {
  const sudokuBoxConfig = {
    ...defaultConfig,
    ...config
  };

  this.solve = ({ input }) => {
    return engine.solve({ input, sudokuBoxConfig });
  };

  this.isValidInput = ({ input }) => {
    return engine.isValidInput({ input, sudokuBoxConfig });
  };

  this.isValidBoard = ({ board }) => {
    return engine.isValidBoard({ board, sudokuBoxConfig });
  };
}

module.exports = SudokuBox;
