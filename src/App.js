import React from "react"
import Card from "./Card"
import Page from "./Page"

import './css/App.css';

function App() {
  const [gameState, setGameState] = React.useState("IDLE");
  const [gameTurns, setGameTurns] = React.useState(1);
  const [gamePoints, setGamePoints] = React.useState(0);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState([]);
  const [matchedPair, setMatchedPair] = React.useState(0);
  const [canSelect, setCanSelect] = React.useState(true);

  function btnStartGame(){
    setGameState("STARTED");
    setGameTurns(1);
    setGamePoints(0);
    createCards();
    setMatchedPair(0);
  }

  function flipCard(pos){
    setCards(prevData => {
      const dataCopy = [...prevData];
      let newData = dataCopy[pos];
      newData = {
        ...newData, isClicked: !newData["isClicked"]
      }
      dataCopy[pos] = newData;
      return(dataCopy);
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
        setTimeout(() => {
          setCards(prevData => {
            const dataCopy = [...prevData];
            let newData = dataCopy[selectedCard[0]["id"]];
            newData = {
              ...newData, isMatched: true
            }
            dataCopy[selectedCard[0]["id"]] = newData;
  
            newData = dataCopy[selectedCard[1]["id"]];
            newData = {
              ...newData, isMatched: true
            }
            dataCopy[selectedCard[1]["id"]] = newData;
            setCanSelect(true);
            return(dataCopy);
          })
        }, 500)
        let multiplier = 30 - gameTurns > 1 ? 30 - gameTurns : 1;
        setGamePoints(prevData => prevData + multiplier * 10);
        setMatchedPair(prevData => prevData + 1);
      }else{
        setTimeout(() => {
          flipCard(selectedCard[0]["id"]);
          flipCard(selectedCard[1]["id"]);
          setCanSelect(true);
        }, 500); // set delay for 250ms
      }
      setGameTurns(prevData => prevData + 1);
      setSelectedCard([]);
    }
  }, [selectedCard, gameTurns]);

  function cardClicked(event, pos){
    if (!cards[pos]["isClicked"] && !cards[pos]["isMatched"] && canSelect){
      flipCard(pos);
      setSelectedCard([...selectedCard, cards[pos]]);
      if (selectedCard.length === 1){
        setCanSelect(false);
      }
    }
  }

  function createCards(){
    const images = [
      "https://media.discordapp.net/attachments/1031057018250862592/1089633738742300773/img-1.jpg?width=447&height=671",
      "https://media.discordapp.net/attachments/1031057018250862592/1089633738960425071/img-2.jpg?width=460&height=671",
      "https://media.discordapp.net/attachments/1031057018250862592/1089633739212066977/img-3.jpg?width=537&height=671",
      "https://media.discordapp.net/attachments/1031057018250862592/1089633739434360972/img-4.jpg?width=447&height=671",
      "https://media.discordapp.net/attachments/1031057018250862592/1089633739660873838/img-5.jpg?width=447&height=671",
      "https://media.discordapp.net/attachments/1031057018250862592/1089633438920876093/felipe-salgado-EaM_OfXyxSk-unsplash.jpg?width=447&height=671"
    ];
    // create a list of 12 cards
    const newCards = [];
    const prevNum = [];
    while (newCards.length !== 12){
      let num = Math.floor(Math.random() * 12) + 1;;
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
            <button className="btn-start" onClick={btnStartGame} style={{"marginTop": "50px"}}>RESTART GAME</button>
          </div>
        }
      </main>
  );
}

export default App;
