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
                    <Divider horizontal>
                        <Header as='h4'>
                        <span className='search-bar-font'>Mutual Friends</span>
                        </Header>
                    </Divider>
                            {mutualFriends.map(friend => 
                                    <UserCard key={friend.id} {...friend} status="visitor"/>
                            )}

                </>
            )
        } else {
            return (
                <Divider horizontal>
                    <Header as='h4'>
                    <span className='search-bar-font'>No Mutual Friends Listed</span>
                    </Header>
                </Divider>
            )
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
                        <span className='search-bar-font'>Search Friends</span>
                        </Header>
                    </Divider>
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
                    <Col md={2}>
                        <div>
                        {
                            thisUserGamePhotos && thisUserGamePhotos.length
                            ?<>
                            <Divider horizontal>
                                <Header as='h4'>
                                <span className='search-bar-font'>Game Photos</span>
                                </Header>
                            </Divider>
                                {thisUserGamePhotos.map(photo => 
                                        <GamePhotoCard key={photo.id} {...photo} />
                                )}
                            </>
                            :  <Divider horizontal>
                                    <Header as='h4'>
                                    <span className='search-bar-font'>No Photos Listed</span>
                                    </Header>
                                </Divider>
                        }
                            {
                                thisUserCreatedGames && thisUserCreatedGames.length
                                ?<>
                                    <Divider horizontal>
                                        <Header as='h4'>
                                        <span className='search-bar-font'>Created Games</span>
                                        </Header>
                                    </Divider>
                                        {thisUserCreatedGames.map(game => 
                                                    <GameCard key={game.id} {...game} />
                                        )}
                                </>
                                :  <Divider horizontal>
                                        <Header as='h4'>
                                        <span className='search-bar-font'>No Games Created</span>
                                        </Header>
                                    </Divider>
                            }
                        </div>
                    </Col>
                    <Col md={8}>
                        <div>
                            {
                                thisPageUser && thisPageUser.total_friends && thisPageUser.total_friends.length
                                ?<>
                                    <Divider horizontal>
                                        <Header as='h4'>
                                            <span className='search-bar-font'>{thisPageUser.username} has {thisPageUser.total_friends.length} Friends</span>
                                        </Header>
                                    </Divider>
                                    {filteredUsers() && filteredUsers().length > 1
                                        ? <Card.Group itemsPerRow={2}>
                                            {filteredUsers().map(friend => 
                                                    <UserCard key={friend.id} {...friend} location="visitor"/>
                                            )}
                                        </Card.Group>
                                        : <Card.Group centered>
                                            {filteredUsers().map(friend => 
                                                    <UserCard key={friend.id} {...friend} location="visitor"/>
                                            )}
                                        </Card.Group>
                                    }
                                </>
                                :  <Divider horizontal>
                                        <Header as='h4'>
                                            <span className='search-bar-font'>No Friends Listed</span>
                                        </Header>
                                    </Divider>
                            }
                        </div>
                    </Col>
                    <Col md={2}>
                        <div>
                            {thisPageUser && mutualFriendsList()}  
                        </div>  
                        <div>
                            {
                                thisUserReviews && thisUserReviews.length
                                ?<>
                                    <Divider horizontal>
                                        <Header as='h4'>
                                        <span className='search-bar-font'>Reviews</span>
                                        </Header>
                                    </Divider>
                                    {thisUserReviews.map(review => 
                                        <ReviewCard key={review.id} {...review} />
                                    )}
                                </>
                                :  <Divider horizontal>
                                        <Header as='h4'>
                                        <span className='search-bar-font'>No Reviews Listed</span>
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
  
  export default withRouter(connect(msp, mdp)(UserDisplayFriends));
