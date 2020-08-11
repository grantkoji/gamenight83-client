
import React from 'react';
import { withRouter } from 'react-router-dom'
import * as action from '../../modules/actionCreators/actionCreators'
import {connect} from 'react-redux'

const GameUserCard = props => {
    
    const {title, setThisGameId, setThisGameTitle, setPostType, id, setCurrentGame} = props
                             
    const handlePhoto = () => {
        setThisGameId(id)
        setThisGameTitle(title)
        setPostType('photo')
    }

    const handleReview = () => {
        setThisGameId(id)
        setThisGameTitle(title)
        setPostType('review')
    }

    const redirectToGame = () => {
        setCurrentGame(id)
        localStorage.gameId = id
        props.history.push(`/games/${id}`)
    }


    return (
        <div>
            <img src={props["image_url"]} alt={title} />
            <div>{title}</div>
            <button onClick={handlePhoto}>Post a Photo</button>
            <button onClick={handleReview}>Write a Review</button><br/>
            <button onClick={redirectToGame}>Visit Page for {title}</button>
        </div>
    )
}



const mapDispatchToProps = dispatch => {
    return {
        setCurrentGame: (gameId) => dispatch(action.setCurrentGame(gameId))
    }
  }
  
export default withRouter(connect(null, mapDispatchToProps)(GameUserCard));
