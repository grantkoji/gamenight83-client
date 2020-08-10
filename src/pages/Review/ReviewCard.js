import React, {useState} from 'react';
import * as action from '../../modules/actionCreators/actionCreators'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'


const ReviewCard = props => {
    
    let [toggleFront, setToggleFront] = useState(true);
    const {game_photo, game_title, user_name, num_stars, content, id, user_id, game_id} = props

    const renderFront = () => {
        return (
            <div onClick={() => setToggleFront(prevtoggleFront => !prevtoggleFront)}>
                <img src={game_photo} alt={game_title}/>
                <div>by: {user_name}</div>
                <div>{num_stars}</div>
            </div>
        )

    }

    const redirectToGame = () => {
        props.setCurrentGame(game_id)
        localStorage.gameId = game_id
        props.history.push(`/games/${game_id}`)
    }

    const redirectToUser = () => {
        props.setShowUser(user_id)
        props.history.push(`/users/${user_id}`)
        // props.history.push(`users/${props.username.replace(/\s+/g, '')}`)
    }

    const renderBack = () => {  
        return (
            <div>
                <div onClick={() => setToggleFront(prevtoggleFront => !prevtoggleFront)}>
                    <div>Review:</div>
                    <div>Game: {game_title}</div>
                    <div>by: {user_name}</div>
                    <div>{num_stars}</div>
                    <div>{content}</div>
                </div>
                <button onClick={redirectToGame}>Go to {game_title}</button>
                <button onClick={redirectToUser}>Visit {user_name}</button>
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
  
  export default withRouter(connect(null, mapDispatchToProps)(ReviewCard));
