let selectedCodePeg;
const colors = [
  'red',
  'blue',
  'pink',
  'sky_blue',
  'purple',
  'green',
  'yellow',
  'orange'
];

let currentRowNumber = 1;

const generateCode = function(colors) {
  const shuffledColors = shuffle(colors);
  return shuffledColors.slice(-5);
};

const actualCode = generateCode(colors);

const resetAllPegs = function(codePegs) {
  codePegs.forEach(codePeg => (codePeg.style.opacity = 1));
};

const select = function(codePegs) {
  resetAllPegs(codePegs);
  this.style.opacity = 0.3;
  selectedCodePeg = this;
};

const place = function(codePegs) {
  this.src = selectedCodePeg.src;
  this.dataset.color = selectedCodePeg.dataset.color;
  selectedCodePeg = null;
  resetAllPegs(codePegs);
};

const onClick = function(elements, operation) {
  elements.forEach(element => {
    const performOperation = operation.bind(element, this);
    element.onclick = performOperation;
  });
};

const getUserCode = function(activeHoles) {
  const userCode = [];
  activeHoles.forEach(hole => userCode.push(hole.dataset.color));
  return userCode;
};

const unsetOnClicks = function(currentRowNumber) {
  getActiveHoles(currentRowNumber).forEach(
    activeHole => (activeHole.onclick = '')
  );
};

const createCheckButton = function() {
  const buttonHTML = `<button id="check${currentRowNumber}" style="font-size: 16px; margin-right: 60px; margin-top: 14px ">check</button>`;
  document.getElementById(`feedback${currentRowNumber}`).innerHTML = buttonHTML;
};

const setNextRowActive = function() {
  unsetOnClicks(currentRowNumber);
  document.getElementById(`row${currentRowNumber}`).className = 'inactive';
  document
    .getElementById(`row${currentRowNumber + 1}`)
    .removeAttribute('class');
  currentRowNumber++;
  createCheckButton();
  startGame();
};

const generateFeedbackHTML = function(feedback) {
  let feedbackHTML = '';
  for (const keyPeg of feedback) {
    feedbackHTML = feedbackHTML + `<img src="images/${keyPeg}_peg.png" />`;
  }
  return feedbackHTML;
};

const show = function(feedback) {
  document.getElementById(
    `feedback${currentRowNumber}`
  ).innerHTML = generateFeedbackHTML(feedback);
};

const getFeeback = function(activeHoles, actualCode) {
  const userCode = getUserCode(activeHoles);
  const feedback = new Array(5).fill('empty');

  for (const index in userCode) {
    const currentUserPeg = userCode[index];
    if (actualCode.includes(currentUserPeg)) {
      feedback[index] = 'white';
    }
    if (currentUserPeg === actualCode[index]) {
      feedback[index] = 'black';
    }
  }
  return shuffle(feedback);
};

const updateBoard = function(activeHoles, actualCode) {
  const feedback = getFeeback(activeHoles, actualCode);
  show(feedback);
  setNextRowActive();
};

const getActiveHoles = function(currentRowNumber) {
  return document.querySelectorAll(`#row${currentRowNumber} > img`);
};

const startGame = function() {
  const codePegs = document.querySelectorAll('.code_peg');
  const activeHoles = getActiveHoles(currentRowNumber);
  const checkBtn = document.getElementById(`check${currentRowNumber}`);

  console.log(actualCode);
  const onClickCodePeg = onClick.bind(codePegs, codePegs, select);
  const onClickHoles = onClick.bind(codePegs, activeHoles, place);
  onClickCodePeg();
  onClickHoles();
  checkBtn.onclick = updateBoard.bind(null, activeHoles, actualCode);
};
