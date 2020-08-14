import React, {useEffect} from 'react';
import * as action from '../../modules/actionCreators/actionCreators'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import * as requests from '../../requests'

const UserCard = props => {

    const { currentUser, id, username, fav_games, removeFriendshipTwoUsers, fetchFriendships, friendships } = props

    const redirectToUserPage = () => {
        props.setShowUser(id)
        // props.history.push(`/users/${props.id}`)
        props.history.push(`/users/${username.replace(/\s+/g, '')}`)
    }

    // useEffect(() => {
    //     return () => {
    //             return (<></>)
    //         }
    //   }, []);
    
     const endFriendship = () => {
         let friendshipInstance = friendships.find(friendship => friendship.user_id === id && friendship.friend_id === currentUser.id 
                             || friendship.user_id === currentUser.id && friendship.friend_id === id )
         removeFriendshipTwoUsers(id, currentUser.id)
         requests.fetchRemoveFriendship(friendshipInstance.id)
         .then(updatedFriendships => fetchFriendships(updatedFriendships))
     }
  

    return (
        <div class="ui card">
            <div className="image">
                { props["profile_url"] === "" 
                ? <img src="https://banner2.cleanpng.com/20180403/dje/kisspng-question-mark-computer-icons-clip-art-question-mark-5ac3de9116dec4.9390654415227859370937.jpg" alt="Question Mark" />
                : <img src={props["profile_url"]} alt={username} />
                }
            </div>
            <div className="content">
                <a className="header" onClick={redirectToUserPage}>{username}</a>
            </div>  
            <div className="description">
                <div>Favorite Games: {fav_games}</div>
            </div>
            { 
            props.status === "profileFriends" && 
                <div class="extra content">
                    <a>
                        <i class="user icon"></i>
                            <div class="ui basic red button" onClick={endFriendship}>Remove Friendship</div>
                    </a>
                </div>
            }
            {
                props.status === 'index' && currentUser && currentUser.total_friends && currentUser.total_friends.some(fr => fr.id === id)
                ?  <div class="extra content">
                    <a>
                        <i class="user icon"></i>
                            You are Friends
                    </a>
                </div>
                : null
            }
        </div>   
    )
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        friendships: state.friendships
    }
}

const mapDispatchToProps = dispatch => {
    return {
      setShowUser: (userId) => dispatch(action.setShowUser(userId)),
      fetchFriendships: (friendships) => dispatch(action.fetchFriendships(friendships)),
      removeFriendshipTwoUsers: (user1Id, user2Id) => dispatch(action.removeFriendshipTwoUsers(user1Id, user2Id))
    }
  }
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserCard));
  

