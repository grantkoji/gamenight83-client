import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom'
import * as action from '../../modules/actionCreators/actionCreators'
import {connect} from 'react-redux'
import * as requests from '../../requests'

const SentFriendshipRequest = props => {
    const{name, userId, setShowUser, id, removeFriendRequest, currentUser, users} = props
    let [requestedFRUser, setRequestedFRUser] = useState({})
    useEffect(()=> {
        let thisRequestedFRUser = users.find(user => user.id === userId)
        setRequestedFRUser(thisRequestedFRUser)
    }, [])

    useEffect(()=> {
        let thisRequestedFRUser = users.find(user => user.id === userId)
        setRequestedFRUser(thisRequestedFRUser)
        console.log(thisRequestedFRUser["profile_url"])
    }, [users, userId])
    
    const redirectToUserPage = () => {
        setShowUser(userId)
      // props.history.push(`users/${resp.user.id}`)
      props.history.push(`/users/${name.replace(/\s+/g, '')}`)
    }
  
    const cancelFriendRequest = () => {
        removeFriendRequest(userId, currentUser.id)
        requests.fetchRemoveFriendshipRequest(id)
    }

    return(
        <div class="ui cards">
            <div class="card">
                <div class="content">
                    {requestedFRUser && requestedFRUser["profile_url"] && requestedFRUser["profile_url"] !== '' ?
                    <img class="right floated mini ui image" src={requestedFRUser["profile_url"]} />
                    : null}
                    {requestedFRUser && requestedFRUser["profile_url"] && requestedFRUser["profile_url"] === '' ?
                    <img class="right floated mini ui image" src="https://banner2.cleanpng.com/20180403/dje/kisspng-question-mark-computer-icons-clip-art-question-mark-5ac3de9116dec4.9390654415227859370937.jpg" />
                    : null}    
                    <div class="header" onClick={redirectToUserPage}>
                        {requestedFRUser && requestedFRUser.username ? requestedFRUser.username : null}
                    </div>
                    <div class="description">
                        You sent a friend request to {requestedFRUser && requestedFRUser.username ? requestedFRUser.username : null}
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



const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        users: state.users
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
      setShowUser: (userId) => dispatch(action.setShowUser(userId)),
      removeFriendRequest: (userReceiveId, userSentId) => dispatch(action.removeFriendRequest(userReceiveId, userSentId))
    }
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SentFriendshipRequest))
