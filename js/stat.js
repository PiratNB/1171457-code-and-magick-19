'use strict';

// Константы задания module2-task1:
var HEIGHT_DIAGRAM = 150;
var WIN_MESSAGE = 'Ура Вы победили!\nСписок результатов:';
var BAR_WIDTH = 40;
var SPACE_BETWEEN_BAR = 50;
var CURRENT_PLAYER_NAME = 'Вы';
var MAIN_RESULTS_X = 110;
var MAIN_RESULTS_Y = 20;
var MAIN_RESULT_WIDTH = 420;
var MAIN_RESULT_HEIGHT = 270;
var MIN_SATURATION = 0;
var RESULT_SHADOW_X = 10;
var RESULT_SHADOW_Y = 10;
var ROW_HEIGHT = 20;
var MESSAGE_X = 120;
var MESSAGE_Y = 40;
var SYMBOL_WIDTH_PX = 8;
var DIAGRAM_PADDING_LEFT = 40;
var SCORES_TEXT_MARGIN = 9;
var DIAGRAM_PADDING_BOTTOM = 30;
// функция возвращает делитель для отрисовки диаграммы
var getDevider = function (times, heightPx) {
  var maxTime = times[0];
  for (var i = 1; i < times.length; i++) {
    if (times[i] > maxTime) {
      maxTime = times[i];
    }
  }
  return Math.round(maxTime / heightPx);
};

// Функция вычисляет произвольную насыщенность цвета в rgb()
var getColorSaturation = function (minSaturation) {
  return minSaturation + Math.ceil(Math.random() * (255 - minSaturation));
};

// Функция округляет входящее значение и возвращает его в виде строки
var getTimeString = function (time) {
  return Math.round(time).toString();
};

window.renderStatistics = function (ctx, names, times) {
  // Рисуем поле для вывода результатов
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(MAIN_RESULTS_X, MAIN_RESULTS_Y, MAIN_RESULT_WIDTH, MAIN_RESULT_HEIGHT);
  ctx.fillStyle = 'white';
  ctx.fillRect(MAIN_RESULTS_X - RESULT_SHADOW_X, MAIN_RESULTS_Y - RESULT_SHADOW_Y, MAIN_RESULT_WIDTH, MAIN_RESULT_HEIGHT);
  // Печатаем текст
  var messageArray = WIN_MESSAGE.split('\n');
  ctx.font = '16px Pt Mono';
  ctx.fillStyle = '#000';
  var messageMaxWidth = MAIN_RESULT_WIDTH - (MESSAGE_X - MAIN_RESULTS_X) * 2;
  for (var stringIndex = 0; stringIndex < messageArray.length; stringIndex++) {
    ctx.fillText(messageArray[stringIndex], MESSAGE_X, MESSAGE_Y + stringIndex * ROW_HEIGHT, messageMaxWidth);
  }
  // высота гистограммы задана в 150px, Результаты игроков имеют другую систему исчисления. Получаем пропорцию для отрисовки гистограммы результатов
  var chartDevider = getDevider(times, HEIGHT_DIAGRAM);
  // Вычисляем отступ по оси Х между соседними столбиками диаграммы
  var nextBarX = BAR_WIDTH + SPACE_BETWEEN_BAR;
  // Переменная для хранения высоты столбика диаграммы
  var heightCurrentBar;
  // Рисуем диаграмму с результатами игроков
  var barX = MAIN_RESULTS_X + DIAGRAM_PADDING_LEFT;
  var barY = MAIN_RESULT_HEIGHT - DIAGRAM_PADDING_BOTTOM;
  for (var i = 0; i < names.length; i++) {
    heightCurrentBar = times[i] / chartDevider;
    ctx.fillStyle = 'rgb(0, 0, ' + getColorSaturation(MIN_SATURATION) + ')';
    // Цвет диаграммы результатов текущего игрока устанавливаем красным
    if (names[i] === CURRENT_PLAYER_NAME) {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)'
      ;
    }
    ctx.fillRect(barX + i * nextBarX, barY - heightCurrentBar, BAR_WIDTH, heightCurrentBar);// рисуем столбик гистограммы
    ctx.fillStyle = '#000';// задаем цвет шрифта надписей
    ctx.fillText(names[i], barX + i * nextBarX + BAR_WIDTH / 2 - names[i].length / 2 * SYMBOL_WIDTH_PX, barY + ROW_HEIGHT);// подписываем имя игрока под его результатом
    ctx.fillText(getTimeString(times[i]), barX + i * nextBarX, barY - heightCurrentBar - SCORES_TEXT_MARGIN);// подписываем количество очков/время игрока
  }


};
