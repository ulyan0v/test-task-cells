const config = require('../config');
const {random} = require('../utils');

module.exports = class Board {
  width;
  height;
  aliveCellsPercent;
  _rules;
  _cells;

  constructor(params = {}) {
    ({
      cells: this._cells = [],
      rules: this._rules = [],
      aliveCellsPercent: this.aliveCellsPercent = config.aliveCellsPercent,
      width: this.width = this._cells[0]?.length || config.defaultWidth,
      height: this.height = this._cells?.length || config.defaultHeight,
    } = params);

    if (!this._cells.length) this._cells = this._getRandomState();
  }

  get state() {
    return this._cells;
  }

  tick() {
    const newState = [];

    for (let y = 0; y < this.height; y++) {
      newState.push([]);

      for (let x = 0; x < this.width; x++) {
        const isRulesComplete = this._checkRules(
          this._cells[y][x],
          this._getNeighborsValue(y, x)
        );

        if (isRulesComplete) newState[y][x] = 1;
        else newState[y][x] = 0;
      }
    }

    this._cells = newState;
  }

  _getNeighborsValue(cellY, cellX) {
    let result = 0;

    for (let y = cellY - 1; y <= cellY + 1; y++) {
      for (let x = cellX - 1; x <= cellX + 1; x++) {
        if (this._cells[y] && this._cells[y][x]) {
          if (cellX === x && cellY === y) continue;
          result += this._cells[y][x];
        }
      }
    }

    return result;
  }

  _checkRules(cell, neighborsValue) {
    if (!this._rules.length) return !!cell;

    return !this._rules.find(rule => {
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