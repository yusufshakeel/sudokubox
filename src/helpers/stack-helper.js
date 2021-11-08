'use strict';

function StackHelper() {
  const stack = [];

  this.raw = () => {
    return stack;
  };

  this.push = data => {
    return stack.push(data);
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
