import React from 'react';
import * as action from '../../modules/actionCreators/actionCreators'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import ReactStars from "react-rating-stars-component";

const ReviewOnGamePage = props => {
    

    const {game_photo, game_title, user_name, num_stars, content, id, user_id, game_id} = props

    const redirectToUser = () => {
        props.setShowUser(user_id)
        // props.history.push(`/users/${user_id}`)
        props.history.push(`/users/${props.user_name.replace(/\s+/g, '')}`)
    }

    const changePointer = (e) => {  
        e.target.style.cursor = 'pointer'
    }
     
        return (
            <div>
                <div>
                    <div onClick={redirectToUser} onMouseOver={changePointer}>by: {user_name}</div>
                    <ReactStars count={5} value={num_stars} size={18}/>
                    <div>{content}</div>
                </div>
            </div>
        ) 
}

const mapDispatchToProps = dispatch => {
    return {
      setShowUser: (userId) => dispatch(action.setShowUser(userId))
    }
  }
  
  export default withRouter(connect(null, mapDispatchToProps)(ReviewOnGamePage));