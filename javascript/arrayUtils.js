const shuffle = function(list) {
  let currentIndex = list.length;
  const shuffledList = list.slice();
  while (0 !== currentIndex) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    const temporaryValue = shuffledList[currentIndex];
    shuffledList[currentIndex] = shuffledList[randomIndex];
    shuffledList[randomIndex] = temporaryValue;
  }
  return shuffledList;
}