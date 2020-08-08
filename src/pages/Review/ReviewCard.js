import React, {useState} from 'react';

const ReviewCard = props => {

    let [toggleFront, setToggleFront] = useState(true)
    const {game_photo, game_title, user_name, num_stars, content, id, user_id, game_id} = props

    const renderFront = () => {
        return (
            <div>
                <img src={game_photo} alt={game_title}/>
                <div>by: {user_name}</div>
                <div>{num_stars}</div>
            </div>
        )

    }

    const redirectToGame = () => {
        console.log('game clicked')
        // props.history.push('./games/:id')
    }

    const redirectToUser = () => {
        console.log('user clicked')
        // props.history.push('./games/:id')
    }

    <div>by: {review.game_title}</div>
    const renderBack = () => {  
        return (
            <div>
                <div>Review:</div>
                <div>Game: {game_title}</div>
                <div>by: {user_name}</div>
                <div>{num_stars}</div>
                <div>{content}</div>
                <button onClick={redirectToGame}>Go to {game_title}</button>
                <button onClick={redirectToUser}>Visit {user_name}</button>
            </div>
        )
    }




    return (
    <div onClick={() => setToggleFront(prevtoggleFront => !prevtoggleFront)}>
        {toggleFront
        ? renderFront()
        : renderBack()}
    )
    </div>
}

export default ReviewCard