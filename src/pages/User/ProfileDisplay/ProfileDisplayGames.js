import React, {useState} from 'react';
import { withRouter } from 'react-router-dom'
import * as action from '../../../modules/actionCreators/actionCreators'
import UserCard from '../UserCard'
import ReviewCard from '../../Review/ReviewCard'
import GamePhotoCard from '../../GamePhoto/GamePhotoCard'
import GameCard from '../../Game/GameCard'
import AddReviewForm from '../../../Components/Forms/AddReviewForm'
import AddGamePhotoForm from '../../../Components/Forms/AddGamePhotoForm'
import SearchBarGames from '../../../Components/SearchBars/SearchBarGames'
import FilterGamesByNum from '../../../Components/Filters/FilterGamesByNum'
import GameUserCard from '../../Game/GameUserCard'
import {connect} from 'react-redux'



const ProfileDisplayGames = props => {
    const {
        thisPageUser,
        thisUserReviews,
        thisUserGamePhotos,
        thisUserCreatedGames,
        games, 
        token
    } = props

    let [search, setSearch] = useState('')
    let [searchType, setSearchType] = useState('gameTitle')
    let [typeNumPlayers, setTypeNumPlayers] = useState('noNumPlayers')
    let [numPlayers, setNumPlayers] = useState(0)
    let [typeMinAge, setTypeMinAge] = useState('noMinAge')
    let [minAge, setMinAge] = useState(0)
    //Below three hooks will be used to set the type of 
    //post - review or photo - as well as the title and id
    //of the game that the user will write a post or review on
    let [postType, setPostType] = useState('instructions')
    let [thisGameId, setThisGameId] = useState(null)
    let [thisGameTitle, setThisGameTitle] = useState(null)

    let filteredGames = () => {
        if (games && thisUserCreatedGames.length) {
            let gamesFiltered = [...games]
            if (searchType === 'username') {
                gamesFiltered = gamesFiltered.filter(game => game.creator_username.toLowerCase().includes(search.toLowerCase()))
            } else if (searchType === 'gameCategory') {
                gamesFiltered = gamesFiltered.filter(game => game.game_category.toLowerCase().includes(search.toLowerCase()))
            } else if (searchType === 'gameTitle') {
                gamesFiltered = gamesFiltered.filter(game => game.title.toLowerCase().includes(search.toLowerCase()))
            }
            if (typeNumPlayers === "withNumPlayers") {
                gamesFiltered = gamesFiltered.filter(game => game.max_num_players >= parseInt(numPlayers) && 
                    game.min_num_players <= parseInt(numPlayers))
            } 
            if (typeMinAge === 'withMinAge') {
                gamesFiltered = gamesFiltered.filter(game => game.min_age >= parseInt(minAge))
            }
            return gamesFiltered
        } 
    }

    const postedReviewOrPhoto = () => {
        if (postType === "instructions") {
            return (
                <div>
                    <div>To Post a Game Review or Photo</div>
                    <div>Search the Games Listed Below</div>
                    <div>Below their Pictures, You Will Find Buttons</div>
                    <div>To Post a Photo or Write a Review</div>
                    <div>When Clicked, a Form Will Appear in the Place of These Instructions</div>
                </div>
          ) 
        } else if (postType === "review") {
            return (
                <div>
                    <div>Write a Review for {thisGameTitle}:</div>
                    <AddReviewForm thisGame={thisGameId}/>
                </div>
            )  
        } else if (postType === "photo") {
            return (
                <div>
                    <div>Post a Photo for {thisGameTitle}:</div>
                    <AddGamePhotoForm thisGame={thisGameId}/>
                </div>
            )  
        }
    }

    return (
        <div>
            <div className="container6">
                <div>
                    {postedReviewOrPhoto()}
                </div>
                <div>
                    <SearchBarGames search={search} searchType={searchType} setSearch={setSearch} setSearchType={setSearchType}/>
                </div>
                <div>
                    <FilterGamesByNum 
                        typeNumPlayers={typeNumPlayers} 
                        setTypeNumPlayers={setTypeNumPlayers}
                        numPlayers={numPlayers}
                        setNumPlayers={setNumPlayers} 
                        typeMinAge={typeMinAge} 
                        setTypeMinAge={setTypeMinAge}
                        minAge={minAge}
                        setMinAge={setMinAge}  
                    />
                </div>
 
                <div>
                    {games && games.length 
                    ? <div> 
                        <div>Select a Game to Post a Photo or Write a Review:</div>
                        <div>{filteredGames().map(game => 
                            <div>
                                <GameUserCard 
                                    key={game.id} 
                                    {...game} 
                                    setThisGameId={setThisGameId}
                                    setThisGameTitle={setThisGameTitle}
                                    setPostType={setPostType}
                                />
                            </div>
                        )}
                        </div>
                    </div>
                    : <div>No Games Listed</div>}
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

export default withRouter(connect(msp, mdp)(ProfileDisplayGames))



