const minimist = require('minimist');
const config = require('../config');
const Renderer = require('./Renderer');
const Board = require('./Board');
const MapFile = require('./Map');
const rules = require('../rules');

class Main {
  _interval = null;

  constructor() {
    this.args = minimist(process.argv.slice(2), {
      alias: {width: 'w', height: 'h'}
    });

    const map = new MapFile({
      fileName: this.args._[0],
      width: this.args.width,
      height: this.args.height
    });

    this.board = new Board(map.getMap(), rules);
  }

  start() {
    this._interval = setInterval(() => {
      Renderer.showInConsole(this.board.getState());

      this.board.tick();
    }, config.timeout);
  }

  stop() {
    clearInterval(this._interval);
  }
}

module.exports = new Main();