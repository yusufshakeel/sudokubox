# sudokubox

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/yusufshakeel/sudokubox)
[![npm version](https://img.shields.io/badge/npm-0.0.1-blue.svg)](https://www.npmjs.com/package/sudokubox)

Sudoku project.

## Table of content

* [Getting started](#getting-started)
* [Sudoku board](#sudoku-board)
* [Input](#input)
* [Output](#output)
* [License](#license)

## Getting started

To install this run the following command in the terminal.

```shell
$ npm i sudokubox
```

## Sudoku board

The board size is 9x9.

## Input

The input is a **one dimensional array** having 81 numbers.

Use number `0` to denote empty cell.

Use number `1` to `9` to denote filled cell.

Following is a sample sudoku board.

![sudoku puzzle](./docs/sample-puzzle.jpg)

And following is the input array corresponding to the above sudoku board.

Note! The array is formatted into lines for readability.

```javascript
[
  1, 3, 0, 2, 0, 0, 7, 4, 0,
  0, 2, 5, 0, 1, 0, 0, 0, 0,
  4, 8, 0, 0, 6, 0, 0, 5, 0,
  0, 0, 0, 7, 8, 0, 2, 1, 0,
  5, 0, 0, 0, 9, 0, 3, 7, 0,
  9, 0, 0, 0, 3, 0, 0, 0, 5,
  0, 4, 0, 0, 0, 6, 8, 9, 0,
  0, 5, 3, 0, 0, 1, 4, 0, 0,
  6, 0, 0, 0, 0, 0, 0, 0, 0
]
```

## Output

The output will be a **one dimensional array** having 81 numbers.

For the above input array we will get the following output array.

Note! The array is formatted into lines for readability.

```javascript
[
  1, 3, 6, 2, 5, 9, 7, 4, 8,
  7, 2, 5, 4, 1, 8, 9, 3, 6,
  4, 8, 9, 3, 6, 7, 1, 5, 2,
  3, 6, 4, 7, 8, 5, 2, 1, 9,
  5, 1, 8, 6, 9, 2, 3, 7, 4,
  9, 7, 2, 1, 3, 4, 6, 8, 5,
  2, 4, 1, 5, 7, 6, 8, 9, 3,
  8, 5, 3, 9, 2, 1, 4, 6, 7,
  6, 9, 7, 8, 4, 3, 5, 2, 1
]
```

## License

It's free :smiley:

[MIT License](https://github.com/yusufshakeel/sudokubox/blob/master/LICENSE) Copyright (c) 2021 Yusuf Shakeel

### Donate

Feeling generous :smiley: [Donate via PayPal](https://www.paypal.me/yusufshakeel)