/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying;
init();

document.querySelector(".btn--roll").addEventListener("click", () => {
  if (gamePlaying) {
    // 1. Random number
    const dice = Math.floor(Math.random() * 6) + 1;
    //2. Display the result
    document.querySelector(".dice").style.display = "block";
    document.querySelector(".dice").src = "dice-" + dice + ".png";

    //3. Update the round score IF the rolled number was NOT a 1
    if (dice !== 1) {
      //Add score
      roundScore += dice;
      document.querySelector("#current--" + activePlayer).textContent = roundScore;
    } else {
      // Next player
      nextPlayer();
    }
  }
});

document.querySelector(".btn--hold").addEventListener("click", () => {
  if (gamePlaying) {
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;
    // Update the UI
    document.getElementById("score--" + activePlayer).textContent = scores[activePlayer];

    // Check if player won the game
    if (scores[activePlayer] >= 100) {
      document.getElementById("name--" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document.querySelector(".player--" + activePlayer).classList.add("player--winner");
      document.querySelector(".player--" + activePlayer).classList.remove("player--active");
      gamePlaying = false;
    } else {
      // Next player
      nextPlayer();
    }
  }
});

document.querySelector(".btn--new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector(".dice").style.display = "none";
  document.getElementById("name--0").textContent = "Player 1";
  document.getElementById("name--1").textContent = "Player 2";
  document.getElementById("score--0").textContent = 0;
  document.getElementById("score--1").textContent = 0;
  document.getElementById("current--0").textContent = 0;
  document.getElementById("current--1").textContent = 0;
  document.querySelector(".player--0").classList.remove("player--winner");
  document.querySelector(".player--1").classList.remove("player--winner");
  document.querySelector(".player--0").classList.remove("player--active");
  document.querySelector(".player--1").classList.remove("player--active");
  document.querySelector(".player--0").classList.add("player--active");
}

const nextPlayer = () => {
  activePlayer = activePlayer === 0 ? 1 : 0;
  roundScore = 0;

  document.getElementById("current--0").textContent = "0";
  document.getElementById("current--1").textContent = "0";

  document.querySelector(".player--0").classList.toggle("player--active");
  document.querySelector(".player--1").classList.toggle("player--active");
};
