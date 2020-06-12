import React, { useState, useEffect, useRef } from "react";
import "./card.css";


const Card = ({ card, comments }) => {

    return (
        <div className={'card'}>
            <div className={'card__title'}>{card.title}</div>
            <div className={'card__badges'}>
                {comments.length > 0 && <div className={'badges_comment'}>{comments.length}</div>}
            </div>
        </div>
    );
};

export default Card;