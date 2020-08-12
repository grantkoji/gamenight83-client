
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

    

    return (
        <div className="ui card">
            <div className="image">
                <img src={props["image_url"]} alt={title}/>
            </div>
            <div className="content">
                <a className="header" onClick={redirectToGame}>{title}</a>
            </div>
            <div className="description">
                <Button variant="outline-info" onClick={handlePhoto}>Post a Photo</Button>
                <Button variant="outline-info" onClick={handleReview}>Write a Review</Button><br/>
            </div>
            <div className="extra content">
                <Button variant='outline-info' onClick={redirectToGame}>Visit Page for {title}</Button>    
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
