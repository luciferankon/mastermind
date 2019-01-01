let selectedCodePeg;

const resetAllPegs = function(codePegs) {
  codePegs.forEach(codePeg => (codePeg.style.opacity = 1));
};

const select = function(codePegs) {
  resetAllPegs(codePegs);
  this.style.opacity = 0.3;
  selectedCodePeg = this;
};

const place = function(codePegs) {
  console.log(codePegs);
  this.src = selectedCodePeg.src;
  selectedCodePeg = null;
  resetAllPegs(codePegs);
  console.log(selectedCodePeg);
};

const onClick = function(elements,operation) {
  elements.forEach(element => {
    const performOperation = operation.bind(element, this);
    element.onclick = performOperation;
  });
};

const startGame = function() {
  const codePegs = getElementsByClassName("code_peg");
  const activeHoles = getElementsByClassName("active");
  const onClickCodePeg = onClick.bind(codePegs,codePegs,select);
  const onClickHoles = onClick.bind(codePegs,activeHoles,place);
  onClickCodePeg();
  onClickHoles();
};
