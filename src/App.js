import React from "react"
import './css/App.css';

function App() {
  const [gameState, setGameState] = React.useState("IDLE");
  const [gameTurns, setGameTurns] = React.useState(1);
  const [gamePoints, setGamePoints] = React.useState(0);

  function btnStartGame(){
    setGameState("STARTED")
    setGameTurns(1);
    setGamePoints(0);
  }

  function btnResetGame(){
    setGameState("IDLE")
  }

  return (
      <main>
        <h1 className="page-title">MEMORY GAME</h1>
        {gameState === "IDLE" ?
          <div className="idle-page-container">
            <h2>Rules</h2>
            <p>
              This is the Memory Game! When you press the start game button, there will be a board <br></br>
              containing 20 cards that appear, click on them to flip them. If both of the flipped card matched it will <br></br>
              gets eliminated. The goal to to elimante as much pairs of cards as possible within the least <br></br>
              amount of turns and least amount of time. There will be a stat tracker that shows up after you start the <br></br>
              game. If you are ready then lets go!
            </p>
            <button className="btn-start" onClick={btnStartGame}>START GAME</button>
          </div>
          :
          <div className="game-container">
            <div className="stat-container">
              <h3>Turns: {gameTurns}</h3>
              <h3>Points: {gamePoints}</h3>
            </div>
            <div class="game-board-container">
              <div class="cell">1</div>
              <div class="cell">2</div>
              <div class="cell">3</div>
              <div class="cell">4</div>
              <div class="cell">5</div>
              <div class="cell">6</div>
              <div class="cell">7</div>
              <div class="cell">8</div>
              <div class="cell">9</div>
              <div class="cell">10</div>
              <div class="cell">11</div>
              <div class="cell">12</div>
              <div class="cell">13</div>
              <div class="cell">14</div>
              <div class="cell">15</div>
              <div class="cell">16</div>
            </div>
            <button className="btn-start" onClick={btnResetGame} style={{"margin-top": "50px"}}>RESTART GAME</button>
          </div>
        }
      </main>
  );
}

export default App;
