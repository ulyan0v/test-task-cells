const config = require('../config');
const {random} = require('../utils');

module.exports = class Board {
  constructor(params = {}) {
    ({
      cells: this.cells = [],
      rules: this.rules = [],
      aliveCellsPercent: this.aliveCellsPercent = config.aliveCellsPercent,
      width: this.width = this.cells[0]?.length || config.defaultWidth,
      height: this.height = this.cells?.length || config.defaultHeight,
    } = params);

    if (!this.cells.length) this.cells = this._getRandomState();
  }

  get state() {
    return this.cells;
  }

  tick() {
    const newState = [];

    for (let y = 0; y < this.height; y++) {
      newState.push([]);

      for (let x = 0; x < this.width; x++) {
        const isRulesComplete = this._checkRules(
          this.cells[y][x],
          this._getNeighborsValue(y, x)
        );

        if (isRulesComplete) newState[y][x] = 1;
        else newState[y][x] = 0;
      }
    }

    this.cells = newState;
  }

  _getNeighborsValue(cellY, cellX) {
    let result = 0;

    for (let y = cellY - 1; y <= cellY + 1; y++) {
      for (let x = cellX - 1; x <= cellX + 1; x++) {
        if (this.cells[y] && this.cells[y][x]) {
          if (cellX === x && cellY === y) continue;
          result += this.cells[y][x];
        }
      }
    }

    return result;
  }

  _checkRules(cell, neighborsValue) {
    if (!this.rules.length) return !!cell;

    return !this.rules.find(rule => {
      return !rule(cell, neighborsValue)
    });
  }

  _getRandomState() {
    const result = [];

    for (let y = 0; y < this.height; y++) {
      result.push([]);

      for (let x = 0; x < this.width; x++) {
        result[y][x] = random(0, 100) > this.aliveCellsPercent ? 0 : 1;
      }
    }

    return result;
  }
}