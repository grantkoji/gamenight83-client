
import React from 'react';
import { withRouter } from 'react-router-dom'
import * as action from '../../modules/actionCreators/actionCreators'
import {connect} from 'react-redux'

const GameUserCard = props => {
    
    const {title, min_age, min_num_players, max_num_players, id, setCurrentGame} = props
    
   
    const redirectToGame = () => {
        setCurrentGame(id)
        localStorage.gameId = id
        props.history.push(`/games/${id}`)
    }


    return (
        <div>
            <img src={props["image_url"]} alt={title} />
            <div>{title}</div>
            <button>Post a Photo</button>
            <button>Write a Review</button>
            <button onClick={redirectToGame}>Game: {title}</button>
        </div>
    )
}



const mapDispatchToProps = dispatch => {
    return {
        setCurrentGame: (gameId) => dispatch(action.setCurrentGame(gameId))
    }
  }
  
export default withRouter(connect(null, mapDispatchToProps)(GameUserCard));
