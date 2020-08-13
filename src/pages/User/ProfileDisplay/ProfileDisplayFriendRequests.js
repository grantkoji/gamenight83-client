import React, {useState} from 'react';
import { withRouter } from 'react-router-dom'
import * as action from '../../../modules/actionCreators/actionCreators'
import UserCard from '../UserCard'
import ReviewCard from '../../Review/ReviewCard'
import GamePhotoCard from '../../GamePhoto/GamePhotoCard'
import GameCard from '../../Game/GameCard'
import FriendshipRequest from '../../Friend/FriendshipRequest'
import SentFriendshipRequest from '../../Friend/SentFriendshipRequest'

import {connect} from 'react-redux'
import UserProfileCard from '../UserProfileCard'

const ProfileDisplayFriendRequests = props => {
    const {
        friends,
        thisPageUser,
        thisUserReviews,
        thisUserGamePhotos,
        thisUserCreatedGames,
        outgoingFR,
        incomingFR,
        setCurrentUserOutgoingFR,
        setCurrentUserIncomingFR,
        setCurrentUserFriends,
        currentUserFriends
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

    

    return (
        <div>
            {thisPageUser && <UserProfileCard user={thisPageUser}/>} 
            <div className="container6">
                <div>
                    {incomingFR && incomingFR.length 
                    ? <div>
                        {incomingFR.map(inFR => <FriendshipRequest 
                                                key={inFR.id}
                                                id={inFR.id}
                                                name={inFR.user_name} 
                                                url={inFR.user_photo} 
                                                userId={inFR.user_id}
                                                setCurrentUserIncomingFR={setCurrentUserIncomingFR}
                                                setCurrentUserFriends={setCurrentUserFriends}
                                                currentUserIncomingFR={incomingFR}
                                                currentUserFriends={currentUserFriends}
                                                />) }
                    </div>
                    : <div>No Inbound Friend Requests</div>}
                </div>
                <div>
                    {outgoingFR && outgoingFR.length 
                    ? <div>
                        {outgoingFR.map(outFR => <SentFriendshipRequest 
                                                    key={outFR.id} 
                                                    id={outFR.id}
                                                    name={outFR.request_name} 
                                                    url={outFR.request_photo} 
                                                    userId={outFR.request_id}
                                                    setCurrentUserOutgoingFR={setCurrentUserOutgoingFR}      
                                                    currentUserOutgoingFR={outgoingFR}
                                                    /> )}
                    </div>
                    : <div>No Friend Requests Pending</div>}
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
                    {friends && friends.length
                        ?<div>
                            <div>Friends:</div>
                            <div>
                            {friends.map(friend => 
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

export default withRouter(connect(msp, mdp)(ProfileDisplayFriendRequests))



