import React, {useEffect} from 'react';
import * as action from '../../modules/actionCreators/actionCreators'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import * as requests from '../../requests'

const UserCardSideColumn = props => {

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

     const renderBottomOfCard = () => {
        if (props.status==="profileFriends") {
            return(
                <div class="extra content">
                        <a>
                                <div class="ui basic red button" onClick={endFriendship}>Remove Friendship</div>
                        </a>
                    </div>
            )
        } else if (props.status === 'index' && currentUser && currentUser.total_friends && currentUser.total_friends.some(fr => fr.id === id)) {
           return( <div class="extra content">
                        <a>
                            <i class="user icon"></i>
                                You are Friends
                        </a>
                    </div>
           )    
        } else {
            return(
                <div class="extra content">
                        <a>
                            <i class="user icon"></i>
                        </a>
                    </div>
            )
        }
     }
  
    

    return (
        <div class="ui card">
            <div className='div-of-photo'>
                { props["profile_url"] === "" 
                ? <img src='https://img.pngio.com/3d-blue-questionmark-featuredcontent-question-mark-icon-3d-png-3d-question-mark-png-820_645.png'
                    className='card-side-column'
                    alt="Question Mark"                    
                  />
                : <img src={props["profile_url"]} className='user-image' alt={username} />
                }
            </div>
            <div className="content">
                <a className="header" onClick={redirectToUserPage}>{username}</a>
            </div>  
            <div className="description">
                <div>Favorite Games: {fav_games}</div>
            </div>
            <>{renderBottomOfCard()}</>
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
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserCardSideColumn));
  

