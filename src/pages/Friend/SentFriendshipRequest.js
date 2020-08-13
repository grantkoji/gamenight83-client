import React from 'react';
import { withRouter } from 'react-router-dom'
import * as action from '../../modules/actionCreators/actionCreators'
import {connect} from 'react-redux'
import * as requests from '../../requests'

const SentFriendshipRequest = props => {
    const{name, url, userId, setShowUser, id, removeFriendshipRequest} = props
    
    const redirectToUserPage = () => {
        setShowUser(userId)
      // props.history.push(`users/${resp.user.id}`)
      props.history.push(`/users/${name.replace(/\s+/g, '')}`)
    }
  
    const cancelFriendRequest = () => {
        let newUserOutgoingFR = props.currentUserOutgoingFR.filter(fr => fr.id !== id)
        props.setCurrentUserOutgoingFR(newUserOutgoingFR)
        removeFriendshipRequest(id)
        requests.fetchRemoveFriendshipRequest(id)
    }
    return(
        <div class="ui cards">
            <div class="card">
                <div class="content">
                    {url !== '' &&
                    <img class="right floated mini ui image" src={url} />}
                    {url === '' &&
                    <img class="right floated mini ui image" src="https://banner2.cleanpng.com/20180403/dje/kisspng-question-mark-computer-icons-clip-art-question-mark-5ac3de9116dec4.9390654415227859370937.jpg" />}    
                    <div class="header" onClick={redirectToUserPage}>
                        {name}
                    </div>
                    <div class="description">
                        You sent a friend request to {name}
                    </div>
                </div>
                <div class="extra content">
                    <div class="ui two buttons">
                        <div class="ui basic red button" onClick={cancelFriendRequest}>Cancel Request</div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}


const mapDispatchToProps = dispatch => {
    return {
      setShowUser: (userId) => dispatch(action.setShowUser(userId)),
      removeFriendshipRequest: (id) => dispatch(action.removeFriendshipRequest(id))
    }
  }

export default withRouter(connect(null, mapDispatchToProps)(SentFriendshipRequest))