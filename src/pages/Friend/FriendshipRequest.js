
import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom'
import * as action from '../../modules/actionCreators/actionCreators'
import {connect} from 'react-redux'
import * as requests from '../../requests'

const FriendshipRequest = props => {
    


    const{userId, setShowUser, id, token, addFriendshipTwoUsers, removeFriendRequest, users, currentUser} = props

    let [requestedFRUser, setRequestedFRUser] = useState({})
    useEffect(()=> {
        let thisRequestedFRUser = users.find(user => user.id === userId)
        setRequestedFRUser(thisRequestedFRUser)
    }, [])

    useEffect(()=> {
        let thisRequestedFRUser = users.find(user => user.id === userId)
        setRequestedFRUser(thisRequestedFRUser)
    }, [users, userId])

    const redirectToUserPage = () => {
    setShowUser(userId)
      // props.history.push(`users/${resp.user.id}`)
      props.history.push(`/users/${requestedFRUser.username.replace(/\s+/g, '')}`)

    }
    
    const acceptFriendRequest = () => {
        let addedFriendUser = users.find(user => user.id === userId)
        removeFriendRequest(currentUser.id, userId)
        let sentCurrentUser = {
                                id: currentUser.id, 
                                name: currentUser.name, 
                                username: currentUser.username, 
                                age: currentUser.age, 
                                fav_games: currentUser.fav_games, 
                                profile_url: currentUser.profile_url
                            }
        let receivedCurrentUser = {
                                    id: addedFriendUser.id, 
                                    name: addedFriendUser.name, 
                                    username: addedFriendUser.username, 
                                    age: addedFriendUser.age, 
                                    fav_games: addedFriendUser.fav_games, 
                                    profile_url: addedFriendUser.profile_url}
        
        addFriendshipTwoUsers(sentCurrentUser, receivedCurrentUser)
        requests.fetchPostAddFriendship(userId, token)
        requests.fetchRemoveFriendshipRequest(id)
    }

    
    // let removeFriendRequest = (userReceiveId, userSentId) => ({type: 'REMOVE_FRIEND_REQUEST', payload: {userReceiveId: userReceiveId, userSentId: userSentId}})
    const declineFriendRequest = () => {
        removeFriendRequest(currentUser.id, userId)
        requests.fetchRemoveFriendshipRequest(id)
    }
    return(
        <div class="ui cards">
            { setRequestedFRUser && null}
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
                    {requestedFRUser && requestedFRUser.username ? requestedFRUser.username : null} wants to add you as a friend
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
      addFriendshipTwoUsers: (user1, user2) => dispatch(action.addFriendshipTwoUsers(user1, user2)),
      removeFriendRequest: (userReceiveId, userSentId) => dispatch(action.removeFriendRequest(userReceiveId, userSentId))
    }
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FriendshipRequest))


// let addFriendRequest = (frId, userReceiveId, userSent) => ({type: 'ADD_FRIEND_REQUEST', payload: {frId: frId, userReceiveId: userReceiveId, userSent: userSent}})
// // let addFriendRequestSent = (frId, user) => ({type: 'ADD_FRIEND_REQUEST_SENT', payload: {frId: frId, user_id: user_id}})
// // let removeFriendRequestReceived = (frId, user_id) => ({type: 'REMOVE_FRIEND_REQUEST_RECEIVED', payload: {frId: frId, user_id: user_id}})
// let removeFriendRequest = (userReceiveId, userSentId) => ({type: 'REMOVE_FRIEND_REQUEST', payload: {userReceiveId: userReceiveId, userSentId: userSentId}})
// let addFriendshipTwoUsers = (user1, user2) => ({type: 'ADD_ACCEPTED_FRIENDSHIP', payload: {user1: user1, user2: user2}})
// let removeFriendshipTwoUsers = (user1Id, user2Id) => ({type: 'REMOVE_FRIENDSHIP', payload: {user1Id: user1Id, user2Id: user2Id}})
