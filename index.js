'use strict';

const { defaultSudokuBoxConfig, defaultGenerateConfig } = require('./src/configs');
const sudokuEngine = require('./src/engine');

function SudokuBox(config) {
  const sudokuBoxConfig = {
    ...defaultSudokuBoxConfig,
    ...config
  };

  const engine = sudokuEngine({ sudokuBoxConfig });

  this.solve = ({ input }) => engine.solve({ input });

  this.isValidInput = ({ input }) => engine.isValidInput({ input });

  this.isValidBoard = ({ board }) => engine.isValidBoard({ board });

  this.generate = config => {
    const generateConfig = {
      ...defaultGenerateConfig,
      ...config
    };
    return engine.generate(generateConfig);
  };
}

module.exports = SudokuBox;
