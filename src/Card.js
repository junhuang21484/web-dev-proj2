import React from "react"
import './css/Card.css';

/*
Props contain the following:
    - key [int]: Position of card inside the array
    - data [obj]:
        - isClicked [bool]: Clicked or not
        - isMatched [bool]: Matched or not
        - img [string]: A link to an image
    - handleClick [func]: A function that handle the click of image
*/
function Card(props){
    const cover_img = "https://media.discordapp.net/attachments/1031057018250862592/1089632280022093965/img-cover.jpg?width=447&height=671";
    return (
        props.data.isMatched ? 
            <div className="card-container fade-out">
                <img className="card-img-disabled" alt="card" src={props.data.img}></img>
            </div> 
            :
            <div className="card-container" onClick={(event) => props.handleClick(event, props.data.id)}>
                <img className="card-img" alt="card" src={props.data.isClicked ? props.data.img : cover_img}></img>
            </div>
    );
}

export default Card;