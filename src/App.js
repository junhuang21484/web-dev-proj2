import React from "react"
import Card from "./Card"

import './css/App.css';

function App() {
  const [gameState, setGameState] = React.useState("IDLE");
  const [gameTurns, setGameTurns] = React.useState(1);
  const [gamePoints, setGamePoints] = React.useState(0);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState([]);

  function btnStartGame(){
    setGameState("STARTED")
    setGameTurns(1);
    setGamePoints(0);
    createCards();
  }

  function btnResetGame(){
    setGameState("IDLE")
  }

  function cardClicked(event, pos){
    if (!cards[pos]["isClicked"] && !cards[pos]["isMatched"]){
      setCards(prevData => {
        const dataCopy = [...prevData];
        let newData = dataCopy[pos];
        newData = {
          ...newData, isClicked: true
        }
        dataCopy[pos] = newData
        return(dataCopy)  
      })
    
      setSelectedCard(prevData => [...prevData, cards[pos]]);
      if (selectedCard.length == 2){
        if (selectedCard[0]["img"] == selectedCard[1]["img"]){

        }
        setGameTurns(prevData => prevData + 1);
        setSelectedCard([]);
      }
    }
  }

  function createCards(){
    const images = [
      "Images/img-1.jpg",
      "Images/img-2.jpg",
      "Images/img-3.jpg",
      "Images/img-4.jpg",
      "Images/img-5.jpg",
      "Images/img-6.jpg"
    ];
    // create a list of 12 cards
    const newCards = [];
    const prevNum = [];
    while (newCards.length !== 12){
      let num = Math.floor(Math.random() * 12) + 1;
      if (!prevNum.includes(num)){
        const imageIndex = num % 6;
        newCards.push(
          {
            id: prevNum.length,
            isClicked: false,
            isMatched: false,
            img: images[imageIndex],
          }
        );

        prevNum.push(num);
      }
    }
    setCards(newCards);
  }

  const cardCell = cards.map((cardData) => {
    return (
      <Card
        key={cardData.id}
        data={cardData}
        handleClick={cardClicked}
      />
    );
  });

  return (
      <main>
        <h1 className="page-title">MEMORY GAME</h1>
        {gameState === "IDLE" ?
          <div className="idle-page-container">
            <h2>Rules</h2>
            <p>
              This is the Memory Game! When you press the start game button, there will be a board <br></br>
              containing 16 cards that appear, click on them to flip them. If both of the flipped card matched it will <br></br>
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
            <div className="game-board-container">
              {cardCell}
            </div>
            <button className="btn-start" onClick={btnResetGame} style={{"marginTop": "50px"}}>RESTART GAME</button>
          </div>
        }
      </main>
  );
}

export default App;
