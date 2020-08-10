
import React from 'react';
import { withRouter } from 'react-router-dom'
import * as action from '../../modules/actionCreators/actionCreators'
import {connect} from 'react-redux'

const GameCard = props => {
    
    const {title, min_age, min_num_players, max_num_players, id, setCurrentGame} = props
    
   
    const redirectToGame = () => {
        setCurrentGame(id)
        props.history.push(`/games/${id}`)
    }


    return (
        <div>
            <img src={props["image_url"]} alt={title} />
            <div>{title}</div>
            <div>Minimum # Players: {min_num_players}</div>
            <div>Maximum # Players: {max_num_players}</div>
            <div>Minimum Age: {min_age}</div>
            <button onClick={redirectToGame}>Game: {title}</button>
        </div>
    )
}



const mapDispatchToProps = dispatch => {
    return {
        setCurrentGame: (gameId) => dispatch(action.setCurrentGame(gameId))
    }
  }
  
export default withRouter(connect(null, mapDispatchToProps)(GameCard));
