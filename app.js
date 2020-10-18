const playerX = 'X';
const playerO = 'O';
let currentPlayer = playerX;
let currentColor1 = 'black';
let currentColor2 = 'black';
const allTd = document.getElementsByTagName('td');
const info1 = document.getElementById('player-info1');
const info2 = document.getElementById('player-info2');
const colors1 = document.getElementById('colors');
const colors2 = document.getElementById('colors2');
const scoreXElem = document.getElementById('point1');
const scoreOElem = document.getElementById('point2');
const msgWindow = document.getElementById('msg-window');
const wrapper = document.getElementById('wrapper');

let scoreO = 0;
let scoreX = 0;
let gamePause = false;
// const player1Name = prompt("Player 1 name");
// const player2Name = prompt("Player 2 name");
function addColorTab(elem, whoToUpdate) {
  const colors = ['red', 'green', 'blue', 'orange', 'purple', 'pink'];

  for (let i =0; i < colors.length; i++) {
    const color = colors[i];
    btn = document.createElement('button');
    btn.style.backgroundColor = color;
    btn.style.width = 20+'px';
    btn.style.height = 20+'px';
    btn.style.border = 0;
    btn.style.margin = 2+'px';
    btn.addEventListener('click', function() {
      const elem = this;

      if(whoToUpdate == 'player1') {
        currentColor1 = elem.style.backgroundColor;
      } else if (whoToUpdate == 'player2') {
        currentColor2 = elem.style.backgroundColor;
      }
    });
    elem.appendChild(btn);
  }
}

addColorTab(colors1, 'player1');
addColorTab(colors2, 'player2');

let gameGrid = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function onGameSectionSelect(elem) {
  if (!this.innerHTML && !gamePause) {
    gameGrid[elem.target.parentElement.id][elem.target.id] = currentPlayer;

    if (currentPlayer == playerX) {
      this.innerHTML = `<span class="player" style="color:${currentColor1}">${playerX}</span>`;
    } else {
      this.innerHTML = `<span class="player" style="color:${currentColor2}">${playerO}</span>`;
    }
    this.classList.add('shadow');
    updatePlayerInfo();
    checkWhoseDiiiya();

    const winner = geGameWinner();
    if (winner !== null) {
      gamePause = true;
      if (winner == playerO) {
        scoreO++;
        scoreOElem.innerHTML = `Points: ${scoreO}`;
        askToRestart(`Player 1 (${playerO}) Won, Restart ?`);
      } else if (winner == playerX) {
        scoreX++;
        scoreXElem.innerHTML = `Points: ${scoreX}`;
        askToRestart(`Player 1 (${playerX}) Won, Restart ?`);
      } else if (winner == 'draw') {
        askToRestart("Game Graw, Restart ?");
      }
    }
  }
}

function askToRestart(msg) {
  wrapper.style.filter = 'blur(5px)';
  msgWindow.innerHTML = `
    <div>
      <div>
        ${msg}
      </div>
      <div>
      Player 1 Score ${scoreX}
      </div>
      <div>
      Player 2 Score ${scoreO}
      </div>
      <div>
      </div>
      <div>
        <button id="restartButton">Restart</button>
      </div>
    </div>
  `
  document.getElementById("restartButton").addEventListener("click", onRestart);
  function onRestart() {
    msgWindow.innerHTML = null;
    wrapper.style.filter = '';
    currentPlayer = playerX;
    gamePause = false;
    gameGrid = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
    Array.from(allTd).forEach(td => {
      td.innerHTML = null;
      td.classList.remove("shadow");
    });
  }
}

Array.from(allTd).forEach(td => td.addEventListener('click', onGameSectionSelect))

function updatePlayerInfo() {
  if (currentPlayer == playerX) {
    _updatePlayerInfo(info1)
    _updatePlayerInfo(info2, true);
  } else {
    _updatePlayerInfo(info2)
    _updatePlayerInfo(info1, true);
  }
}

function _updatePlayerInfo(elem, shouldRemove) {
  elem.style.color = shouldRemove? 'black' : 'white';
  elem.style.backgroundColor = shouldRemove ? 'white': 'black';
}

function checkWhoseDiiiya() {
  if (currentPlayer == playerO) {
    currentPlayer = playerX;
  } else {
    currentPlayer = playerO;
  }
}

function geGameWinner() {
  // row win
  for (let i = 0, len = gameGrid.length; i < len; i++) {
    const row = gameGrid[i];
    // row win
    if (notBlank(row[0]) && row[0] == row[1] && row[1] == row[2]) {
      return gameGrid[0][i];
    }
    //column win
    if (notBlank(gameGrid[0][i]) && gameGrid[0][i] == gameGrid[1][i]
      && gameGrid[1][i] == gameGrid[2][i]) {
      return gameGrid[0][i];
    }
  }
  //diagonal win
  if (notBlank(gameGrid[0][0]) && gameGrid[0][0] == gameGrid[1][1]
    && gameGrid[1][1] == gameGrid[2][2]) {
    return gameGrid[0][0];
  }
  if (notBlank(gameGrid[2][0]) && gameGrid[2][0] == gameGrid[1][1]
    && gameGrid[1][1] == gameGrid[0][2]) {
    return gameGrid[2][0];
  }

  // draw
  for (let i =0; i < gameGrid.length; i++) {
    const row = gameGrid[i];
    for (let j = 0; j < row.length; j++) {
      if (row[j] == null) {
        return null;
      }
    }
  }
  return 'draw';
}

function notBlank(block) {
  return block !== null;
}