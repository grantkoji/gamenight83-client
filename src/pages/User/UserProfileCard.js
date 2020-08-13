import React from 'react';
import * as action from '../../modules/actionCreators/actionCreators'
import {connect} from 'react-redux'
import * as requests from '../../requests'

const UserProfileCard = props => {
    const {username, id, name, fav_games, age} = props.user
    const {currentUser, addFriendRequest, token} = props

    const acceptFriendship = () => {
       
       
        
    }



   
    const requestFriendship = () => {
        requests.fetchPostAddFRequest(token, id)
        .then(data => addFriendRequest(data.id, id, {
                                                    id: currentUser.id, 
                                                    name: currentUser.name,
                                                    username: currentUser.username,
                                                    fav_games: currentUser.fav_games,
                                                    profile_url: currentUser.profile_url,
                                                    age: currentUser.age
                                                    }))
    }

    const renderBottom = () => {
        if (currentUser && currentUser.total_friends && currentUser.total_friends.some(userFr => userFr.id === id)) {
            return (
                <div class="extra content">
                    <a>
                        <i class="user icon"></i>
                            You are Friends
                    </a>
                </div>
            )
        } else if (currentUser && currentUser.friend_requests_sent && currentUser.friend_requests_sent.some(fR => fR.request_id === id)) {
            return (
                <div class="extra content">
                    <a>
                        <i class="user icon"></i>
                            Friendship Pending
                    </a>
                </div>
            )
        } else if (currentUser && currentUser.friend_requests_received && currentUser.friend_requests_received.some(fR => fR.id === id)) {
            return (
                <div class="extra content" onClick={acceptFriendship}>
                    <a>
                        <i class="user icon"></i>
                            Accept Friendship
                    </a>
                </div>
            )
        } else { 
            return (
                <div class="extra content" onClick={requestFriendship}>
                    <a>
                        <i class="user icon"></i>
                            Request Friendship
                    </a>
                </div>
            )
        }
    }
  

    return (
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
    )
}


const mapStateToProps = state => {
    return {
      currentUser: state.currentUser,
      token: state.token
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      setCurrentUser: (user) => dispatch(action.setCurrentUser(user)),
      setCurrentToken: (token) => dispatch(action.setCurrentToken(token)),
      setShowUser: (userId) => dispatch(action.setShowUser(userId)),
      addFriendRequest: (frId, userReceiveId, userSent) => dispatch(action.addFriendRequest(frId, userReceiveId, userSent))
    }
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(UserProfileCard);
  