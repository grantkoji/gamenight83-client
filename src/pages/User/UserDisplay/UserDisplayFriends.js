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
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const UserDisplayFriends = props => {
    const {
        mutualFriends,
        thisPageUser,
        thisUserReviews,
        thisUserGamePhotos,
        thisUserCreatedGames,
    } = props
  
    let [searchType, setSearchType] = useState('username')
    let [search, setSearch] = useState('')

    let filteredUsers = () => {
        if (thisPageUser && thisPageUser.total_friends && thisPageUser.total_friends.length) {
            if (searchType === 'username') {
                return thisPageUser.total_friends.filter(user => user.username.toLowerCase().includes(search.toLowerCase()))
            } else if (searchType === 'favGames') {
                return thisPageUser.total_friends.filter(user => user.fav_games.toLowerCase().includes(search.toLowerCase()))
            }
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
                                    <UserCard key={friend.id} {...friend} status="visitor"/>
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
            <div className='users-search-bar'>
                <SearchBarUsers 
                    searchType={searchType} 
                    setSearchType={setSearchType}
                    search={search}
                    setSearch={setSearch}
                />
            </div>
           
        </div>
        <Container fluid>
                <Row className='justify-content-center'>
                    <Col md={3}>
                        <div>
                        {
                            thisUserGamePhotos && thisUserGamePhotos.length
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
                            {
                                thisUserCreatedGames && thisUserCreatedGames.length
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
                                :<div>
                                    <br/><br/>
                                    <div>No Games Created</div>
                                </div>
                            }
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className='featured-on-user-page'>
                            {
                                thisPageUser && thisPageUser.total_friends && thisPageUser.total_friends.length
                                ?<div>
                                    <div>{thisPageUser.username} has {thisPageUser.total_friends.length} Friends</div>
                                    <div>
                                    {filteredUsers().map(friend => 
                                        <div>
                                            <UserCard key={friend.id} {...friend} location="visitor"/>
                                        </div>
                                    )}
                                    </div>
                                </div>
                                : <div>No Friends Listed</div>
                            }
                        </div>
                    </Col>
                    <Col md={3}>
                        <div>
                            {thisPageUser && mutualFriendsList()}  
                        </div>  
                        <div>
                            {
                                thisUserReviews && thisUserReviews.length
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
                    </Col>
                </Row>
            </Container> 
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
  
  export default withRouter(connect(msp, mdp)(UserDisplayFriends));
