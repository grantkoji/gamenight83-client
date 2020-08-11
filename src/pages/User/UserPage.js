import React, {useState} from 'react';
import { withRouter } from 'react-router-dom'
import * as action from '../../modules/actionCreators/actionCreators'
import UserCard from './UserCard'
import ReviewCard from '../Review/ReviewCard'
import GamePhotoCard from '../GamePhoto/GamePhotoCard'
import GameCard from '../Game/GameCard'
import UserProfileCard from './UserProfileCard'
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
import {connect} from 'react-redux'

const UserPage = props => {
  
    
    const { games, token, users, reviews, gamePhotos, currentUser, showUser} = props
    let thisPageUser = users.find(user => user.id === showUser) 
    // const {total_friends, username, name, id, profile_url, age, fav_games} = thisPageUser
    let thisUserReviews = reviews.filter(review => review.user_id === showUser)
    let thisUserGamePhotos = gamePhotos.filter(photo => photo.user_id === showUser)
    let thisUserCreatedGames = games.filter(game => game.creator_id === showUser)

    let [view, setView] = useState('photos')

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








    
  
    return (
        <div>
            {thisPageUser && <UserProfileCard user={thisPageUser}/>}
            <div>
                <UserPageNavbar handleView={handleView} />
            </div>
            <div>
                {renderChangingShowCards()}
            </div>
            
            
           
        </div>
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
      setCurrentUser: (userId) => dispatch(action.setCurrentUser(userId)),
      setCurrentToken: (token) => dispatch(action.setCurrentToken(token)),
      setShowUser: (userId) => dispatch(action.setShowUser(userId))
    }
  }
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPage));