# Тестовое задание Яндекс Дзен

## Запуск проекта
1. `npm i`
2. `node app`

## Возможности
### Параметры запуска
По умолчанию карта генерируется случайным образом
Размеры можно выбрать:

`node app --width 10 --height 5`

или

`node app -w 10 -h 5`

Все значения по умолчанию хранятся в файле config.js

### Карты
Можно самому задать стартовое состояние
Для этого нужно поместить текстовый файл с картой в папку maps
Для выбора карты в параметрах запуска указывается полное имя файла:

`node app map.txt`

Формат карты:

`
01110

10001

10001

10001

01110
`
