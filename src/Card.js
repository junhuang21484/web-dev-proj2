import React from "react"
import './css/Card.css';

/*
Props contain the followng:
    - id [int]: The pos in array before shuffle
    - index [int]: The pos in array after shuffle
    - pair_id [int]: The other card with same img
    - isClicked [bool]: Clicked or not
    - isMatched [bool]: Matched or not
    - img [string]: A link to an image
*/
function Card(props){
    const cover_img = "Images/img-cover.jpg"
    return (
        <div className="card-container">
            <img className="card-img" alt="card" src={props.isClicked ? props.img : cover_img}></img>
        </div>
    );
}

export default Card;