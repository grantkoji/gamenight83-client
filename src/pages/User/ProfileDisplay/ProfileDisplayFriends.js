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
import { Divider, Header, Card } from 'semantic-ui-react'

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
            <div className='profile-users-search-bar'>   
                <Divider horizontal>
                    <Header as='h4'>
                        Search Friends
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
                <Col md={2}>
                    <div>
                        {
                            thisUserGamePhotos && thisUserGamePhotos.length
                            ?<>
                                <Divider horizontal>
                                    <Header as='h4'>
                                        Game Photos Listed
                                    </Header>
                                </Divider>
                                {thisUserGamePhotos.map(photo => 
                               
                                        <GamePhotoCard key={photo.id} {...photo} />

                                )}
                        
                            </>
                            :  <Divider horizontal>
                                    <Header as='h4'>
                                        No Photos Listed
                                    </Header>
                                </Divider>
                        }
                        {
                            thisUserCreatedGames && thisUserCreatedGames.length
                            ?<>
                                <Divider horizontal>
                                    <Header as='h4'>
                                        Created Games
                                    </Header>
                                </Divider>
                                    {thisUserCreatedGames.map(game => 
                                        <GameCard key={game.id} {...game} />
                                    )}
                            
                            </>
                            :  <Divider horizontal>
                                    <Header as='h4'>
                                       No Games Created
                                    </Header>
                                </Divider>
                        }
                    </div>
                </Col>
                <Col md={8}>
                    <div>
                        {
                            currentUser && currentUser.total_friends && currentUser.total_friends.length
                            ?<>
                                <Divider horizontal>
                                    <Header as='h4'>
                                        You have {currentUser.total_friends.length} Friends
                                    </Header>
                                </Divider>
                                {filteredUsers().length > 1
                                    ? <Card.Group itemsPerRow={2}>
                                        {filteredUsers().map(friend => 
                                            <UserCard key={friend.id} {...friend} status="profileFriends"/>
                                        )}
                                      </Card.Group>
                                    : <Card.Group centered>
                                        {filteredUsers().map(friend => 
                                            <UserCard key={friend.id} {...friend} status="profileFriends"/>
                                        )}
                                      </Card.Group>
                                }
                            </>
                            :   <Divider horizontal>
                                    <Header as='h4'>
                                        No Friends Listed
                                    </Header>
                                </Divider>
                        }
                    </div>
                </Col>
                <Col md={2}>
                    <div>
                    {
                        thisUserReviews && thisUserReviews.length
                        ?<>
                            <Divider horizontal>
                                <Header as='h4'>
                                    Game Reviews
                                </Header>
                            </Divider>
                            {thisUserReviews.map(review => 
                                <div>
                                <ReviewCard key={review.id} {...review} />
                                </div>
                            )}
                           
                        </>
                        :  <Divider horizontal>
                                <Header as='h4'>
                                    No Reviews Listed
                                </Header>
                            </Divider>
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
  
  export default withRouter(connect(msp, mdp)(ProfileDisplayFriends));
