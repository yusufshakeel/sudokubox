'use strict';

function StackHelper() {
  const stack = [];

  this.push = ({ cellRowIndex, cellColumnIndex, value }) => {
    return stack.push({ cellRowIndex, cellColumnIndex, value });
  };

  this.pop = () => {
    return stack.pop();
  };

  this.peek = () => {
    return stack[stack.length - 1];
  };

  this.size = () => {
    return stack.length;
  };
}

module.exports = StackHelper;
