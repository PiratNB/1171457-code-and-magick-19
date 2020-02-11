'use strict';

var WIZARD_AMOUNT = 4;
var MIN_NAME_LENGTH = 2;
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');
var coatColor = document.querySelector('.setup-wizard .wizard-coat');
var eyesColor = document.querySelector('.setup-wizard .wizard-eyes');
var coatColorInput = document.querySelector('input[name="coat-color"]');
var eyesColorInput = document.querySelector('input[name="eyes-color"]');
var fireballColorInput = document.querySelector('input[name="fireball-color"]');
var fireballColor = document.querySelector('.setup-fireball-wrap');

var wizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizardSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц ', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var similarList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.getElementById('similar-wizard-template').content.querySelector('.setup-similar-item');
var wizardSetup = {
  WIZARD_NAMES: wizardNames,
  WIZARD_SURNAMES: wizardSurnames,
  COAT_COLORS: coatColors,
  EYES_COLORS: eyesColors,
  FIREBALL_COLORS: fireballColors
};

// Открытие и закрытие попапа
var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});

// Валидация ввода имени
userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < MIN_NAME_LENGTH) {
    target.setCustomValidity('Имя должно состоять минимум из ' + MIN_NAME_LENGTH + '-х символов'
    );
  } else {
    target.setCustomValidity('');
  }
});

// Задает случайный цвет элементу мага
var setRandomColor = function (element, colors, elementInput) {
  element.addEventListener('click', function () {
    var color = colors[getRandomElement(colors)];
    if (element.tagName.toLowerCase() === 'div') {
      element.style.backgroundColor = color;
    } else {
      element.style.fill = color;
    }
    elementInput.value = color;
  });
};

// Выбирает случаный элемент в массиве
var getRandomElement = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

// Генерирует магов в виде массива объектов
var generateWizards = function () {
  var wizards = [];

  for (var i = 0; i < WIZARD_AMOUNT; i++) {
    wizards.push({
      name: wizardSetup.WIZARD_NAMES[getRandomElement(wizardSetup.WIZARD_NAMES)] + ' ' + wizardSetup.WIZARD_SURNAMES[getRandomElement(wizardSetup.WIZARD_SURNAMES)],
      coatColor: wizardSetup.COAT_COLORS[getRandomElement(wizardSetup.COAT_COLORS)],
      eyesColor: wizardSetup.EYES_COLORS[getRandomElement(wizardSetup.EYES_COLORS)]
    });
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
setRandomColor(coatColor, wizardSetup.COAT_COLORS, coatColorInput);
setRandomColor(eyesColor, wizardSetup.EYES_COLORS, eyesColorInput);
setRandomColor(fireballColor, wizardSetup.FIREBALL_COLORS, fireballColorInput);
