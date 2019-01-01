let selectedCodePeg;
const actualCode = ["red", "blue", "pink", "sky_blue", "purple"];

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

const showFeedback = function(feedback){
  document.getElementById("feedback").innerHTML = `<img src="images/${feedback[0]}_peg.png" />
  <img src="images/${feedback[1]}_peg.png" />
  <img src="images/${feedback[2]}_peg.png" />
  <img src="images/${feedback[3]}_peg.png" />
  <img src="images/${feedback[4]}_peg.png" />`;

  document.getElementById('row1').className='inactive';
  
  document.getElementById('row2').removeAttribute('class');
}

const getFeeback = function(activeHoles, actualCode) {
  const userCode = getUserCode(activeHoles);
  const feedback = new Array(5).fill("empty");

  for (const index in userCode) {
    const currentUserPeg = userCode[index];
    if (actualCode.includes(currentUserPeg)) {
      feedback[index] = "white";
    }
    if (currentUserPeg === actualCode[index]) {
      feedback[index] = "black";
    }
  }
  showFeedback(feedback);
};

const startGame = function() {
  const codePegs = document.querySelectorAll(".code_peg");
  const activeHoles = document.querySelectorAll("#row1 > img");
  const checkBtn = document.getElementById("check");
  
  const onClickCodePeg = onClick.bind(codePegs, codePegs, select);
  const onClickHoles = onClick.bind(codePegs, activeHoles, place);
  onClickCodePeg();
  onClickHoles();
  checkBtn.onclick = getFeeback.bind(null, activeHoles, actualCode);
};
