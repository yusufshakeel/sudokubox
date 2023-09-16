import { defaultSudokuBoxConfig, defaultGenerateConfig } from './configs';
import sudokuEngine from './engine';
import { InputType } from './ts-def/input-type';
import { BoardType } from './ts-def/board-type';
import { SudokuBoxConfigType } from './ts-def/sudokubox-config-type';
import { GeneratePuzzleConfigType } from './ts-def/generate-puzzle-config-type';

export class SudokuBox {
  private sudokuBoxConfig;
  private engine;

  constructor(config: SudokuBoxConfigType = {}) {
    this.sudokuBoxConfig = {
      ...defaultSudokuBoxConfig,
      ...config
    };
    this.engine = sudokuEngine({ sudokuBoxConfig: this.sudokuBoxConfig });
  }

  public solve({ input }:{ input: InputType }) {
    return this.engine.solve({ input });
  }

  public isValidInput({ input }:{ input: InputType }) {
    return this.engine.isValidInput({ input });
  }

  public isValidBoard({ board }: {board: BoardType}) {
    return this.engine.isValidBoard({ board });
  }

  public generate(config: GeneratePuzzleConfigType = {}) {
    const generateConfig = {
      ...defaultGenerateConfig,
      ...config
    };
    return this.engine.generate(generateConfig);
  }
}

export default SudokuBox;