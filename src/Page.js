import React from "react"
import './css/App.css';

/*
Props contain the following:
    - gameStatus [string]: IDLE/STARTED/RESULT
    - gameTurns [int]: Game turns
    - gamePoints [int]: Game points
    - funcStartGame [func]: Function to start the game
*/
function Page(props){
    if (props.gameStatus === "RESULT"){
        return (
            <div className="result-page-container">
                <h1>Congratulation! You Have WON!!!</h1>
                <h3>You finished the game in {props.gameTurns} turns!</h3>
                <h3>The total points you have gotten is {props.gamePoints}.</h3>
                <button className="btn-start" onClick={props.funcStartGame}>NEW GAME</button>
            </div>
        )
    }else {
        return (
            <div className="idle-page-container">
                <h2>Rules</h2>
                <p>
                This is the Memory Game! When you press the start game button, a board containing 12 cards will appear. <br></br>
                Click on them to flip them over. If both of the flipped cards match, they will be eliminated.  <br></br>
                The goal is to eliminate as many pairs of cards as possible within the least amount of turns and the shortest  <br></br>
                amount of time. A statistics tracker will show up after you start the game, displaying your performance in terms of time <br></br>
                taken and number of turns. If you're ready, let's go!
                </p>
                <button className="btn-start" onClick={props.funcStartGame}>START GAME</button>
            </div>
        )
    }
}

export default Page;