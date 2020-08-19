
import React from 'react';
import { withRouter } from 'react-router-dom'
import * as action from '../../modules/actionCreators/actionCreators'
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap'

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
    
    const handleSchedule = () => {
        setThisGameId(id)
        setThisGameTitle(title)
        setPostType('scheduleGame')
    }

    // <div className="ui card game-user-card">
    // <div className="image">
    //     <img src={props["image_url"]} alt={title}/>
    // </div>

    return (
        <div className="ui card">
            <div className="image">
                <img src={props["image_url"]} alt={title}/>
            </div>
            <div className="content">
                <a className="header" onClick={redirectToGame}>{title}</a>
            </div>
            <div className="description">
                <Button variant="outline-info" size="sm" onClick={handlePhoto}>Post a Photo</Button>
                <Button variant="outline-info" size="sm" onClick={handleReview}>Write a Review</Button>
            </div>
            <div className="extra content">
                <Button variant='outline-info' size="sm" onClick={redirectToGame}>Visit Game Page</Button>    
                <Button variant='outline-info' size="sm" onClick={handleSchedule}>Schedule Game</Button>    
            </div>  
    </div>  
    )
}



const mapDispatchToProps = dispatch => {
    return {
        setCurrentGame: (gameId) => dispatch(action.setCurrentGame(gameId))
    }
  }
  
export default withRouter(connect(null, mapDispatchToProps)(GameUserCard));
