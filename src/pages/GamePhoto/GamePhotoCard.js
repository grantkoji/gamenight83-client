import React, {useState} from 'react';


const GamePhotoCard = props => {
    let [toggleFront, setToggleFront] = useState(true);
    const {id, game_title, user_name, user_id, game_id, caption, likes} = props
    


    const addLike = () => {
        console.log('like added')
    }


    const redirectToGame = () => {
        console.log('game clicked')
        // props.history.push('./games/:id')
    }

    const redirectToUser = () => {
        console.log('user clicked')
        // props.history.push('./games/:id')
    }

    const renderFront = () => {
        return (
            <div>
                <div onClick={() => setToggleFront(prevtoggleFront => !prevtoggleFront)}>
                    <img src={props["image_url"]} alt={game_title} />
                </div>
                <button onClick={addLike}>❤️ {likes}</button>
            </div>
        )

    }

    const renderBack = () => {  
        return (  
            <div onClick={() => setToggleFront(prevtoggleFront => !prevtoggleFront)}>
                <img src={props["image_url"]} alt={game_title} />
                <div>{caption}</div>
                <button onClick={redirectToGame}>Game: {game_title}</button>
                <button onClick={redirectToUser}>By {user_name}</button>
            </div>
        )
    }




    return (
        <div>
            {toggleFront
            ? renderFront()
            : renderBack()}
        </div>
    )  



}

export default GamePhotoCard

