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
                This is the Memory Game! When you press the start game button, there will be a board <br></br>
                containing 12 cards that appear, click on them to flip them. If both of the flipped card matched it will <br></br>
                gets eliminated. The goal to to elimante as much pairs of cards as possible within the least <br></br>
                amount of turns and least amount of time. There will be a stat tracker that shows up after you start the <br></br>
                game. If you are ready then lets go!
                </p>
                <button className="btn-start" onClick={props.funcStartGame}>START GAME</button>
            </div>
        )
    }
}

export default Page;