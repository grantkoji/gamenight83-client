import React, {useState} from 'react';
import * as action from '../../modules/actionCreators/actionCreators'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'

const GamePhotoCard = props => {
    let [toggleFront, setToggleFront] = useState(true);
    const {id, game_title, user_name, user_id, game_id, caption, likes} = props
    


    const addLike = () => {
        console.log('like added')
    }


    const redirectToGame = () => {
        props.setCurrentGame(game_id)
        localStorage.gameId = game_id
        props.history.push(`/games/${game_id}`)
    }

    const redirectToUser = () => {
        props.setShowUser(props.user_id)
        props.history.push(`/users/${props.user_id}`)
        // props.history.push(`users/${props.username.replace(/\s+/g, '')}`)
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


const mapDispatchToProps = dispatch => {
    return {
      setShowUser: (userId) => dispatch(action.setShowUser(userId)),
      setCurrentGame: (gameId) => dispatch(action.setCurrentGame(gameId))
    }
  }
  
  export default withRouter(connect(null, mapDispatchToProps)(GamePhotoCard));


