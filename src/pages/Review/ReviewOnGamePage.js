import React from 'react';
import * as action from '../../modules/actionCreators/actionCreators'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'

const ReviewOnGamePage = props => {
    

    const {game_photo, game_title, user_name, num_stars, content, id, user_id, game_id} = props

    const redirectToUser = () => {
        props.setShowUser(user_id)
        // props.history.push(`/users/${user_id}`)
        props.history.push(`/users/${props.username.replace(/\s+/g, '')}`)
    }
     
        return (
            <div>
                <div>
                    <div>by: {user_name}</div>
                    <div>{num_stars}</div>
                    <div>{content}</div>
                </div>
                <button onClick={redirectToUser}>Visit {user_name}</button>
            </div>
        ) 
}

const mapDispatchToProps = dispatch => {
    return {
      setShowUser: (userId) => dispatch(action.setShowUser(userId))
    }
  }
  
  export default withRouter(connect(null, mapDispatchToProps)(ReviewOnGamePage));