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
         <div className='user-profile-container'>
            <div className='user-profile-card'>
                {thisPageUser && <UserProfileCard user={thisPageUser}/>} 
            </div>
            <div className='profile-photos-search-bar'>   
                <Divider horizontal>
                    <Header as='h4'>
                        Game Photos
                    </Header>
                </Divider>
                <div className='users-search-bar'>
                    <SearchBarUsers 
                        searchType={searchType} 
                        setSearchType={setSearchType}
                        search={search}
                        setSearch={setSearch}
                    />
                </div>
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
                            : <div>
                                <br/><br/>
                                <div>No Games Created</div>
                            </div>
                        }
                    </div>
                </Col>
                <Col md={6}>
                    <div className='featured-on-user-page'>
                        {
                            currentUser && currentUser.total_friends && currentUser.total_friends.length
                            ?<div>
                                <div>You have {currentUser.total_friends.length} Friends</div>
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
                </Col>
                <Col md={3}>
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
  
  export default withRouter(connect(msp, mdp)(ProfileDisplayFriends));
