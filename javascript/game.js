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
  this.src = selectedCodePeg.src;
  selectedCodePeg = null;
  resetAllPegs(codePegs);
};

const startGame = function() {
  const codePegs = getElementsByClassName("code_peg");
  const activeHoles = getElementsByClassName("active");

  codePegs.forEach(codePeg => {
    const selectCodePeg = select.bind(codePeg, codePegs);
    codePeg.onclick = selectCodePeg;
  });

  activeHoles.forEach(hole => {
    const placeCodePeg = place.bind(hole, codePegs);
    hole.onclick = placeCodePeg;
  });
};
