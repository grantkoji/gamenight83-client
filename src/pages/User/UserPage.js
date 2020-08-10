import React from 'react';
import { withRouter } from 'react-router-dom'
import * as action from '../../modules/actionCreators/actionCreators'
import UserCard from './UserCard'
import ReviewCard from '../Review/ReviewCard'
import GamePhotoCard from '../GamePhoto/GamePhotoCard'
import GameCard from '../Game/GameCard'
import UserProfileCard from './UserProfileCard'
import AddReviewForm from '../../Components/Forms/AddReviewForm'
import AddGamePhotoForm from '../../Components/Forms/AddGamePhotoForm'
import {connect} from 'react-redux'

const UserPage = props => {
  
    
    const { games, token, users, reviews, gamePhotos, currentUser, showUser} = props
    let thisPageUser = users.find(user => user.id === showUser) 
    // const {total_friends, username, name, id, profile_url, age, fav_games} = thisPageUser
    let thisUserReviews = reviews.filter(review => review.user_id === showUser)
    let thisUserGamePhotos = gamePhotos.filter(photo => photo.user_id === showUser)
    let thisUserCreatedGames =  games.filter(game => game.creator_id === showUser)

    
    const mutualFriends = () => {
        if (showUser === currentUser.id) {
            return "You are on your own page"
        } else if (thisPageUser.total_friends.length > 0 && currentUser.total_friends.length > 0) {
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
        if (mutualFriends() == "You are on your own page") {
            return null
        } else if(mutualFriends() && mutualFriends() !== "You are on your own page") {
            console.log(mutualFriends())
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
    
  
    return (
        <div>
            {thisPageUser && <UserProfileCard user={thisPageUser}/>}
            <div>
            { token && currentUser.id === showUser
                ? <> 
                <div>Post a Game Review: </div>
                <div><AddReviewForm /></div>
                </>
                : null
            }  
          </div>
            <div>
                {thisPageUser && thisPageUser.total_friends 
                    ?<div>
                        <div>Friends:</div>
                        <div>
                        {thisPageUser.total_friends.map(friend => 
                            <div>
                                <UserCard key={friend.id} {...friend}/>
                            </div>
                        )}
                        </div>
                    </div>
                    : <div>No Friends Listed</div>
                }
            </div>
            <div>
            {thisPageUser && mutualFriendsList()}  
            </div>  
            {thisUserReviews && thisUserReviews.length
                ?<div>
                    <div>Game Reviews:</div>
                    <div>
                    {thisUserReviews.map(review => 
                        <div>
                           <ReviewCard key={review.id} {...review} />
                        </div>
                    )}
                    </div>
                </div>
                : <div>No Reviews Listed</div>
            }
            {thisUserGamePhotos && thisUserGamePhotos.length
                ?<div>
                    <div>Game Photos:</div>
                    <div>
                    {thisUserGamePhotos.map(photo => 
                        <div>
                            <GamePhotoCard key={photo.id} {...photo} />
                        </div>
                    )}
                    </div>
                </div>
                : <div>No Game Photos Listed</div>
            }
            {thisUserCreatedGames && thisUserCreatedGames.length
                ?<div>
                    <div>Created Games:</div>
                    <div>
                    {thisUserCreatedGames.map(game => 
                        <div>
                                <GameCard key={game.id} {...game} />
                        </div>
                    )}
                    </div>
                </div>
                : <div>No Games Posted</div>
            }
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