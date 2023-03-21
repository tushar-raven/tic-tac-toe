const GameBoard = (() => {
  let gameArray = new Array(9).fill(null);

  const CreateBoard = () => {
    const gameBoard = document.querySelector(".game-board");
    gameBoard.innerHTML = "";

    for (let i = 0; i < gameArray.length; i++) {
      const box = document.createElement("div");
      box.id = `${i}`;
      box.textContent = gameArray[i];
      gameBoard.appendChild(box);
      box.addEventListener("click", Game.Mark);
    }
  };

  const Update = (index, mark) => {
    if (!gameArray[index]) {
      gameArray[index] = mark;
      CreateBoard();
      CheckTie();
      CheckWinner();
    }
  };

  const CheckWinner = () => {
    const wins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (i = 0; i < wins.length; i++) {
      const [a, b, c] = wins[i];
      if (
        gameArray[a] &&
        gameArray[a] == gameArray[b] &&
        gameArray[b] == gameArray[c]
      ) {
        Game.declareWinner();
      }
    }
  };

  const CheckTie = () => {
    if (gameArray.every((element) => element !== null)) {
      Game.declareTie();
    }
  };

  const NewBoard = () => {
    gameArray = new Array(9).fill(null);
    CreateBoard();
  };

  return { CreateBoard, Update, NewBoard };
})();

const Game = (() => {
  let players = [];
  let playerIndex = 0;
  let gameOver = false;
  const winner = document.querySelector(".winner");

  const Start = (e) => {
    e.preventDefault();
    if (gameOver == true) {
      return;
    }

    const p1Name = document.querySelector("#player1").value;
    const p2Name = document.querySelector("#player2").value;

    if (p1Name == "" || p2Name == "") {
      alert("Please enter player names");
      return;
    }
    document.querySelector("#player1").setAttribute("disabled", "");
    document.querySelector("#player2").setAttribute("disabled", "");

    GameBoard.CreateBoard();

    const gameForm = document.querySelector(".game-form");
    gameForm.reset();

    players = [
      (PlayerOne = Player(p1Name, "X")),
      (PlayerTwo = Player(p2Name, "O")),
    ];
    winner.textContent = `${PlayerOne.name} Vs ${PlayerTwo.name}`;
  };

  const Mark = (e) => {
    if (gameOver == true) {
      return;
    }
    index = e.target.id;
    mark = players[playerIndex]["sign"];
    GameBoard.Update(index, mark);

    playerIndex = playerIndex === 0 ? 1 : 0; //if-else notation
  };

  const declareWinner = () => {
    gameOver = true;
    winner.textContent = `${players[playerIndex]["name"]} Won!`;
  };

  const declareTie = () => {
    gameOver = true;
    winner.textContent = "It's a tie";
  };

  const Restart = () => {
    gameOver = false;
    playerIndex = 0;
    winner.textContent = `${PlayerOne.name} Vs ${PlayerTwo.name}`;
    GameBoard.NewBoard();
  };

  const Reset = () => {
    location.reload();
  };

  return { Mark, Start, declareWinner, declareTie, Restart, Reset };
})();

const Player = (name, sign) => {
  return { name, sign };
};

const startBtn = document.querySelector('[type = "submit"]');
startBtn.addEventListener("click", Game.Start);

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", Game.Restart);

const resetBtn = document.querySelector(".reset");
resetBtn.addEventListener("click", Game.Reset);
