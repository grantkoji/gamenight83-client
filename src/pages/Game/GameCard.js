
import React from 'react';

const GameCard = props => {
    
    const {title} = props

    return (
        <div>
            <img src={props["image_url"]} alt={title} />
            <div>{title}</div>
        </div>
    )
}

export default GameCard