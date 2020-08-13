import React, {useState, useEffect} from 'react';
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
import ProfileDisplayFriendRequests from './ProfileDisplay/ProfileDisplayFriendRequests'
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
  
    
    const { games, 
            token, 
            users, 
            reviews, 
            gamePhotos, 
            currentUser, 
            showUser, 
            setCurrentUser, 
            friendships,
            friendshipRequests} = props


    
        //thisUser is showUser
        //currentUser is user who is signed into website
    let [thisPageUser, setThisPageUser] = useState({})
    let [thisUserReviews, setThisUserReviews] = useState([])
    let [thisUserGamePhotos, setThisUserGamePhotos] = useState([])
    let [thisUserCreatedGames, setThisUserCreatedGames] = useState([])
    // let [currentUserOutgoingFR, setCurrentUserOutgoingFR] = useState([])
    // let [currentUserIncomingFR, setCurrentUserIncomingFR] = useState([])
    // let [currentUserFriends, setCurrentUserFriends] = useState([])
    // let [thisUserFriends, setThisUserFriends] = useState([])
    let [mutualFriends, setMutualFriends] = useState([])
    let [view, setView] = useState('photos')
    

    useEffect(() => {
        let thisPUser = users.find(user => user.id === showUser)
        setThisPageUser(thisPUser)
        setThisUserReviews(reviews.filter(review => review.user_id === showUser))
        setThisUserGamePhotos(gamePhotos.filter(photo => photo.user_id === showUser))
        setThisUserCreatedGames(games.filter(game => game.creator_id === showUser))
        setCurrentUserOutgoingFR(friendshipRequests.filter(fr => fr.user_id === currentUser.id))
        setCurrentUserIncomingFR(friendshipRequests.filter(fr => fr.request_id === currentUser.id))
        let currentUserInitFriendships = friendships.filter(friend => friend.user_id === currentUser.id || friend.friend_id === currentUser.id)
        let thisUserInitFriendships = friendships.filter(friend => friend.user_id === showUser || friend.friend_id === showUser)
       
        let mFriends = []
        if (thisPUser.total_friends && thisPUser.total_friends.length && currentUser.total_friends.length) {
            thisPUser.total_friends.forEach(tUserFriend => {
            if (currentUser.total_friends.some(friend => friend.id === tUserFriend.id)) {
                mFriends.push(tUserFriend)
            }
        })

    }
            console.log(mFriends)
        setMutualFriends(mFriends)
        
        
    }, [showUser, users])
  
    
  
       
    
   
    
           
        

   
  
    
    // let updatedCurrentUser = users.find(user => user.id === currentUser.id)
    // let currentUserFRSent = updatedCurrentUser.friend_requests_sent
    // let currentUserFRReceived = updatedCurrentUser.friend_requests_received
    
   
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
    
  
  

   
    const renderChangingShowCards = () => {
       
        if (view === 'photos' && currentUser.id !== showUser) {

            return (
                <UserDisplayPhotos 
                    mutualFriends={mutualFriends}
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
        
        else if (view === 'reviews' && currentUser.id !== showUser) {
            return (
                <DisplayReviews 
                    mutualFriends={mutualFriends}
                    thisPageUser={thisPageUser}
                    thisUserReviews={thisUserReviews}
                    thisUserGamePhotos={thisUserGamePhotos}
                    thisUserCreatedGames={thisUserCreatedGames}
                />
            )
        } else if (view === 'reviews' && currentUser.id === showUser) {
            return (
                <DisplayReviews 
                    mutualFriends={mutualFriends}
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
                mutualFriends={mutualFriends}
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
                mutualFriends={mutualFriends}
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
                mutualFriends={mutualFriends}
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
        } else if (view ==="seeFriendRequests") {
            return (
                <ProfileDisplayFriendRequests 
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
    



    //   <div>{thisUserFriends && thisUserFriends.length ? thisUserFriends.map(friend => <div>{friend.username}</div>) : null}</div>
    

       // let [currentUserOutgoingFR, setCurrentUserOutgoingFR] = useState([])
          // let [currentUserOutgoingFR, setCurrentUserOutgoingFR] = useState([])
    // let [currentUserIncomingFR, setCurrentUserIncomingFR] = useState([])
    // let [currentUserFriends, setCurrentUserFriends] = useState([])
    return (
        <>
            {
             token 
            ? <Container fluid>
                <Row>
                    <Col xs={2} id='sidebar-wrapper'>
                        <UserPageNavbar 
                            handleView={handleView} 
                            currentUserOutgoingFR={currentUserOutgoingFR}
                            setCurrentUserOutgoingFR={setCurrentUserOutgoingFR}
                            currentUserIncomingFR={currentUserIncomingFR}
                            setCurrentUserIncomingFR={setCurrentUserIncomingFR}
                            currentUserFriends={currentUserFriends}
                            setCurrentUserFriends={setCurrentUserFriends}
                        />
                    </Col>
                    <Col xs={10} id="page-content-wrapper">   
                        <div>
                            {renderChangingShowCards()}
                        </div>
                    </Col>
                </Row>        
            </Container>
            : <> 
                <h1>You Must Be Logged into an Account</h1>
                <h1>to Access User Pages </h1>
            </>
        } 
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
      showUser: state.showUser,
      friendshipRequests: state.friendshipRequests,
      friendships: state.friendships
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