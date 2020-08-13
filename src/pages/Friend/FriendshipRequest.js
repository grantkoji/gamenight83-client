
import React from 'react';
import { withRouter } from 'react-router-dom'
import * as action from '../../modules/actionCreators/actionCreators'
import {connect} from 'react-redux'
import * as requests from '../../requests'

const FriendshipRequest = props => {
    


    const{name, url, userId, setShowUser, id, token, addFriendship, removeFriendshipRequest, users} = props

    const redirectToUserPage = () => {
    setShowUser(userId)
      // props.history.push(`users/${resp.user.id}`)
      props.history.push(`/users/${name.replace(/\s+/g, '')}`)

    }
   
  
 

    const acceptFriendRequest = () => {
        let newUserIncomingFR = props.currentUserIncomingFR.filter(fr => fr.id !== id)
        props.setCurrentUserIncomingFR(newUserIncomingFR)
        let newFriend = users.find(user => user.id === userId)
        let newCurrentUserFriends= [...props.currentUserFriends, newFriend]
        props.setCurrentUserFriends(newCurrentUserFriends)
        removeFriendshipRequest(id)
        requests.fetchRemoveFriendshipRequest(id)
        requests.fetchPostAddFriendship(userId, token)
        .then(friendship => addFriendship(friendship))
    }

    const declineFriendRequest = () => {
        let newUserIncomingFR = props.currentUserIncomingFR.filter(fr => fr.id !== id)
        props.setCurrentUserIncomingFR(newUserIncomingFR)
        removeFriendshipRequest(id)
        requests.fetchRemoveFriendshipRequest(id)

        {currentUser.friend_requests_received 
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
                        {name} wants to add you as a friend
                    </div>
                </div>
                <div class="extra content">
                    <div class="ui two buttons">
                        <div class="ui basic green button" onClick={acceptFriendRequest}>Approve</div>
                        <div class="ui basic red button" onClick={declineFriendRequest}>Decline</div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

const mapStateToProps = state => {
    return {
        token: state.token,
        users: state.users,
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
      setShowUser: (userId) => dispatch(action.setShowUser(userId)),
      addFriendship: (friendship) => dispatch(action.addFriendship(friendship)),
      removeFriendshipRequest: (frId) => dispatch(action.removeFriendshipRequest(frId))

    }
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FriendshipRequest))