'use strict';

const defaultConfig = require('./src/configs');
const engine = require('./src/engine');
const BoardValidator = require('./src/validators/board-validator');
const BoardBuilder = require('./src/builders/board-builder');

function SudokuBox(config) {
  const sudokuBoxConfig = {
    ...defaultConfig,
    ...config
  };

  const boardValidator = new BoardValidator();

  this.solve = ({ input }) => {
    return engine({ input, sudokuBoxConfig });
  };

  this.isValidInput = ({ input }) => {
    const board = new BoardBuilder(input).build();
    return boardValidator.isValid(board);
  };

  this.isValidBoard = ({ board }) => {
    return boardValidator.isValid(board);
  };
}

module.exports = SudokuBox;
