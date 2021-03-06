const fs = require('fs');
const {random} = require('../utils');
const config = require('../config');

module.exports = class MapFile {
  width;
  height;
  aliveCellsPercent;
  _fileName;
  _map;

  constructor(params = {}) {
    ({
      fileName: this._fileName,
      aliveCellsPercent: this.aliveCellsPercent = config.aliveCellsPercent,
      width: this.width = config.defaultWidth,
      height: this.height = config.defaultHeight,
    } = params);

    this._fileName ? this._loadFile() : this._createRandomMap();
  }

  getMap() {
    return this._map;
  }

  validateMap(map) {
    let isValid = true;

    map.sort((a, b) => {
      if (a.length !== b.length) isValid = false;
      return 0;
    });

    return isValid;
  }

  convertToMap(str) {
    return str
      .split('\n')
      .map(row => {
        return row
          .split('')
          // Number('\r') почему-то возвращает 0
          .filter(cell => !isNaN(parseInt(cell)))
          .map(cell => +cell);
      });
  }

  _loadFile() {
    const file = fs.readFileSync(`maps/${this._fileName}`, 'utf-8');
    const map = this.convertToMap(file);

    if (this.validateMap(map)) this._map = map;
    else throw new Error('Invalid Map');
  }

  _createRandomMap() {
    const result = [];

    for (let y = 0; y < this.height; y++) {
      result.push([]);

      for (let x = 0; x < this.width; x++) {
        result[y][x] = random(0, 100) > this.aliveCellsPercent ? 0 : 1;
      }
    }

    this._map = result;
  }
}