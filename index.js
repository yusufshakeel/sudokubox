'use strict';

const defaultConfig = require('./src/configs');
const sudokuEngine = require('./src/engine');

function SudokuBox(config) {
  const sudokuBoxConfig = {
    ...defaultConfig,
    ...config
  };

  const engine = sudokuEngine({ sudokuBoxConfig });

  this.solve = ({ input }) => engine.solve({ input });

  this.isValidInput = ({ input }) => engine.isValidInput({ input });

  this.isValidBoard = ({ board }) => engine.isValidBoard({ board });

  this.generate = ({ level }) => engine.generate({ level });
}

module.exports = SudokuBox;
