module.exports = [
  (cell, value) => value >= 2,
  (cell, value) => value <= 3,
  (cell, value) => cell ? true : value === 3
]