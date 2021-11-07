'use strict';

const defaultConfig = require('./src/configs');
const engine = require('./src/engine');

function SudokuBox(config) {
  const sudokuBoxConfig = {
    ...defaultConfig,
    ...config
  };

  this.solve = ({ input }) => {
    return engine({ input, sudokuBoxConfig });
  };
}

module.exports = SudokuBox;
