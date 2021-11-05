'use strict';

const engine = require('./src/engine');

function SudokuBox() {
  this.solve = ({ input }) => {
    return engine({ input });
  };
}

module.exports = SudokuBox;
