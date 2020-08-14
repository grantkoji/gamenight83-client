import React, {useState, useEffect} from 'react';
import * as action from '../../modules/actionCreators/actionCreators'
import {connect} from 'react-redux'
import * as requests from '../../requests'

const UserProfileCard = props => {
    const {username, id, name, fav_games, age} = props.user
    const {currentUser, addFriendRequest, token, users, removeFriendRequest, addFriendshipTwoUsers} = props
    
    let [renderPage, setRenderPage] = useState('loading')
    const acceptFriendship = () => {
        let fRInstance = currentUser.friend_requests_received.find(fr => fr.user_id === id)
        addFriendshipTwoUsers({
                                id: currentUser.id,
                                name: currentUser.name,
                                username: currentUser.username,
                                age: currentUser.age, 
                                profile_url: currentUser.profile_url,
                                fav_games: currentUser.fav_games
                            },{
                                id: id,
                                name: name,
                                username: username,
                                fav_games: fav_games,
                                age: age,
                                profile_url: props.user["profile_url"]
                            })
        removeFriendRequest(currentUser.id, id)
        requests.fetchPostAddFriendship(id, token) 
        requests.fetchRemoveFriendshipRequest(fRInstance.id)
    }
    
    
    useEffect(()=> {
        // if (currentUser && currentUser.total_friends && currentUser.total_friends.some(userFr => userFr.id === id)) {
        //     setRenderPage('youAreFriends')
        // } else if (currentUser && currentUser.friend_requests_sent && currentUser.friend_requests_sent.some(fR => fR.request_id === id)) {
        //     setRenderPage('friendshipPending')
        // }  else if (currentUser && currentUser.friend_requests_received && currentUser.friend_requests_received.some(fR => fR.user_id === id)) {
        //     setRenderPage('acceptFriendship')
        // } else {
        //     setRenderPage('requestFriendship')
        // }
    }, [])

    useEffect(() => {
        if (currentUser && currentUser.total_friends && currentUser.total_friends.some(userFr => userFr.id === id)) {
            setRenderPage('youAreFriends')
        } else if (currentUser && currentUser.friend_requests_sent && currentUser.friend_requests_sent.some(fR => fR.request_id === id)) {
            setRenderPage('friendshipPending')
        }  else if (currentUser && currentUser.friend_requests_received && currentUser.friend_requests_received.some(fR => fR.user_id === id)) {
            setRenderPage('acceptFriendship')
        } else {
            setRenderPage('requestFriendship')
        }
        console.log(renderPage)
    }, [id, users])
   

   
    const requestFriendship = () => {
        requests.fetchPostAddFRequest(token, id)
        .then(data => addFriendRequest(data.id, id, currentUser.id))
    }

 
   
    const renderBottom = () => {
        if (renderPage === 'youAreFriends') {
            return (
                <div class="extra content">
                    <a>
                        <i class="user icon"></i>
                            You are Friends
                    </a>
                </div>
            )
        } else if (renderPage === 'friendshipPending') {
            return (
                <div class="extra content">
                    <a>
                        <i class="user icon"></i>
                            Friendship Pending
                    </a>
                </div>
            )
        } else if (renderPage === 'acceptFriendship') {
            return (
                <div class="extra content" onClick={acceptFriendship}>
                    <a>
                        <i class="user icon"></i>
                            Accept Friendship
                    </a>
                </div>
            )
        } else if (renderPage === 'requestFriendship') { 
            return (
                <div class="extra content" onClick={requestFriendship}>
                    <a>
                        <i class="user icon"></i>
                            Request Friendship
                    </a>
                </div>
            )
        } else {
            return (
                <>
                </>
            )
        }
    }
  
    console.log(renderPage)
    return (
    <>
        <div class="ui card">
            <div className="image">
                { props["profile_url"] === "" 
                ? <img src="https://banner2.cleanpng.com/20180403/dje/kisspng-question-mark-computer-icons-clip-art-question-mark-5ac3de9116dec4.9390654415227859370937.jpg" alt="Question Mark" />
                : <img src={props.user["profile_url"]} alt={username} />
                }
            </div>
            <div className="content">
                <a className="header">{username}</a>
                <div class="meta">
                    <span class="date">{name}</span>
                </div>
            </div>  
            <div className="description">
                <div>Favorite Games: {fav_games}</div>
                <div>Age: {age}</div>
            </div>
            <>
            { currentUser && id !== currentUser.id 
            ? renderBottom() : null}
            </>
        </div>
    </>   
    )
}


const mapStateToProps = state => {
    return {
      currentUser: state.currentUser,
      friendships: state.friendships,
      token: state.token,
      users: state.users
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      setCurrentUser: (user) => dispatch(action.setCurrentUser(user)),
      setCurrentToken: (token) => dispatch(action.setCurrentToken(token)),
      setShowUser: (userId) => dispatch(action.setShowUser(userId)),
      addFriendRequest: (frId, userReceiveId, userSentId) => dispatch(action.addFriendRequest(frId, userReceiveId, userSentId)),
      fetchFriendships: (friendships) => dispatch(action.fetchFriendships(friendships)),
      removeFriendRequest: (userReceiveId, userSentId) => dispatch(action.removeFriendRequest(userReceiveId, userSentId)),
      addFriendshipTwoUsers: (user1, user2) => dispatch(action.addFriendshipTwoUsers(user1, user2))
    }
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(UserProfileCard);
  