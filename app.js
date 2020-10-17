const playerX = 'X';
const playerO = 'O';
let currentPlayer = playerX;
const allTd = document.getElementsByTagName('td');
const info = document.getElementById('player-info');
Array.from(allTd).forEach(td => {
  td.addEventListener('click', function() {
    if (!this.innerHTML) {
      this.innerHTML = `<div class="player">${currentPlayer}</div>`;
      updatePlayerInfo();
      checkWhoseDiiiya();
    }
  });
})

function updatePlayerInfo() {
  info.innerHTML = `<h4> Player ${currentPlayer}</h4>`
}

function checkWhoseDiiiya() {
  if (currentPlayer == playerO) {
    currentPlayer = playerX;
  } else {
    currentPlayer = playerO;
  }
}