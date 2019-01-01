let selectedCodePeg;

const generateCode = function(colors) {
  const shuffledColors = shuffle(colors);
  return shuffledColors.slice(-5);
};

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
  this.style = selectedCodePeg.style;
  this.style.width = '50px';
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

const createCheckButton = function(currentRowNumber) {
  const buttonHTML = `<button id="check${currentRowNumber}" class="check_btn">check</button>`;
  document.getElementById(`feedback${currentRowNumber}`).innerHTML = buttonHTML;
};

const setNextRowActive = function(currentRowNumber, actualCode) {
  unsetOnClicks(currentRowNumber);
  document.getElementById(`row${currentRowNumber}`).className = 'inactive';
  document
    .getElementById(`row${currentRowNumber + 1}`)
    .removeAttribute('class');
  currentRowNumber++;
  createCheckButton(currentRowNumber);
  makeAttempt(actualCode,currentRowNumber);
};

const generateFeedbackHTML = function(feedback) {
  let feedbackHTML = '';
  for (const keyPeg of feedback) {
    feedbackHTML = feedbackHTML + `<img src="images/${keyPeg}_peg.png" />`;
  }
  return feedbackHTML;
};

const show = function(html,currentRowNumber) {
  document.getElementById(`feedback${currentRowNumber}`).innerHTML = html;
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

const generateMessageHTML = function(message) {
  return `<p style="font-size: 18px; font-weight: 900;margin-right: 35px;">${message}</p>`;
};

const hasLost = function(currentRowNumber) {
  return currentRowNumber === 10;
};

const hasWon = function(feedback) {
  return feedback.every(keyPeg => keyPeg === 'black');
};

const isAnyHoleEmpty = function(activeHoles) {
  const userCode = getUserCode(activeHoles);
  return userCode.some(codePegColor => codePegColor === 'no-color');
};

const reveal = function(actualCode) {
  const actualCodePegs = document.querySelectorAll('#actual_code > img');
  for (const index in actualCode) {
    actualCodePegs[index].src = `images/${actualCode[index]}_code_peg.png`;
  }
  document.getElementById('actual_code').style.opacity = 1;
};

const updateBoard = function(activeHoles, actualCode, currentRowNumber) {
  if (isAnyHoleEmpty(activeHoles)) {
    alert('Please put all code pegs before checking!');
    return;
  }

  const feedback = getFeeback(activeHoles, actualCode);
  if (hasWon(feedback)) {
    show(generateMessageHTML('Code Cracked'),currentRowNumber);
    reveal(actualCode);
    return;
  }

  if (hasLost(currentRowNumber)) {
    show(generateMessageHTML('Try Again!',currentRowNumber));
    reveal(actualCode);
    return;
  }
  show(generateFeedbackHTML(feedback),currentRowNumber);
  setNextRowActive(currentRowNumber, actualCode);
};

const getActiveHoles = function(currentRowNumber) {
  return document.querySelectorAll(`#row${currentRowNumber} > img`);
};

const makeAttempt = function(actualCode, currentRowNumber) {
  const codePegs = document.querySelectorAll('.code_peg');
  const activeHoles = getActiveHoles(currentRowNumber);
  const checkBtn = document.getElementById(`check${currentRowNumber}`);

  console.log(actualCode);
  const onClickCodePeg = onClick.bind(codePegs, codePegs, select);
  const onClickHoles = onClick.bind(codePegs, activeHoles, place);
  onClickCodePeg();
  onClickHoles();
  checkBtn.onclick = updateBoard.bind(null, activeHoles, actualCode,currentRowNumber);
};

const startGame = function() {
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
  const actualCode = generateCode(colors);
  makeAttempt(actualCode, 1);
};
