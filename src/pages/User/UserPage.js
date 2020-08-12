import React, {useState} from 'react';
import { withRouter } from 'react-router-dom'
import * as action from '../../modules/actionCreators/actionCreators'
import UserCard from './UserCard'
import ReviewCard from '../Review/ReviewCard'
import GamePhotoCard from '../GamePhoto/GamePhotoCard'
import GameCard from '../Game/GameCard'

import AddReviewForm from '../../Components/Forms/AddReviewForm'
import AddGamePhotoForm from '../../Components/Forms/AddGamePhotoForm'
import UserPageNavbar from '../../Navbar/UserPageNavbar'
import DisplayReviews from './UserAndProfileDisplay/DisplayReviews'

import ProfileDisplayGames from './ProfileDisplay/ProfileDisplayGames'
import ProfileDisplayGamesCreated from './ProfileDisplay/ProfileDisplayGamesCreated'
import ProfileDisplayPhotos from './ProfileDisplay/ProfileDisplayPhotos'
import ProfileDisplayFriends from './ProfileDisplay/ProfileDisplayFriends'

import UserDisplayMutualFriends from './UserDisplay/UserDisplayMutualFriends'
import UserDisplayGamesCreated from './UserDisplay/UserDisplayGamesCreated'
import UserDisplayPhotos from './UserDisplay/UserDisplayPhotos'
import UserDisplayFriends from './UserDisplay/UserDisplayFriends'
import {Container, Row, Col, Card } from 'react-bootstrap';
import {connect} from 'react-redux'

const UserPage = props => {
  
    
    const { games, token, users, reviews, gamePhotos, currentUser, showUser, setCurrentUser} = props
    let thisPageUser = users.find(user => user.id === showUser)
    // const {total_friends, username, name, id, profile_url, age, fav_games} = thisPageUser
    let thisUserReviews = reviews.filter(review => review.user_id === showUser)
    let thisUserGamePhotos = gamePhotos.filter(photo => photo.user_id === showUser)
    let thisUserCreatedGames = games.filter(game => game.creator_id === showUser)
    // let updatedCurrentUser = users.find(user => user.id === currentUser.id)
    // let currentUserFRSent = updatedCurrentUser.friend_requests_sent
    // let currentUserFRReceived = updatedCurrentUser.friend_requests_received
    let [view, setView] = useState('photos')
//     # Friend Requests
//   has_many :friendship_requests
//   has_many :requests, :through => :friendships
//   has_many :inverse_friendship_requests, :class_name => "FriendshipRequest", :foreign_key => "request_id"
//   has_many :inverse_requests, :through => :inverse_friendship_requests, :source => :user
    // const currentUserFriendshipStatus = () => {
    //     if (thisPageUser.total_friends.some(friend => friend.id === currentUser.id)) {
    //         return (
    //             <div>
    //                 <div>You are Friends</div>
    //                 <button>Click to Unfriend</button>
    //             </div>
    //         )
    //     } else if (thisPageUser.friend_requests_sent.some(friendRequest => friendRequest.request_id === currentUser.id)) {
    //         return (
    //             <div>
    //                 <button>Click to Accept Friend Request</button>
    //             </div>
    //         )
    //     } else if (thisPageUser.friend_requests_received.some(fr => fr.id === currentUser.id)) {
    //         return (
    //             <div>
    //                 <div>Friendship Requested</div>
    //                 <button>Click to Cancel</button>
    //             </div>
    //         )
    //     } else {
    //         return(
    //             <div>
    //                 <button>Click to Request Friendship</button>
    //             </div>
    //         )
    //     }
    // }
//     attributes :id, :request_name, :user_id, :request_id, :user_name
//     if (currentUserFRReceived.some(fr => ))
//     create_table "friendship_requests", force: :cascade do |t|
//     t.integer "user_id"
//     t.integer "request_id"
//   end

//   create_table "friendships", force: :cascade do |t|
//     t.integer "user_id"
//     t.integer "friend_id"
//   end
    const handleView = e => {
        setView(e.target.name)
    }
    
    
    const mutualFriends = () => {
        if (thisPageUser.total_friends.length > 0 && currentUser.total_friends.length > 0) {
            let matchingArray = []
            for (let i = 0; i < thisPageUser.total_friends.length; i++) {  
                if (currentUser.total_friends.some(friend => friend.username === thisPageUser.total_friends[i].username)) {
                    matchingArray.push(thisPageUser.total_friends[i])
                }
            }  
            if (matchingArray.length) {
                return matchingArray 
                
            } else {
                return  null
            }
        }
        else {
            return null
        }
    }

    let mutualFriendsList = () => {
        if(mutualFriends()) {
            return (
                <>
                    <div> 
                        <div>Mutual Friends:</div>
                        <div>
                            {mutualFriends().map(friend => 
                                <div>
                                    <UserCard key={friend.id} {...friend}/>
                                </div>
                            )}
                        </div>
                    </div>
                    </>
            )
        } else {
            return (
                <div>No Mutual Friends Listed</div>
            )
        }
    }


    const renderChangingShowCards = () => {
        if (view === 'photos' && currentUser.id !== showUser) {
            return (
                <UserDisplayPhotos 
                    mutualFriendsList={mutualFriendsList}
                    thisPageUser={thisPageUser}
                    thisUserReviews={thisUserReviews}
                    thisUserGamePhotos={thisUserGamePhotos}
                    thisUserCreatedGames={thisUserCreatedGames}
                />
            )
        }  else if (view === 'photos' && currentUser.id === showUser) {
            return (
                <ProfileDisplayPhotos 
                    thisPageUser={thisPageUser}
                    thisUserReviews={thisUserReviews}
                    thisUserGamePhotos={thisUserGamePhotos}
                    thisUserCreatedGames={thisUserCreatedGames}
                />
            )
        } 
        
        else if (view === 'reviews') {
            return (
                <DisplayReviews 
                    mutualFriendsList={mutualFriendsList}
                    thisPageUser={thisPageUser}
                    thisUserReviews={thisUserReviews}
                    thisUserGamePhotos={thisUserGamePhotos}
                    thisUserCreatedGames={thisUserCreatedGames}
                />
            )
        } else if (view === 'games') {
             return (
            <ProfileDisplayGames 
                thisPageUser={thisPageUser}
                thisUserReviews={thisUserReviews}
                thisUserGamePhotos={thisUserGamePhotos}
                thisUserCreatedGames={thisUserCreatedGames}
            />
             )
        } else if (view === 'friends' && currentUser.id !== showUser) {
            return (
           <UserDisplayFriends
                mutualFriendsList={mutualFriendsList}
                thisPageUser={thisPageUser}
                thisUserReviews={thisUserReviews}
                thisUserGamePhotos={thisUserGamePhotos}
                thisUserCreatedGames={thisUserCreatedGames}
           />
            )
       } else if (view === 'friends' && currentUser.id === showUser) {
        return (
            <ProfileDisplayFriends
                    thisPageUser={thisPageUser}
                    thisUserReviews={thisUserReviews}
                    thisUserGamePhotos={thisUserGamePhotos}
                    thisUserCreatedGames={thisUserCreatedGames}
            />
        )
        } 
       else if (view === 'mutualFriends' ) {
            return (
            <UserDisplayMutualFriends 
                mutualFriends={mutualFriends()}
                thisPageUser={thisPageUser}
                thisUserReviews={thisUserReviews}
                thisUserGamePhotos={thisUserGamePhotos}
                thisUserCreatedGames={thisUserCreatedGames}
            />
        )
        } 
        else if (view === "gamesCreated" && currentUser.id !== showUser) {
            return (
           <UserDisplayGamesCreated
                mutualFriendsList={mutualFriendsList}
                thisPageUser={thisPageUser}
                thisUserReviews={thisUserReviews}
                thisUserGamePhotos={thisUserGamePhotos}
                thisUserCreatedGames={thisUserCreatedGames}
           />
            )
        }  else if (view === "gamesCreated" && currentUser.id === showUser) {
            return (
           <ProfileDisplayGamesCreated
                thisPageUser={thisPageUser}
                thisUserReviews={thisUserReviews}
                thisUserGamePhotos={thisUserGamePhotos}
                thisUserCreatedGames={thisUserCreatedGames}
           />
            )
        }
    }



    const requestFriendship = () => {
        fetch('http://localhost:3001/api/v1/friendship_requests', {
            method: "POST",
            headers: {
            "content-type": "application/json",
            "Authorization": token
            },
            body: JSON.stringify({
            request_id: showUser
            })
        })
        .then(r => r.json())
        .then(resp => handleResponse(resp))
    }
  
      const handleResponse = (resp) => {
        if (resp.message) {
          alert(resp.message)
        } else {
          alert(`Friend Request Sent!`)
        }
      }
    




    
  
    return (
        <>
            <Container fluid>
                <Row>
                    <Col xs={2} id='sidebar-wrapper'>
                        <UserPageNavbar handleView={handleView} requestFriendship={requestFriendship}/>
                    </Col>
                    <Col xs={10} id="page-content-wrapper">   
                        <div>
                            {renderChangingShowCards()}
                        </div>
                    </Col>
                </Row>        
            </Container>
        </>
    )


}
const mapStateToProps = state => {
    return {
      token: state.token,
      games: state.games,
      users: state.users,
      reviews: state.reviews,
      gamePhotos: state.gamePhotos,
      currentUser: state.currentUser,
      showUser: state.showUser
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      setCurrentUser: (user) => dispatch(action.setCurrentUser(user)),
      setCurrentToken: (token) => dispatch(action.setCurrentToken(token)),
      setShowUser: (userId) => dispatch(action.setShowUser(userId))
    }
  }
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPage));