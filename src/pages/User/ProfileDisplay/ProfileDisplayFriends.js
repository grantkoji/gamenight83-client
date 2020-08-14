import React, {useState} from 'react';
import { withRouter } from 'react-router-dom'
import * as action from '../../../modules/actionCreators/actionCreators'
import UserCard from '../UserCard'
import ReviewCard from '../../Review/ReviewCard'
import GamePhotoCard from '../../GamePhoto/GamePhotoCard'
import GameCard from '../../Game/GameCard'
import SearchBarUsers from '../../../Components/SearchBars/SearchBarUsers'
import {connect} from 'react-redux'
import UserProfileCard from '../UserProfileCard'

const ProfileDisplayFriends = props => {
    const {
        thisPageUser,
        thisUserReviews,
        thisUserGamePhotos,
        thisUserCreatedGames,
        currentUser
    } = props
  
    let [searchType, setSearchType] = useState('username')
    let [search, setSearch] = useState('')

    let filteredUsers = () => {
        if (currentUser && currentUser.total_friends && currentUser.total_friends.length) {
            if (searchType === 'username') {
                return currentUser.total_friends.filter(user => user.username.toLowerCase().includes(search.toLowerCase()))
            } else if (searchType === 'favGames') {
                return currentUser.total_friends.filter(user => user.fav_games.toLowerCase().includes(search.toLowerCase()))
            }
        } 
    }

    return (
    <div>
        {thisPageUser && <UserProfileCard user={thisPageUser}/>} 
        <div className="container6">
            <div>
                <SearchBarUsers 
                    searchType={searchType} 
                    setSearchType={setSearchType}
                    search={search}
                    setSearch={setSearch}
                />
            </div>
            {currentUser && currentUser.total_friends && currentUser.total_friends.length
            ?<div>
                <div>Friends:</div>
                <div>
                {filteredUsers().map(friend => 
                    <div>
                        <UserCard key={friend.id} {...friend} status="profileFriends"/>
                    </div>
                )}
                </div>
            </div>
            : <div>No Friends Listed</div>
            }
        </div>
        <div className="container3">
            <div>
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
            </div>
            <div>
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
        </div>
        <div className="container3">
            <div>
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
            </div>
        </div>
    </div>
    )

}

const msp = state => {
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
  
  const mdp = dispatch => {
    return {
      setCurrentUser: (user) => dispatch(action.setCurrentUser(user)),
      setCurrentToken: (token) => dispatch(action.setCurrentToken(token)),
      setShowUser: (userId) => dispatch(action.setShowUser(userId))
    }
  }
  
  export default withRouter(connect(msp, mdp)(ProfileDisplayFriends));
