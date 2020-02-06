'use strict';

var WIZARD_AMOUNT = 4;

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

var wizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizardSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц ', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var similarList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.getElementById('similar-wizard-template').content.querySelector('.setup-similar-item');
var wizardSetup = {
  WIZARD_NAMES: wizardNames,
  WIZARD_SURNAMES: wizardSurnames,
  COAT_COLORS: coatColors,
  EYES_COLORS: eyesColors
};

// Выбирает случаный элемент в массиве
var getRandomElement = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

// Генерирует магов в виде массива объектов
var generateWizards = function () {
  var wizards = [];

  for (var i = 0; i < WIZARD_AMOUNT; i++) {
    wizards[i] = {
      name: wizardSetup.WIZARD_NAMES[getRandomElement(wizardSetup.WIZARD_NAMES)] + ' ' + wizardSetup.WIZARD_SURNAMES[getRandomElement(wizardSetup.WIZARD_SURNAMES)],
      coatColor: wizardSetup.COAT_COLORS[getRandomElement(wizardSetup.COAT_COLORS)],
      eyesColor: wizardSetup.EYES_COLORS[getRandomElement(wizardSetup.EYES_COLORS)]
    };
  }
  return wizards;
};

var wizards = generateWizards();

// Задаёт на странице разметку для мага на основе шаблона и объекта данных
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
wizards.forEach(function (wizard) {
  fragment.appendChild(renderWizard(wizard));
});
similarList.appendChild(fragment);

setup.querySelector('.setup-similar').classList.remove('hidden');
