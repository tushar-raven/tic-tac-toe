const GameBoard = (() => {
  let gameArray = new Array(9);

  const gameBoard = document.querySelector(".game-board");
  for (let i = 0; i < gameArray.length; i++) {
    const box = document.createElement("div");
    box.id = `${i}`;
    box.textContent = gameArray[i];
    gameBoard.appendChild(box);
  }
})();

const Player = (name, sign) => {
  return { name, sign };
};

const player = Player("Player", "O");
const computer = Player("Computer", "X");

console.log(player);
console.log(computer);
