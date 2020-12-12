const fs = require('fs');
const minimist = require('minimist');
const config = require('../config');
const Renderer = require('./Renderer');
const Board = require('./Board');
const rules = require('../rules');

class Main {
  _interval = null;

  constructor() {
    this.args = minimist(process.argv.slice(2), {
      alias: {width: 'w', height: 'h'}
    });

    const path = this.args._[0];

    this.board = new Board({
      cells: path ? this._loadMap(path) : undefined,
      width: this.args.width,
      height: this.args.height,
      rules
    });
  }

  start() {
    this._interval = setInterval(() => {
      Renderer.showInConsole(this.board.state);

      this.board.tick();
    }, config.timeout);
  }

  stop() {
    clearInterval(this._interval);
  }

  _loadMap(path) {
    return fs
      .readFileSync(`maps/${path}`, 'utf-8')
      .split('\n')
      .map(row => {
        return row
          .split('')
          // Number('\r') почему-то возвращает 0
          .filter(cell => !isNaN(parseInt(cell)))
          .map(cell => +cell);
      });
  }
}

module.exports = new Main();