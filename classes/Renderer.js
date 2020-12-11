const chalk = require('chalk');
const config = require('../config');

class Renderer {
  showInConsole(array) {
    this.clearConsole();

    array.forEach(row => {
      console.log(
        chalk.bgHex(config.bgColor)(...row.map(cell => {
          return cell ? chalk.hex(config.cellColor)(config.cellSymbol) : ' ';
        }))
      );
    });
  }

  clearConsole() {
    console.log('\x1Bc');
  }
}

module.exports = new Renderer();