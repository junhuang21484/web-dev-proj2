import React from "react"
import Card from "./Card"
import Page from "./Page"

import './css/App.css';

function App() {
  const [gameState, setGameState] = React.useState("RESULT");
  const [gameTurns, setGameTurns] = React.useState(1);
  const [gamePoints, setGamePoints] = React.useState(0);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState([]);
  const [matchedPair, setMatchedPair] = React.useState(0);

  function btnStartGame(){
    setGameState("STARTED")
    setGameTurns(1);
    setGamePoints(0);
    createCards();
    setMatchedPair(0);
  }

  function btnResetGame(){
    setGameState("IDLE")
  }

  function flipCard(pos){
    setCards(prevData => {
      const dataCopy = [...prevData];
      let newData = dataCopy[pos];
      newData = {
        ...newData, isClicked: !newData["isClicked"]
      }
      dataCopy[pos] = newData
      return(dataCopy)  
    })
  }

  React.useEffect(() => {
    if (matchedPair === 6){
      setGameState("RESULT");
    }
  }, [matchedPair])

  React.useEffect(() => {
    if (selectedCard.length === 2){
      if (selectedCard[0]["img"] === selectedCard[1]["img"]){
        setCards(prevData => {
          const dataCopy = [...prevData];
          let newData = dataCopy[selectedCard[0]["id"]];
          newData = {
            ...newData, isMatched: true
          }
          dataCopy[selectedCard[0]["id"]] = newData

          newData = dataCopy[selectedCard[1]["id"]];
          newData = {
            ...newData, isMatched: true
          }
          dataCopy[selectedCard[1]["id"]] = newData
          return(dataCopy)  
        })
        let multiplier = 30 - gameTurns > 1 ? 30 - gameTurns : 1
        setGamePoints(prevData => prevData + multiplier * 10);
          
        setMatchedPair(prevData => prevData + 1);
      }else{
        setTimeout(() => {
          flipCard(selectedCard[0]["id"]);
          flipCard(selectedCard[1]["id"]);
        }, 500); // set delay for 1 second (1000 milliseconds)
      }
      setGameTurns(prevData => prevData + 1);
      setSelectedCard([]);
    }
  }, [selectedCard, gameTurns]);

  function cardClicked(event, pos){
    if (!cards[pos]["isClicked"] && !cards[pos]["isMatched"]){
      flipCard(pos);
      setSelectedCard([...selectedCard, cards[pos]]);
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
        {gameState === "IDLE" || gameState === "RESULT" ?
          <Page 
            gameStatus={gameState}
            gameTurns={gameTurns}
            gamePoints={gamePoints}
            funcStartGame={btnStartGame}
          />
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
