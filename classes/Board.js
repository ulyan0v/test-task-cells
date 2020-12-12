module.exports = class Board {
  _rules;
  _cells;

  constructor(cells, rules = []) {
    this._cells = cells;
    this._rules = rules;
  }

  getState() {
    return this._cells;
  }

  tick() {
    const newState = [];

    this._cells.forEach((row, y) => {
      newState.push([]);

      row.forEach((cell, x) => {
        const isRulesComplete = this._checkRules(
          cell,
          this._getNeighborsValue(y, x)
        );

        if (isRulesComplete) newState[y][x] = 1;
        else newState[y][x] = 0;
      });
    });

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
}