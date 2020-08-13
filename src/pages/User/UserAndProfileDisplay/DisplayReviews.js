import React, {useState} from 'react';
import { withRouter } from 'react-router-dom'
import * as action from '../../../modules/actionCreators/actionCreators'
import UserCard from '../UserCard'
import ReviewCard from '../../Review/ReviewCard'
import GamePhotoCard from '../../GamePhoto/GamePhotoCard'
import GameCard from '../../Game/GameCard'
import AddReviewForm from '../../../Components/Forms/AddReviewForm'
import AddGamePhotoForm from '../../../Components/Forms/AddGamePhotoForm'
import GameUserCard from '../../Game/GameUserCard'
import SearchBarReviews from '../../../Components/SearchBars/SearchBarReviews'
import FilterReviewsByStars from '../../../Components/Filters/FilterReviewsByStars'
import {connect} from 'react-redux'
import UserProfileCard from '../UserProfileCard'


const UserDisplayReviews= props => {
    const {
        mutualFriends,
        thisPageUser,
        thisUserReviews,
        thisUserGamePhotos,
        thisUserCreatedGames,
        games, 
        token
    } = props

    let [search, setSearch] = useState('')
    let [searchType, setSearchType] = useState('gameTitle')
    let [typeMinStars, setTypeMinStars] = useState('noMinStars')
    let [typeMaxStars, setTypeMaxStars] = useState('noMaxStars')


    let filteredReviews = () => {
        if (thisUserReviews && thisUserReviews.length) {
            let reviewsFiltered = thisUserReviews
            if (searchType === 'username') {
                reviewsFiltered = reviewsFiltered.filter(review => review.user_name.toLowerCase().includes(search.toLowerCase()))
            } else if (searchType === 'gameTitle') {
                reviewsFiltered = reviewsFiltered.filter(review => review.game_title.toLowerCase().includes(search.toLowerCase()))
            } else if (searchType === 'content') {
                reviewsFiltered = reviewsFiltered.filter(review => review.content.toLowerCase().includes(search.toLowerCase()))
            } else if (searchType === 'gameCategory') {
                reviewsFiltered = reviewsFiltered.filter(review => review.game_category.toLowerCase().includes(search.toLowerCase()))
            }
            if (typeMinStars !== 'noMinStars') {
                reviewsFiltered = reviewsFiltered.filter(review => parseInt(review.num_stars) >= parseInt(typeMinStars))
            }
            if (typeMaxStars !== 'noMaxStars') {
                reviewsFiltered = reviewsFiltered.filter(review => parseInt(review.num_stars) <= parseInt(typeMaxStars))
            }
            return reviewsFiltered
        } 
    }

    let mutualFriendsList = () => {
        if(mutualFriends) {
            return (
                <>
                    <div> 
                        <div>Mutual Friends:</div>
                        <div>
                            {mutualFriends.map(friend => 
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
            <div className="container6">
                <div>
                    <SearchBarReviews search={search} searchType={searchType} setSearch={setSearch} setSearchType={setSearchType}/>
                </div>
                <div>
                    <FilterReviewsByStars 
                        typeMinStars={typeMinStars}
                        setTypeMinStars={setTypeMinStars}
                        typeMaxStars={typeMaxStars}
                        setTypeMaxStars={setTypeMaxStars}
                    />
                </div>
                <div>
                    {thisUserReviews && thisUserReviews.length
                        ?<div>
                            <div>Game Reviews:</div>
                            <div>
                            {filteredReviews().map(review => 
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
                    {thisPageUser && mutualFriendsList()}  
                </div>  
                <div>
                    {thisPageUser && thisPageUser.total_friends && thisPageUser.total_friends.length
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

export default withRouter(connect(msp, mdp)(UserDisplayReviews))


