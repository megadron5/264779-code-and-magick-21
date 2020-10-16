'use strict';

const WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
const WIZARD_LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
const WIZARD_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
const WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
const FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
const wizards = [];
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 25;
const setupOpen = document.querySelector('.setup-open');
const setup = document.querySelector('.setup');
const setupClose = setup.querySelector('.setup-close');
const userNameInput = document.querySelector('.setup-user-name');
const userDialog = document.querySelector('.setup-similar');
userDialog.classList.remove('hidden');

const myWizard = {
  coat: {
    element: setup.querySelector('.wizard-coat'),
    input: setup.querySelector('input[name = "coat-color"]')
  },
  eyes: {
    element: setup.querySelector('.wizard-eyes'),
    input: setup.querySelector('input[name = "eyes-color"]')
  },
  fireball: {
    element: setup.querySelector('.setup-fireball-wrap'),
    input: setup.querySelector('input[name = "fireball-color"]')
  }
};



const similarListElement = userDialog.querySelector('.setup-similar-list');

const similarWizardTemplate = document.querySelector('#similar-wizard-template')
	.content
	.querySelector('.setup-similar-item');

const getRandomElement = function (rand) {
  return rand[Math.floor(Math.random() * Math.floor(rand.length))];
};

const changeWizardColor = function (object, array, property) {
  object.element.addEventListener('click', function() {
    const color = getRandomElement(array);
    object.element.style = `${property}: ${color}`;
    object.input.value = `${color}`;
  });
};

userNameInput.addEventListener('input', function (){

  const valueLength = userNameInput.value.length;

  if (valueLength < MIN_NAME_LENGTH){
    userNameInput.setCustomValidity('Осталось ' + (MIN_NAME_LENGTH - valueLength) + ' cимволов.');
  } else if (valueLength > MAX_NAME_LENGTH){
    userNameInput.setCustomValidity('Удалите ' + (valueLength - MAX_NAME_LENGTH) + ' символов.');
  } else{
    userNameInput.setCustomValidity('');
  }

  userNameInput.reportValidity();
});

const onPopupEscPress = function (evt){
  if (evt.key === 'Escape'){
    evt.preventDefault();
    closePopup();
  }
};

const openPopup = function (){
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  changeWizardColor(myWizard.coat, WIZARD_COAT, 'fill');
  changeWizardColor(myWizard.eyes, WIZARD_EYES, 'fill');
  changeWizardColor(myWizard.fireball, FIREBALL_COLOR, 'background');
};

const closePopup = function(){
    setup.classList.add('hidden');

document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function(){
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt){
  if (evt.key === 'Enter'){
    openPopup();
  }
});

setupClose.addEventListener('click', function (){
  closePopup();
});

setupClose.addEventListener('keydown', function (evt){
 if (evt.key === 'Enter'){
  closePopup();
 }
});

const renderWizardStat = function (wizardsNumber) {
  for (let i = 0; i < wizardsNumber; i++) {
    wizards[i] = {};
    wizards[i].name = getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_LASTNAMES);
    wizards[i].coatColor = getRandomElement(WIZARD_COAT);
    wizards[i].eyesColor = getRandomElement(WIZARD_EYES);
  }
  return wizards;
};

renderWizardStat(4);

const renderWizard = function(wizard) {
  const wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

const fragment = document.createDocumentFragment();
for (let i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);


